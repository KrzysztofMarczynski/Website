import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PhotoToPlaylist() {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [analysisHint, setAnalysisHint] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("My Photo Playlist");
  const [mood, setMood] = useState("");
  const [tracks, setTracks] = useState(5);

  const [step, setStep] = useState(1);

  const parseBase64 = (dataUrl) => {
    if (!dataUrl) return null;
    return dataUrl.split(",")[1] || null;
  };

  const loadImageFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const analyzeImageMood = async (file) => {
    try {
      const img = await loadImageFile(file);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = Math.min(80, img.width);
      const height = Math.min(80, img.height);
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count += 1;
      }
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (brightness > 210) return "bright uplifting photo";
      if (brightness < 80) return "moody atmospheric photo";
      if (g > r && g > b) return "calm natural photo";
      if (r > g && r > b) return "warm energetic photo";
      if (b > r && b > g) return "dreamy chill photo";
      return "photo-inspired playlist";
    } catch (error) {
      console.error("[ERROR] Image analysis failed:", error);
      return "photo-inspired playlist";
    }
  };

  const convertImageToJpeg = async (file) => {
    const img = await loadImageFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.92);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Wybierz plik obrazu (jpg, png itp.)");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("Maksymalny rozmiar pliku to 8 MB");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    try {
      const jpegData = await convertImageToJpeg(file);
      setImageBase64(parseBase64(jpegData));
      const hint = await analyzeImageMood(file);
      setAnalysisHint(hint);
    } catch (error) {
      console.error("[ERROR] Image processing failed:", error);
      alert("Nie udało się przetworzyć obrazka. Spróbuj innego pliku.");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("spotify_token");
    if (savedToken) {
      setToken(savedToken);
      setStep(2);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // 🔐 LOGIN SPOTIFY - POPRAWIONA WERSJA
const loginSpotify = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI || window.location.origin;

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

    if (!image || !imageBase64) {
      return alert("⚠️ Wybierz zdjęcie, aby utworzyć playlistę.");
    }

    if (!name) {
      return alert("⚠️ Podaj nazwę playlisty!");
    }

    if (!tracks || tracks < 1) {
      return alert("⚠️ Wybierz liczbę utworów!");
    }

    setLoading(true);

    try {
      const payload = {
        mood,
        photoMood: analysisHint,
        tracks,
        name,
        token: savedToken,
        imageBase64,
      };

      console.log("[DEBUG] Sending playlist generation request with image");
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
      console.log("[DEBUG] Search query used:", data.searchQuery);
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
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-600 file:text-white
                         hover:file:bg-purple-700"
            />
            {analysisHint && (
              <p className="mt-3 text-sm text-gray-400">
                Analiza obrazka: <span className="text-white">{analysisHint}</span>
              </p>
            )}
          </div>

          {/* PREVIEW */}
          {imagePreview && (
            <img
              src={imagePreview}
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
              <label className="block mb-2">Mood (opcjonalnie):</label>
              <input
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 rounded"
                placeholder="happy, energetic, calm..."
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