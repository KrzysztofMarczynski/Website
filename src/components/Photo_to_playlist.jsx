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

  // LOGIN SPOTIFY
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

    console.log("[DEBUG] Redirecting to Spotify...");
    window.location.href = authUrl;
  };

  // HANDLE CALLBACK
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      alert("Błąd logowania: " + error);
      return;
    }

    if (code) {
      console.log("[DEBUG] Code received, exchanging token...");

      fetch("/api/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) throw new Error(data.error);

          const accessToken = data.access_token;
          console.log("[DEBUG] Token received! Scopes:", data.scope);

          setToken(accessToken);
          localStorage.setItem("spotify_token", accessToken);
          setStep(2);

          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(err => {
          console.error(err);
          alert("Błąd logowania: " + err.message);
        });
    } else {
      // Load token from localStorage if already logged in
      const savedToken = localStorage.getItem("spotify_token");
      if (savedToken) {
        setToken(savedToken);
        setStep(2);
      }
    }
  }, []);

  const generatePlaylist = async () => {
    const currentToken = token || localStorage.getItem("spotify_token");

    if (!currentToken) {
      alert("Zaloguj się do Spotify");
      setStep(1);
      return;
    }

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
          token: currentToken
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Błąd serwera");

      setPlaylistUrl(data.url);
      setStep(3);
    } catch (e) {
      console.error(e);
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

      {/* LOGIN */}
      {step === 1 && (
        <div className="text-center mt-20">
          <button
            onClick={loginSpotify}
            className="px-8 py-4 bg-[#1DB954] hover:bg-[#17a74a] text-black font-medium text-lg rounded-xl"
          >
            Log in with Spotify
          </button>
        </div>
      )}

      {/* MAIN FORM */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-8 mt-10 max-w-md mx-auto">
          {/* Upload */}
          <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl mb-4 text-center">Upload or take a photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>

          {image && (
            <img src={URL.createObjectURL(image)} className="max-w-md rounded-2xl" alt="preview" />
          )}

          {/* Settings */}
          <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block mb-1">Playlist name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded" />
            </div>

            <div>
              <label className="block mb-1">Genre</label>
              <input value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded" />
            </div>

            <div>
              <label className="block mb-1">Mood</label>
              <input value={mood} onChange={(e) => setMood(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded" />
            </div>

            <div>
              <label className="block mb-1">Number of tracks: {tracks}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={tracks}
                onChange={(e) => setTracks(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          <button
            onClick={generatePlaylist}
            disabled={loading}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium text-lg rounded-xl disabled:opacity-50"
          >
            {loading ? "Creating Playlist..." : "Generate Playlist"}
          </button>
        </div>
      )}

      {/* SUCCESS */}
      {step === 3 && playlistUrl && (
        <div className="text-center mt-16">
          <h3 className="text-2xl mb-4">Playlist created successfully! 🎉</h3>
          <a
            href={playlistUrl}
            target="_blank"
            className="text-green-400 text-xl underline"
          >
            Open in Spotify →
          </a>
        </div>
      )}
    </section>
  );
}