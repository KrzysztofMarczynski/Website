import axios from "axios";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log(
    "[DEBUG] Otrzymano:",
    JSON.stringify({ mood, genre, tracks, name }, null, 2)
  );

  if (!token) {
    console.error("[ERROR] No token");
    return res.status(401).json({ error: "No token" });
  }

  if (!mood && !genre) {
    console.error("[ERROR] No mood or genre");
    return res.status(400).json({ error: "Mood or Genre required" });
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // ===== TEST TOKEN =====
    console.log("[DEBUG] Testing token...");
    const meResponse = await axios.get(
      "https://api.spotify.com/v1/me",
      { headers }
    );
    const userId = meResponse.data.id;
    console.log("[DEBUG] Token valid! User:", userId);

    // ===== BUILD QUERY =====
    const moodClean = (mood || "").trim();
    const genreClean = (genre || "").trim();

    const searchQuery = [genreClean, moodClean]
      .filter(Boolean)
      .join(" ");

    console.log("[DEBUG] Final search query:", searchQuery);

    // ===== LIMIT (Search API max 10) =====
    let limit = Number(tracks) || 5;
    limit = Math.max(1, Math.min(10, limit));
    console.log("[DEBUG] Limit:", limit);

    // ===== SEARCH TRACKS =====
    console.log("[DEBUG] Searching tracks...");
    const searchResponse = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers,
        params: {
          q: searchQuery,
          type: "track",
          limit: String(limit),
        },
      }
    );

    const tracks_list = searchResponse.data.tracks.items;
    console.log("[DEBUG] Found:", tracks_list.length, "tracks");

    if (!tracks_list.length) {
      return res.status(404).json({ error: "No tracks found" });
    }

    const uris = tracks_list.map((t) => t.uri);

    // ===== CREATE PLAYLIST =====
    console.log("[DEBUG] Creating playlist...");
    const createResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: name || "Photo Playlist 🎵",
        public: false,
        description: "Generated playlist",
      },
      { headers }
    );

    const playlistId = createResponse.data.id;
    console.log("[DEBUG] Playlist created:", playlistId);

    // ===== ADD TRACKS =====
    console.log("[DEBUG] Adding tracks...");
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris,
      },
      { headers }
    );

    const playlistUrl = createResponse.data.external_urls.spotify;

    console.log("[DEBUG] SUCCESS URL:", playlistUrl);
    console.log("[DEBUG] ===== CREATE PLAYLIST SUCCESS =====");

    return res.json({
      url: playlistUrl,
    });

  } catch (e) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", e.message);

    if (e.response) {
      console.error("[ERROR] Status:", e.response.status);
      console.error(
        "[ERROR] Data:",
        JSON.stringify(e.response.data, null, 2)
      );
    }

    return res.status(500).json({
      error:
        e.response?.data?.error?.message ||
        e.message ||
        "Unknown error",
    });
  }
}