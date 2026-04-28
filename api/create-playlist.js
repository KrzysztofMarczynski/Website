import axios from "axios";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Otrzymano:", JSON.stringify({ mood, genre, tracks, name }, null, 2));

  if (!token) {
    console.error("[ERROR] No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    // Pobierz dane użytkownika + scopes
    console.log("[DEBUG] Testing token...");
    const meResponse = await axios.get("https://api.spotify.com/v1/me", { headers });

    const userId = meResponse.data.id;
    const scopes = meResponse.data.scope || "NO SCOPES RETURNED";

    console.log("[DEBUG] User ID:", userId);
    console.log("[DEBUG] Token scopes:", scopes);

    // Sprawdzenie scopes
    if (!scopes || !scopes.includes("playlist-modify")) {
      console.error("[ERROR] Token does not have playlist modification scopes!");
      return res.status(403).json({
        error: "Token missing required scopes (playlist-modify-private). Please log in again.",
        received_scopes: scopes
      });
    }

    // Przygotowanie wyszukiwania
    const searchQuery = [genre, mood].filter(Boolean).join(" ").trim();
    const limit = Math.max(1, Math.min(10, Number(tracks) || 5));

    console.log("[DEBUG] Search query:", searchQuery);
    console.log("[DEBUG] Limit:", limit);

    // Wyszukiwanie utworów
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
      return res.status(404).json({ error: "No tracks found for this mood/genre" });
    }

    const uris = tracks_list.map(track => track.uri);

    // Tworzenie playlisty
    console.log("[DEBUG] Creating playlist...");
    const createResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: name || "My Photo Playlist 🎵",
        public: false,           // Możesz zmienić na true do testów
        collaborative: false,
        description: `Playlist created from mood: ${mood || genre}`
      },
      { headers }
    );

    const playlistId = createResponse.data.id;
    console.log("[DEBUG] Playlist created:", playlistId);

    // Dodawanie utworów do playlisty
    console.log("[DEBUG] Adding tracks...");
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: uris },
      { headers }
    );

    console.log("[DEBUG] Tracks added successfully!");
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
    }

    return res.status(500).json({
      error: error.response?.data?.error?.message || error.message || "Failed to create playlist"
    });
  }
}