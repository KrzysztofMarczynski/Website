import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Otrzymano:", { mood, genre, tracks, name, token: token ? "✓" : "✗" });

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  if (!mood && !genre) {
    return res.status(400).json({ error: "Mood or Genre required" });
  }

  try {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);

    const searchQuery = `${genre || ""} ${mood || ""}`.trim();
    
    console.log("[DEBUG] Search query:", `"${searchQuery}"`);
    console.log("[DEBUG] Query length:", searchQuery.length);
    console.log("[DEBUG] Tracks limit:", Number(tracks) || 20);

    console.log("[DEBUG] Wysyłam request do Spotify...");
    
    const result = await spotify.searchTracks(
      searchQuery,
      { limit: Number(tracks) || 20 }
    );

    console.log("[DEBUG] Spotify response OK:", result.body.tracks.items.length, "tracks");

    if (!result.body.tracks.items.length) {
      return res.status(400).json({ error: "No tracks found" });
    }

    const uris = result.body.tracks.items.map(t => t.uri);
    console.log("[DEBUG] URIs:", uris.length);

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
    
    console.log("[DEBUG] Tracks added!");
    console.log("[DEBUG] ===== CREATE PLAYLIST SUCCESS =====");

    return res.json({
      url: playlist.body.external_urls.spotify,
    });

  } catch (e) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", e.message);
    console.error("[ERROR] Status:", e.statusCode);
    console.error("[ERROR] Body:", e.body);
    console.error("[ERROR] Full:", JSON.stringify(e, null, 2));
    
    return res.status(500).json({ 
      error: e.message,
      status: e.statusCode,
      body: e.body
    });
  }
}