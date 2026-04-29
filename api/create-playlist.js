import axios from "axios";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Token received - length:", token ? token.length : 0);
  console.log("[DEBUG] Token preview:", token ? token.substring(0, 80) + "..." : "NO TOKEN");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  let userId = null;

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
    console.log("[DEBUG] Full /me response keys:", Object.keys(meResponse.data));

    // 🔍 Szukanie utworów
    const searchQuery = [genre, mood].filter(Boolean).join(" ").trim();
    const limit = Math.max(1, Math.min(10, Number(tracks) || 5));

    console.log("[DEBUG] Search query:", searchQuery);

    const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
      headers,
      params: { q: searchQuery, type: "track", limit },
    });

    const tracks_list = searchResponse.data.tracks?.items || [];

    if (tracks_list.length === 0) {
      console.error("[ERROR] No tracks found");
      return res.status(404).json({ error: "No tracks found" });
    }

    const uris = tracks_list.map((t) => t.uri);

    console.log("[DEBUG] Tracks found:", uris.length);

    // 🎵 Tworzenie playlisty - UŻYJ /me/playlists zamiast /users/{id}/playlists
    console.log("[DEBUG] Creating playlist using /me/playlists endpoint");

    const createResponse = await axios.post(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: name || "My Photo Playlist 🎵",
        public: false,
        collaborative: false,
        description: "Generated from photo",
      },
      { headers }
    );

    const playlistId = createResponse.data.id;

    console.log("[DEBUG] Playlist created:", playlistId);

    // ➕ Dodawanie utworów
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris },
      { headers }
    );

    console.log("[DEBUG] Tracks added to playlist");

    return res.json({
      url: createResponse.data.external_urls.spotify,
      playlistId,
    });

  } catch (error) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", error.message);

    if (error.response) {
      console.error("[ERROR] Status:", error.response.status);
      console.error("[ERROR] Data:", JSON.stringify(error.response.data, null, 2));
      // NEW: extra debug info
      console.error("[ERROR] Token used:", token ? token.substring(0, 40) + "..." : "NONE");
      console.error("[ERROR] User ID at failure:", userId || "NOT FETCHED YET");
      console.error("[ERROR] Failed URL:", error.config?.url);
      console.error("[ERROR] Request headers sent:", JSON.stringify(error.config?.headers, null, 2));
    }

    return res.status(500).json({
      error: error.response?.data?.error?.message || error.message,
    });
  }
}