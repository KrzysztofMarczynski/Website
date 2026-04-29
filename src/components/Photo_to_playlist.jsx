import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Print() {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("My Photo Playlist");
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState("happy");
  const [tracks, setTracks] = useState(5);

  const [step, setStep] = useState(1);

  // 🔐 LOGIN SPOTIFY - POPRAWIONA WERSJA
const loginSpotify = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = "https://www.krzysztof-marczynski.pl";

  const scope = "playlist-modify-public playlist-modify-private user-read-private";

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    `client_id=${clientId}&` +
    `response_type=code&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `state=123&` +
    `show_dialog=true`;

  window.location.href = authUrl;
};

  // 🔄 HANDLE SPOTIFY CALLBACK
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("[ERROR] Spotify callback error:", error);
      alert("Błąd logowania od Spotify: " + error);
      return;
    }

    if (code) {
      console.log("[DEBUG] Spotify code received → exchanging for token...");

      fetch("/api/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (data.error) throw new Error(data.error);

          const accessToken = data.access_token;
          console.log("[DEBUG] Token received successfully!");
          console.log("[DEBUG] Scopes:", data.scope);

          setToken(accessToken);
          localStorage.setItem("spotify_token", accessToken);

          setStep(2);

          // Wyczyść parametry z URL
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch((err) => {
          console.error("[ERROR] Token exchange failed:", err);
          alert("❌ Nie udało się zalogować: " + err.message);
        });
    }
  }, []);

  // 🎵 GENERATE PLAYLIST
  const generatePlaylist = async () => {
    const savedToken = token || localStorage.getItem("spotify_token");

    console.log("[DEBUG] Generate playlist - token length:", savedToken ? savedToken.length : 0);

    if (!savedToken) {
      alert("Zaloguj się do Spotify");
      setStep(1);
      return;
    }

    if (!mood && !genre) {
      return alert("⚠️ Podaj Mood lub Genre!");
    }

    if (!name) {
      return alert("⚠️ Podaj nazwę playlisty!");
    }

    setLoading(true);

    try {
      const payload = {
        mood,
        genre,
        tracks,
        name,
        token: savedToken,
      };

      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      if (!data.url) {
        throw new Error("Brak URL playlisty w odpowiedzi");
      }

      setPlaylistUrl(data.url);
      setStep(3);

      console.log("[DEBUG] Playlist created successfully!");
    } catch (e) {
      console.error("[ERROR] Generate playlist failed:", e);
      alert("❌ Błąd tworzenia playlisty: " + e.message);
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
                   bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                   bg-clip-text text-blue-400"
      >
        Photo to Playlist
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed text-gray-300 mb-10"
      >
        <p>The program creates a Spotify playlist based on the photos you upload.</p>
      </motion.div>

      {/* ================= LOGIN ================= */}
      {step === 1 && (
        <div className="text-center">
          <a
            onClick={loginSpotify}
            className="inline-flex items-center gap-3 mt-6 px-8 py-4 
                       bg-[#1DB954] hover:bg-[#17a74a] 
                       text-black font-medium text-lg rounded-xl cursor-pointer"
          >
            Log in with Spotify
          </a>
        </div>
      )}

      {/* ================= UPLOAD + SETTINGS ================= */}
      {step >= 2 && (
        <div className="flex flex-col items-center justify-center gap-8 mt-10">

          {/* UPLOAD */}
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <h3 className="text-xl mb-4">Upload or take a photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-600 file:text-white
                         hover:file:bg-purple-700"
            />
          </div>

          {/* PREVIEW */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="w-full max-w-md rounded-2xl border border-gray-800"
              alt="Preview"
            />
          )}

          {/* SETTINGS */}
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="mb-4">
              <label className="block mb-2">Playlist name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Genre of music:</label>
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Mood:</label>
              <input
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">
                Tracks: <span className="text-purple-400">{tracks}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={tracks}
                onChange={(e) => setTracks(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* GENERATE BUTTON */}
          <a
            onClick={generatePlaylist}
            className="inline-flex items-center gap-3 mt-6 px-8 py-4 
                       bg-purple-600 hover:bg-purple-700 
                       text-white font-medium text-lg rounded-xl cursor-pointer"
          >
            {loading ? "Generating..." : "Generate Playlist"}
          </a>
        </div>
      )}

      {/* ================= RESULT ================= */}
      {step === 3 && playlistUrl && (
        <div className="text-center mt-12">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-xl mb-4">Your playlist is ready!</h3>
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline text-lg"
            >
              Open Spotify Playlist
            </a>
          </div>
        </div>
      )}
    </section>
  );
}