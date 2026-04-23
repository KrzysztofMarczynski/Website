import { useState } from "react";
import { motion } from "framer-motion";

export default function Print() {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Spotify login (PKCE implicit flow)
  const loginSpotify = () => {
    const clientId = import.meta.env.VITE_Client_ID;
    const redirectUri = window.location.origin;

    const scope = "playlist-modify-private playlist-modify-public";

    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=token` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  // pobranie tokena z URL (#access_token=...)
  useState(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const token = hash.split("&")[0].split("=")[1];
      setToken(token);
      window.location.hash = "";
    }
  }, []);

  const generatePlaylist = async () => {
    if (!token) return alert("Zaloguj się do Spotify");

    setLoading(true);

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: "happy",
          genre: "pop",
          token,
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
    <section
      id="Photo to playlist"
      className="min-h-screen bg-gray-950 text-white p-10"
    >
      {/* TITLE */}
      <motion.h1 className="text-5xl text-center mb-10 text-green-400">
        Photo → Spotify Playlist
      </motion.h1>

      {/* LOGIN */}
      {!token && (
        <div className="text-center">
          <button
            onClick={loginSpotify}
            className="bg-green-500 px-6 py-3 rounded-xl text-black font-bold"
          >
            Login with Spotify
          </button>
        </div>
      )}

      {/* UPLOAD / CAMERA */}
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
            Open your Spotify playlist 🎵
          </a>
        </div>
      )}
    </section>
  );
}
