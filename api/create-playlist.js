import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(req, res) {
  const { mood, genre, token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const spotify = new SpotifyWebApi({
      clientId: process.env.Client_ID,
      clientSecret: process.env.Client_secret,
    });

    spotify.setAccessToken(token);

    const query = `${genre} ${mood}`;

    const result = await spotify.searchTracks(query, { limit: 10 });

    const tracks = result.body.tracks.items.map(t => t.uri);

    const playlist = await spotify.createPlaylist("Photo Playlist 🎵", {
      public: false,
    });

    await spotify.addTracksToPlaylist(playlist.body.id, tracks);

    return res.json({
      url: playlist.body.external_urls.spotify,
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}