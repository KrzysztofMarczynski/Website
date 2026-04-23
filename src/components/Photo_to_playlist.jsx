import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Print() {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN SPOTIFY (POPRAWIONY FLOW)
  const loginSpotify = () => {
    const clientId = import.meta.env.VITE_Client_ID;
    const redirectUri = "https://www.krzysztof-marczynski.pl";

    const scope = "playlist-modify-private playlist-modify-public";

    const authUrl =
      "https://accounts.spotify.com/authorize" +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  // 🔄 CALLBACK (CODE → TOKEN)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch("/api/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(data.access_token);
          localStorage.setItem("spotify_token", data.access_token);

          // usuwa ?code= z URL
          window.history.replaceState({}, document.title, "/");
        });
    }
  }, []);

  // 🎵 GENEROWANIE PLAYLISTY
  const generatePlaylist = async () => {
    const savedToken = token || localStorage.getItem("spotify_token");

    if (!savedToken) return alert("Zaloguj się do Spotify");

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
    <section
      id="Photo to playlist"
      className="min-h-screen bg-gray-950 text-white p-10"
    >
      {/* TITLE — NIE ZMIENIONE */}
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

      {/* DESCRIPTION — NIE ZMIENIONE */}
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

      {/* LOGIN — TWÓJ ORYGINALNY DESIGN */}
      {!token && (
        <div className="text-center">
          <div className="max-w-6xl mx-auto flex flex-col cursor-pointer items-center justify-center text-center">
            <a
              onClick={loginSpotify}
              className="inline-flex items-center gap-3 mt-6 px-8 py-4 
                           bg-[#1DB954] 
                           hover:bg-[#17a74a] 
                           text-black font-medium text-lg rounded-xl transition-all 
                           shadow-lg shadow-green-700/40 hover:shadow-green-600/60 
                           active:scale-95 cursor-pointer"
            >
              Log in with Spotify
            </a>
          </div>
        </div>
      )}

      {/* UPLOAD — BEZ ZMIAN */}
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

      {/* RESULT — BEZ ZMIAN */}
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
