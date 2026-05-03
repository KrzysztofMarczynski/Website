import axios from "axios";

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
    const tracksLimit = Math.max(1, Math.min(50, Number(tracks) || 5));
    
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
      searchQuery = analysisData.searchQuery || "indie pop acoustic";
      const genrePreference = analysisData.preferredGenres || genre || "";
      console.log("[DEBUG] Search query from GPT:", searchQuery);
      if (genrePreference && !searchQuery.toLowerCase().includes(genrePreference.toLowerCase())) {
        searchQuery = `${genrePreference} ${searchQuery}`.trim();
      }
      console.log("[DEBUG] Search query from GPT:", searchQuery);
    } catch (analysisError) {
      console.warn("[WARN] GPT analysis failed, using fallback query");
      console.error("[WARN] Analysis error:", analysisError.message);
      searchQuery = "indie pop acoustic";
    }

    // 🔍 Szukanie utworów na Spotify
    console.log("[DEBUG] Searching Spotify for:", searchQuery);
    console.log("[DEBUG] Limit:", tracksLimit);

    const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
      headers,
      params: { 
        q: searchQuery, 
        type: "track", 
        limit: tracksLimit
      }
    });

    const tracks_list = searchResponse.data.tracks?.items || [];

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