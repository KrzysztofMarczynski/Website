import axios from "axios";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Otrzymano:", JSON.stringify({ mood, genre, tracks, name }, null, 2));

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
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    // Test token and get user ID
    console.log("[DEBUG] Testing token...");
    const meResponse = await axios.get("https://api.spotify.com/v1/me", { headers });
    const userId = meResponse.data.id;
    console.log("[DEBUG] Token valid! User:", userId);

    // Build search query
    const moodClean = (mood || "").trim();
    const genreClean = (genre || "").trim();
    const searchQuery = [genreClean, moodClean].filter(Boolean).join(" ");

    console.log("[DEBUG] Search query:", JSON.stringify(searchQuery));

    // Limit for search (Spotify search max = 10)
    let limit = Math.max(1, Math.min(10, Number(tracks) || 5));
    console.log("[DEBUG] Limit:", limit);

    // Search tracks
    console.log("[DEBUG] Searching tracks...");
    const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
      headers,
      params: {
        q: searchQuery,
        type: "track",
        limit: limit
      }
    });

    const tracks_list = searchResponse.data.tracks?.items || [];
    console.log("[DEBUG] Found tracks:", tracks_list.length);

    if (tracks_list.length === 0) {
      return res.status(404).json({ error: "No tracks found" });
    }

    const uris = tracks_list.map(t => t.uri);

    // Create playlist
    console.log("[DEBUG] Creating playlist...");
    const createResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: name || "Photo Playlist 🎵",
        public: false,
        description: "Generated from your photo mood"
      },
      { headers }
    );

    const playlistId = createResponse.data.id;
    console.log("[DEBUG] Playlist created:", playlistId);

    // Add tracks to playlist
    console.log("[DEBUG] Adding tracks...");
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris },
      { headers }
    );

    console.log("[DEBUG] ===== CREATE PLAYLIST SUCCESS =====");

    const playlistUrl = createResponse.data.external_urls.spotify;

    return res.json({
      url: playlistUrl,
      playlistId: playlistId
    });

  } catch (error) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", error.message);

    if (error.response) {
      console.error("[ERROR] Status:", error.response.status);
      console.error("[ERROR] Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("[ERROR] Stack:", error.stack);
    }

    return res.status(500).json({
      error: error.response?.data?.error?.message || error.message || "Failed to create playlist"
    });
  }
}