import axios from "axios";

const normalizeGenres = (text = "") => {
  return String(text)
    .split(/[,;&\/]+|\band\b|\s+/)
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
};

const sanitizeHint = (hint = "") => {
  return String(hint)
    .replace(/\b(photo|image|picture|pic|mood|moody|feelings?|vibes?|aesthetic|atmosphere|atmospheric)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
};

const buildSearchQuery = (genreTokens, hint) => {
  if (!genreTokens.length) return null;
  const cleanHint = sanitizeHint(hint);
  return `${genreTokens.join(" ")}${cleanHint ? ` ${cleanHint}` : ""}`.trim();
};

const fetchArtistGenres = async (headers, artistIds) => {
  if (!artistIds.length) return {};
  const ids = artistIds.slice(0, 50).join(",");
  const response = await axios.get("https://api.spotify.com/v1/artists", {
    headers,
    params: { ids },
  });
  return (response.data.artists || []).reduce((map, artist) => {
    map[artist.id] = artist.genres || [];
    return map;
  }, {});
};

const filterTracksByPreferredGenres = async (tracks, genreTokens, headers) => {
  if (!genreTokens.length) return tracks;
  const artistIds = Array.from(
    new Set(
      tracks
        .flatMap((track) => track.artists?.map((artist) => artist.id).filter(Boolean) || [])
        .filter(Boolean)
    )
  );

  if (!artistIds.length) return tracks;

  const artistGenres = await fetchArtistGenres(headers, artistIds);
  const filtered = tracks.filter((track) => {
    return track.artists.some((artist) => {
      const genres = artistGenres[artist.id] || [];
      const lowerGenres = genres.map((g) => g.toLowerCase());
      return genreTokens.some((token) => lowerGenres.some((genre) => genre.includes(token)));
    });
  });

  return filtered.length ? filtered : tracks;
};

export default async function handler(req, res) {
  const { genre, photoMood, imageBase64, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Token received - length:", token ? token.length : 0);
  console.log("[DEBUG] Image received - length:", imageBase64 ? imageBase64.length : 0);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (!imageBase64) {
    return res.status(400).json({ error: "Image is required" });
  }

  let userId = null;
  let searchQuery = null;
  let preferredGenres = [];

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // ✅ Pobranie user ID
    console.log("[DEBUG] Calling /me endpoint...");
    const meResponse = await axios.get("https://api.spotify.com/v1/me", { headers });

    userId = meResponse.data.id;

    console.log("[DEBUG] User ID:", userId);

    // 🎨 ANALIZA ZDJĘCIA za pomocą GPT Vision
    console.log("[DEBUG] Analyzing photo with GPT Vision...");
    
    // Ensure tracksLimit is always a valid number between 1-50
    const rawTracks = Number(tracks);
    const tracksLimit = Number.isFinite(rawTracks) && rawTracks > 0 ? Math.min(10, rawTracks) : 5;
    console.log("[DEBUG] Tracks limit:", tracksLimit);
    
    try {
      const analysisResponse = await axios.post(
        process.env.VERCEL_ENV ? "https://www.krzysztof-marczynski.pl/api/analyze-photo" : "http://localhost:8000/api/analyze-photo",
        {
          imageBase64,
          playlistName: name,
          preferredGenres: genre,
          tracksCount: tracksLimit
        },
        {
          timeout: 30000
        }
      );

      const analysisData = analysisResponse.data || {};
      const genrePreference = analysisData.preferredGenres || genre || "";
      preferredGenres = normalizeGenres(genrePreference);
      const strictGenreQuery = buildSearchQuery(preferredGenres, photoMood || "");

      if (preferredGenres.length > 0) {
        const lowerGptQuery = (analysisData.searchQuery || "").toLowerCase();
        const hasAllPreferredGenres = preferredGenres.every((token) => lowerGptQuery.includes(token));
        searchQuery = hasAllPreferredGenres ? analysisData.searchQuery : strictGenreQuery;
      } else {
        searchQuery = analysisData.searchQuery || "indie pop acoustic";
      }

      // Ensure searchQuery is always a non-empty string
      if (!searchQuery || typeof searchQuery !== "string") {
        searchQuery = "indie pop acoustic";
      }

      console.log("[DEBUG] Search query from GPT or strict genre logic:", searchQuery);
      console.log("[DEBUG] Preferred genres:", preferredGenres);
    } catch (analysisError) {
      console.warn("[WARN] GPT analysis failed, using fallback query");
      console.error("[WARN] Analysis error:", analysisError.message);
      searchQuery = "indie pop acoustic";
    }

    // 🔍 Szukanie utworów na Spotify
    console.log("[DEBUG] Searching Spotify for:", searchQuery);
    console.log("[DEBUG] Limit:", tracksLimit);

    // Calculate searchLimit: fetch 2-3x more results for better genre filtering
    const searchLimit = Math.max(1, Math.min(10, tracksLimit));
    const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
      headers,
      params: {
        q: searchQuery,
        type: "track",
        limit: searchLimit,
      },
    });

    let tracks_list = searchResponse.data.tracks?.items || [];
    if (preferredGenres.length > 0) {
      const filteredTracks = await filterTracksByPreferredGenres(tracks_list, preferredGenres, headers);
      if (filteredTracks.length) {
        tracks_list = filteredTracks;
        console.log("[DEBUG] Filtered tracks by preferred genre metadata:", filteredTracks.length);
      } else {
        console.warn("[WARN] No tracks matched preferred genres via artist metadata; keeping original search results.");
      }
    }

    if (tracks_list.length === 0) {
      console.error("[ERROR] No tracks found for query:", searchQuery);
      return res.status(404).json({ error: "No tracks found for the selected image" });
    }

    const uris = Array.from(new Set(tracks_list.map((t) => t.uri))).slice(0, tracksLimit);

    console.log("[DEBUG] Tracks found:", uris.length);
    console.log("[DEBUG] Sample URI:", uris[0]);

    // 🎵 Tworzenie playlisty
    console.log("[DEBUG] Creating playlist using /me/playlists endpoint");

    const createResponse = await axios.post(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: name || "My Photo Playlist 🎵",
        public: false,
        collaborative: false,
        description: `Generated from photo - ${searchQuery}`,
      },
      { headers }
    );

    const playlistId = createResponse.data.id;

    console.log("[DEBUG] Playlist created:", playlistId);

    // 📸 Dodanie okładki playlisty
    if (imageBase64) {
      try {
        const imageBuffer = Buffer.from(imageBase64, "base64");
        console.log("[DEBUG] Uploading playlist cover image... size bytes:", imageBuffer.length);
        if (imageBuffer.length > 256 * 1024) {
          console.warn("[WARN] Playlist image may be too large for Spotify:", imageBuffer.length);
        }
        await axios.put(
          `https://api.spotify.com/v1/playlists/${playlistId}/images`,
          imageBuffer,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "image/jpeg",
            },
          }
        );
        console.log("[DEBUG] Playlist cover uploaded successfully");
      } catch (coverError) {
        console.error("[ERROR] Playlist cover upload failed:", coverError.response?.data || coverError.message);
      }
    }

    // 🎵 Dodawanie utworów do playlisty
    console.log("[DEBUG] Adding tracks to playlist...");
    console.log("[DEBUG] Playlist ID:", playlistId);
    console.log("[DEBUG] Number of tracks to add:", uris.length);

    try {
      console.log("[DEBUG] Adding tracks using /items endpoint...");
      const addTracksResponse = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/items`,
        { uris },
        { headers }
      );

      console.log("[DEBUG] ✅ Tracks added successfully via /items!");
      console.log("[DEBUG] Snapshot ID:", addTracksResponse.data.snapshot_id);

      return res.json({
        url: createResponse.data.external_urls.spotify,
        playlistId,
        searchQuery,
        tracksAdded: uris.length,
        message: "✅ Playlist created and tracks added!"
      });
    } catch (addError) {
      console.error("[ERROR] ❌ Failed to add tracks via /items endpoint");
      console.error("[ERROR] Status:", addError.response?.status);
      console.error("[ERROR] Message:", addError.response?.data?.error?.message);

      try {
        console.log("[DEBUG] Retrying track add via /tracks endpoint...");
        const retryResponse = await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          { uris },
          { headers }
        );
        console.log("[DEBUG] ✅ Tracks added successfully via /tracks!");
        console.log("[DEBUG] Snapshot ID:", retryResponse.data.snapshot_id);

        return res.json({
          url: createResponse.data.external_urls.spotify,
          playlistId,
          searchQuery,
          tracksAdded: uris.length,
          message: "✅ Playlist created and tracks added on retry!"
        });
      } catch (retryError) {
        console.error("[ERROR] Retry add tracks failed:", retryError.response?.data || retryError.message);

        return res.json({
          url: createResponse.data.external_urls.spotify,
          playlistId,
          searchQuery,
          warning: "Playlist created but tracks could not be added",
          error: retryError.response?.data?.error?.message || retryError.message
        });
      }
    }

  } catch (error) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", error.message);

    if (error.response) {
      console.error("[ERROR] Status:", error.response.status);
      console.error("[ERROR] Data:", JSON.stringify(error.response.data, null, 2));
    }

    return res.status(500).json({
      error: error.response?.data?.error?.message || error.message,
    });
  }
}