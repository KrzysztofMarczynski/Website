import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Otrzymano:", { mood, genre, tracks, name, token: token ? token.substring(0, 10) + "..." : "✗" });

  if (!token) {
    console.error("[ERROR] No token provided");
    return res.status(401).json({ error: "No token" });
  }

  if (!mood && !genre) {
    console.error("[ERROR] No mood or genre");
    return res.status(400).json({ error: "Mood or Genre required" });
  }

  try {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);

    // Buduj query - dodaj quotes dla lepszych rezultatów
    let searchQuery = "";
    if (genre && mood) {
      searchQuery = `genre:${genre} ${mood}`;
    } else if (genre) {
      searchQuery = `genre:${genre}`;
    } else {
      searchQuery = mood;
    }
    
    console.log("[DEBUG] Search query:", `"${searchQuery}"`);

    const limit = Math.max(1, Math.min(50, Number(tracks) || 20));
    console.log("[DEBUG] Limit:", limit);

    console.log("[DEBUG] Wysyłam search do Spotify...");
    
    let result;
    try {
      result = await spotify.searchTracks(searchQuery, { limit });
    } catch (searchError) {
      console.error("[ERROR] Search failed:", searchError.message);
      // Fallback: spróbuj proższego query
      console.log("[DEBUG] Trying fallback search...");
      result = await spotify.searchTracks(mood || genre, { limit });
    }

    console.log("[DEBUG] Search OK, found:", result.body.tracks.items.length, "tracks");

    if (!result.body.tracks.items.length) {
      console.error("[ERROR] No tracks found for query");
      return res.status(404).json({ error: "No tracks found - try different mood/genre" });
    }

    const uris = result.body.tracks.items.map(t => t.uri);
    console.log("[DEBUG] URIs count:", uris.length);

    const user = await spotify.getMe();
    console.log("[DEBUG] User ID:", user.body.id);

    const playlist = await spotify.createPlaylist(
      user.body.id,
      name || "Photo Playlist 🎵",
      {
        public: false,
        description: "Generated playlist",
      }
    );

    console.log("[DEBUG] Playlist created:", playlist.body.id);

    await spotify.addTracksToPlaylist(playlist.body.id, uris);
    
    console.log("[DEBUG] Tracks added, URL:", playlist.body.external_urls.spotify);
    console.log("[DEBUG] ===== CREATE PLAYLIST SUCCESS =====");

    return res.json({
      url: playlist.body.external_urls.spotify,
    });

  } catch (e) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", e.message);
    console.error("[ERROR] Status:", e.statusCode);
    if (e.body) {
      console.error("[ERROR] Body:", JSON.stringify(e.body));
    }
    
    return res.status(500).json({ 
      error: e.message || "Unknown error",
    });
  }
}