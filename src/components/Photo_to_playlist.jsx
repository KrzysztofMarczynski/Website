import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Print() {
  const [token, setToken] = useState(() => localStorage.getItem("spotify_token") || null);
  const [image, setImage] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("My Photo Playlist");
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState("happy");
  const [tracks, setTracks] = useState(5);

  const [step, setStep] = useState(() => localStorage.getItem("spotify_token") ? 2 : 1);

  // LOGIN
  const loginSpotify = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = "https://www.krzysztof-marczynski.pl";

    const scope = "user-read-private playlist-modify-private playlist-modify-public";

    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=playlist-${Date.now()}`;

    window.location.href = authUrl;
  };

  // HANDLE SPOTIFY CALLBACK
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      console.log("[DEBUG] Code received from Spotify, exchanging...");

      fetch("/api/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) throw new Error(data.error);

          const newToken = data.access_token;
          console.log("[DEBUG] New token received! Scopes:", data.scope);

          localStorage.setItem("spotify_token", newToken);
          setToken(newToken);
          setStep(2);

          // Wyczyść URL
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(err => {
          console.error("[ERROR] Token exchange failed:", err);
          alert("Błąd logowania: " + err.message);
        });
    }
  }, []);

  // GENERATE PLAYLIST
  const generatePlaylist = async () => {
    const currentToken = token || localStorage.getItem("spotify_token");

    if (!currentToken) {
      alert("Musisz się zalogować do Spotify");
      setStep(1);
      return;
    }

    console.log("[DEBUG] Using token of length:", currentToken.length);

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

      if (!res.ok) throw new Error(data.error || "Błąd przy tworzeniu playlisty");

      setPlaylistUrl(data.url);
      setStep(3);
    } catch (e) {
      console.error(e);
      alert("Błąd: " + e.message);
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

      {/* Step 1 - Login */}
      {step === 1 && (
        <div className="text-center mt-20">
          <button
            onClick={loginSpotify}
            className="px-10 py-5 bg-[#1DB954] hover:bg-[#17a74a] text-black font-semibold text-xl rounded-2xl"
          >
            Log in with Spotify
          </button>
        </div>
      )}

      {/* Step 2 - Main App */}
      {step === 2 && (
        <div className="max-w-md mx-auto flex flex-col gap-8 mt-10">
          {/* Upload photo */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl mb-4 text-center">Upload photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-purple-600 file:text-white"
            />
          </div>

          {image && <img src={URL.createObjectURL(image)} className="rounded-2xl" alt="preview" />}

          {/* Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div>
              <label className="block mb-2">Playlist name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 px-4 py-3 rounded-lg" />
            </div>
            <div>
              <label className="block mb-2">Genre</label>
              <input value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-gray-800 px-4 py-3 rounded-lg" />
            </div>
            <div>
              <label className="block mb-2">Mood</label>
              <input value={mood} onChange={e => setMood(e.target.value)} className="w-full bg-gray-800 px-4 py-3 rounded-lg" />
            </div>
            <div>
              <label className="block mb-2">Tracks: {tracks}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={tracks}
                onChange={e => setTracks(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          <button
            onClick={generatePlaylist}
            disabled={loading}
            className="py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl text-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Generate Playlist"}
          </button>
        </div>
      )}

      {/* Step 3 - Success */}
      {step === 3 && playlistUrl && (
        <div className="text-center mt-20">
          <h3 className="text-3xl mb-6">Playlist gotowa! 🎉</h3>
          <a href={playlistUrl} target="_blank" className="text-green-400 text-2xl underline">
            Otwórz playlistę w Spotify →
          </a>
        </div>
      )}
    </section>
  );
}