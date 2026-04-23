import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Print() {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN
  const loginSpotify = () => {
    const clientId = import.meta.env.VITE_Client_ID;

    const redirectUri = window.location.origin + "/callback";

    const scope =
      "playlist-modify-private playlist-modify-public";

    const authUrl =
      "https://accounts.spotify.com/authorize" +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  // 🔄 CALLBACK - CODE → TOKEN
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch("/api/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          setToken(data.access_token);
          localStorage.setItem("spotify_token", data.access_token);
          window.history.replaceState({}, document.title, "/");
        });
    }
  }, []);

  // 🎵 GENERATE PLAYLIST
  const generatePlaylist = async () => {
    const savedToken = token || localStorage.getItem("spotify_token");

    if (!savedToken) return alert("Zaloguj się do Spotify");

    setLoading(true);

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: "happy",
          genre: "pop",
          token: savedToken,
        }),
      });

      const data = await res.json();

      setPlaylistUrl(data.url);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-950 text-white p-10">

      <motion.h2 className="text-4xl text-center mb-10 text-green-400">
        Photo → Playlist
      </motion.h2>

      {/* LOGIN */}
      {!token && (
        <div className="text-center">
          <button
            onClick={loginSpotify}
            className="bg-green-500 px-6 py-3 rounded-xl cursor-pointer"
          >
            Log in with Spotify
          </button>
        </div>
      )}

      {/* UPLOAD */}
      {token && (
        <div className="text-center space-y-6">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            onClick={generatePlaylist}
            className="bg-purple-600 px-6 py-3 rounded-xl"
          >
            {loading ? "Generating..." : "Generate Playlist"}
          </button>
        </div>
      )}

      {/* RESULT */}
      {playlistUrl && (
        <div className="text-center mt-10">
          <a
            href={playlistUrl}
            target="_blank"
            className="text-green-400 text-xl underline"
          >
            Open playlist 🎵
          </a>
        </div>
      )}
    </section>
  );
}