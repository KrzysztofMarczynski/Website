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

  // 🔐 LOGIN SPOTIFY
  const loginSpotify = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = "https://www.krzysztof-marczynski.pl";

    const scope = "user-read-private playlist-modify-private playlist-modify-public";

    const authUrl = 
      "https://accounts.spotify.com/authorize?" +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=playlist-${Date.now()}`;

    console.log("[DEBUG] Redirecting to Spotify login");
    window.location.href = authUrl;
  };

  // 🔄 HANDLE CALLBACK + TOKEN
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("[ERROR] Spotify error:", error);
      alert("Błąd logowania: " + error);
      return;
    }

    if (code) {
      console.log("[DEBUG] Code found, exchanging for token...");

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
          console.log("[DEBUG] Token received! Scopes:", data.scope);

          // Zapisz token
          setToken(accessToken);
          localStorage.setItem("spotify_token", accessToken);

          // Przejdź do kroku 2
          setStep(2);

          // Wyczyść URL
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch((err) => {
          console.error("[ERROR] Token exchange failed:", err);
          alert("Nie udało się zalogować: " + err.message);
        });
    } else {
      // Jeśli nie ma code w URL, spróbuj wczytać token z localStorage
      const savedToken = localStorage.getItem("spotify_token");
      if (savedToken) {
        setToken(savedToken);
        setStep(2);
      }
    }
  }, []);

  // 🎵 GENERATE PLAYLIST
  const generatePlaylist = async () => {
    const currentToken = token || localStorage.getItem("spotify_token");

    if (!currentToken) {
      alert("Zaloguj się do Spotify");
      setStep(1);
      return;
    }

    console.log("[DEBUG] Using token length:", currentToken.length);

    if (!mood && !genre) return alert("Podaj Mood lub Genre!");
    if (!name) return alert("Podaj nazwę playlisty!");

    setLoading(true);

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          genre,
          tracks,
          name,
          token: currentToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      setPlaylistUrl(data.url);
      setStep(3);
      console.log("[DEBUG] Playlist created successfully!");
    } catch (e) {
      console.error("[ERROR] Generate failed:", e);
      alert("Błąd tworzenia playlisty: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Photo to playlist" className="min-h-screen bg-gray-950 text-white p-10">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-blue-400"
      >
        Photo to Playlist
      </motion.h2>

      {/* LOGIN STEP */}
      {step === 1 && (
        <div className="text-center mt-20">
          <button
            onClick={loginSpotify}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1DB954] hover:bg-[#17a74a] text-black font-medium text-lg rounded-xl cursor-pointer"
          >
            Log in with Spotify
          </button>
        </div>
      )}

      {/* MAIN APP */}
      {step >= 2 && (
        <div className="flex flex-col items-center justify-center gap-8 mt-10">
          {/* ... Twój kod uploadu, preview i ustawień bez zmian ... */}

          <button
            onClick={generatePlaylist}
            disabled={loading}
            className="inline-flex items-center gap-3 mt-6 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium text-lg rounded-xl cursor-pointer disabled:opacity-50"
          >
            {loading ? "Generating Playlist..." : "Generate Playlist"}
          </button>
        </div>
      )}

      {/* RESULT */}
      {step === 3 && playlistUrl && (
        <div className="text-center mt-12">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-xl mb-4">Your playlist is ready 🎉</h3>
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline text-lg"
            >
              Open Spotify Playlist →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}