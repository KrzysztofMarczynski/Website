import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

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
    
    console.log("[DEBUG] Search query:", searchQuery);
    console.log("[DEBUG] Token valid?", token.substring(0, 10) + "...");

    const result = await spotify.searchTracks(
      searchQuery,
      { limit: Number(tracks) || 20 }
    );

    if (!result.body.tracks.items.length) {
      return res.status(400).json({ error: "No tracks found" });
    }

    const uris = result.body.tracks.items.map(t => t.uri);

    const user = await spotify.getMe();

    const playlist = await spotify.createPlaylist(
      user.body.id,
      name || "Photo Playlist 🎵",
      {
        public: false,
        description: "Generated playlist",
      }
    );

    await spotify.addTracksToPlaylist(playlist.body.id, uris);

    return res.json({
      url: playlist.body.external_urls.spotify,
    });

  } catch (e) {
    console.error("[ERROR] Create playlist failed:", e.message);
    console.error("[ERROR] Full error:", e);
    return res.status(500).json({ error: e.message });
  }
}