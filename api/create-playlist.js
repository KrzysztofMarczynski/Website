const SpotifyWebApi = require("spotify-web-api-node");

module.exports = async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);

    const result = await spotify.searchTracks(
      `${genre || ""} ${mood || ""}`,
      { limit: Number(tracks) || 20 }
    );

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
    return res.status(500).json({ error: e.message });
  }
};