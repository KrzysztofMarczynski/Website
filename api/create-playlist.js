import axios from "axios";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    // Pobierz profil + scopes
    const meResponse = await axios.get("https://api.spotify.com/v1/me", { headers });
    
    const userId = meResponse.data.id;
    const scopes = meResponse.data.scope || "NO SCOPES RETURNED";

    console.log("[DEBUG] User ID:", userId);
    console.log("[DEBUG] Token scopes:", scopes);

    if (scopes === "NO SCOPES RETURNED" || !scopes.includes("playlist-modify")) {
      console.error("[ERROR] Token does not have playlist modification scopes!");
      return res.status(403).json({ 
        error: "Token missing required scopes. Please log in again with proper permissions.",
        current_scopes: scopes
      });
    }

    // Reszta kodu bez zmian (search + create playlist)
    const moodClean = (mood || "").trim();
    const genreClean = (genre || "").trim();
    const searchQuery = [genreClean, moodClean].filter(Boolean).join(" ");

    let limit = Math.max(1, Math.min(10, Number(tracks) || 5));

    const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
      headers,
      params: { q: searchQuery, type: "track", limit }
    });

    const tracks_list = searchResponse.data.tracks?.items || [];

    if (tracks_list.length === 0) {
      return res.status(404).json({ error: "No tracks found" });
    }

    const uris = tracks_list.map(t => t.uri);

    // Tworzenie playlisty
    const createResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: name || "My Photo Playlist 🎵",
        public: false,
        collaborative: false,
        description: "Generated from your photo"
      },
      { headers }
    );

    const playlistId = createResponse.data.id;

    // Dodawanie utworów
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris },
      { headers }
    );

    console.log("[DEBUG] ===== CREATE PLAYLIST SUCCESS =====");

    return res.json({
      url: createResponse.data.external_urls.spotify,
      playlistId
    });

  } catch (error) {
    console.error("[ERROR] Message:", error.message);
    if (error.response) {
      console.error("[ERROR] Status:", error.response.status);
      console.error("[ERROR] Data:", JSON.stringify(error.response.data, null, 2));
    }

    return res.status(500).json({
      error: error.response?.data?.error?.message || error.message || "Unknown error"
    });
  }
}