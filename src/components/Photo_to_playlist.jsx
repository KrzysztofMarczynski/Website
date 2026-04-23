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
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16
                     pb-6 md:pb-8 lg:pb-10 leading-[1.2] md:leading-[1.15] lg:leading-[1.1]
                     bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-md"
      >
        Photo to Playlist
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed text-gray-300 mb-20"
      >
        <p>
          The program creates a Spotify playlist based on the photos you upload.
          You can add up to three photos at a time, choose the genres you want
          to include, your mood, and how many songs you want to include.
        </p>
        <br />
        <p>Just Log in to your Spotify account, upload your photo.</p>
      </motion.div>

      {/* LOGIN */}
      {!token && (
        <div className="text-center">
          <div className="max-w-6xl mx-auto flex flex-col cursor-pointer items-center justify-center text-center">
            <a
              onClick={loginSpotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-6 px-8 py-4 
                           bg-[#1DB954] 
                           hover:bg-[#17a74a] 
                           text-black font-medium text-lg rounded-xl transition-all 
                           shadow-lg shadow-green-700/40 hover:shadow-green-600/60 
                           active:scale-95"
            >
              Log in with Spotify
            </a>
          </div>
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
