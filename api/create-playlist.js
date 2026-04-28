import axios from "axios";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Token received - length:", token ? token.length : 0);
  console.log("[DEBUG] Token preview:", token ? token.substring(0, 80) + "..." : "NO TOKEN");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    console.log("[DEBUG] Calling /me endpoint...");
    const meResponse = await axios.get("https://api.spotify.com/v1/me", { headers });

    const userId = meResponse.data.id;
    const scopes = meResponse.data.scope || "NO SCOPES RETURNED";

    console.log("[DEBUG] User ID:", userId);
    console.log("[DEBUG] Scopes from /me:", scopes);
    console.log("[DEBUG] Full /me response keys:", Object.keys(meResponse.data));

    if (!scopes || !scopes.includes("playlist-modify")) {
      console.error("[ERROR] Brak wymaganych scopes!");
      return res.status(403).json({
        error: "Token missing playlist scopes",
        received_scopes: scopes,
        message: "Spróbuj wylogować się całkowicie i zalogować ponownie"
      });
    }

    // Reszta kodu bez zmian (search + create playlist)
    const searchQuery = [genre, mood].filter(Boolean).join(" ").trim();
    const limit = Math.max(1, Math.min(10, Number(tracks) || 5));

    const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
      headers,
      params: { q: searchQuery, type: "track", limit }
    });

    const tracks_list = searchResponse.data.tracks?.items || [];

    if (tracks_list.length === 0) {
      return res.status(404).json({ error: "No tracks found" });
    }

    const uris = tracks_list.map(t => t.uri);

    const createResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: name || "My Photo Playlist 🎵",
        public: true,        // zmienione na true na czas testów
        collaborative: false,
        description: "Generated from photo"
      },
      { headers }
    );

    const playlistId = createResponse.data.id;

    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris },
      { headers }
    );

    return res.json({
      url: createResponse.data.external_urls.spotify,
      playlistId
    });

  } catch (error) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", error.message);
    if (error.response) {
      console.error("[ERROR] Status:", error.response.status);
      console.error("[ERROR] Data:", JSON.stringify(error.response.data, null, 2));
    }
    return res.status(500).json({ error: error.message });
  }
}