import { useEffect, useState } from "react";
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
  const [genre, setGenre] = useState("");
  const [tracks, setTracks] = useState(5);
  const [step, setStep] = useState(1);

  const parseBase64 = (dataUrl) => {
    if (!dataUrl) {
      return null;
    }

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
      let r = 0;
      let g = 0;
      let b = 0;
      let count = 0;

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

      if (brightness > 210) {
        return "bright uplifting photo";
      }

      if (brightness < 80) {
        return "moody atmospheric photo";
      }

      if (g > r && g > b) {
        return "calm natural photo";
      }

      if (r > g && r > b) {
        return "warm energetic photo";
      }

      if (b > r && b > g) {
        return "dreamy chill photo";
      }

      return "photo-inspired playlist";
    } catch (error) {
      console.error("[ERROR] Image analysis failed:", error);
      return "photo-inspired playlist";
    }
  };

  const convertImageToJpeg = async (file) => {
    const img = await loadImageFile(file);
    const targetBytes = 230 * 1024;
    const minDimension = 320;
    const maxDimension = 640;

    let width = img.width;
    let height = img.height;

    if (width > maxDimension || height > maxDimension) {
      const ratio = Math.min(maxDimension / width, maxDimension / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const calculateBytes = (dataUrl) => {
      const base64 = dataUrl.split(",")[1] || "";
      return Math.round((base64.length * 3) / 4);
    };

    let quality = 0.85;
    let jpegData = "";

    while (true) {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      jpegData = canvas.toDataURL("image/jpeg", quality);

      const bytes = calculateBytes(jpegData);

      if (
        bytes <= targetBytes ||
        (quality <= 0.45 &&
          width <= minDimension &&
          height <= minDimension)
      ) {
        break;
      }

      if (quality > 0.45) {
        quality -= 0.1;
        continue;
      }

      if (width > minDimension && height > minDimension) {
        width = Math.max(minDimension, Math.round(width * 0.9));
        height = Math.max(minDimension, Math.round(height * 0.9));
        quality = 0.85;
        continue;
      }

      break;
    }

    return jpegData;
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Choose an image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("Maximum file size is 8 MB.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    try {
      const jpegData = await convertImageToJpeg(file);
      const hint = await analyzeImageMood(file);

      setImageBase64(parseBase64(jpegData));
      setAnalysisHint(hint);
    } catch (error) {
      console.error("[ERROR] Image processing failed:", error);
      alert("Could not process this image. Try another file.");
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

  const loginSpotify = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri =
      import.meta.env.VITE_REDIRECT_URI || window.location.origin;

    const scope =
      "playlist-modify-public playlist-modify-private user-read-private";

    const authUrl =
      "https://accounts.spotify.com/authorize?" +
      `client_id=${clientId}&` +
      "response_type=code&" +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      "state=123&" +
      "show_dialog=true";

    window.location.href = authUrl;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("[ERROR] Spotify callback error:", error);
      alert("Spotify login error: " + error);
      return;
    }

    if (code) {
      fetch("/api/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          return res.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }

          const accessToken = data.access_token;

          setToken(accessToken);
          localStorage.setItem("spotify_token", accessToken);
          setStep(2);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        })
        .catch((err) => {
          console.error("[ERROR] Token exchange failed:", err);
          alert("Could not log in: " + err.message);
        });
    }
  }, []);

  const generatePlaylist = async () => {
    const savedToken = token || localStorage.getItem("spotify_token");

    if (!savedToken) {
      alert("Log in to Spotify first.");
      setStep(1);
      return;
    }

    if (!image || !imageBase64) {
      alert("Choose a photo to create a playlist.");
      return;
    }

    if (!name) {
      alert("Enter playlist name.");
      return;
    }

    if (!tracks || tracks < 1) {
      alert("Choose the number of tracks.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        genre,
        photoMood: analysisHint,
        tracks,
        name,
        token: savedToken,
        imageBase64,
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
        throw new Error("Missing playlist URL in response.");
      }

      setPlaylistUrl(data.url);
      setStep(3);
    } catch (error) {
      console.error("[ERROR] Generate playlist failed:", error);
      alert("Could not create playlist: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="Photo to playlist"
      className="min-h-screen bg-white px-5 py-20 text-zinc-950 md:px-10 lg:px-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center text-4xl font-bold text-zinc-950 md:text-5xl lg:text-6xl"
      >
        Photo to Playlist
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-zinc-700 md:text-xl"
      >
        <p>
          The program creates a Spotify playlist based on the photos you upload.
        </p>
      </motion.div>

      {step === 1 && (
        <div className="text-center">
          <button
            type="button"
            onClick={loginSpotify}
            className="mt-6 inline-flex cursor-pointer items-center gap-3 rounded-xl bg-[#1DB954] px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:bg-[#17a74a] active:scale-95"
          >
            Log in with Spotify
          </button>
        </div>
      )}

      {step >= 2 && (
        <div className="mt-10 flex flex-col items-center justify-center gap-8">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <h3 className="mb-4 text-xl font-semibold text-zinc-950">
              Upload or take a photo
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-zinc-800"
            />
            {analysisHint && (
              <p className="mt-3 text-sm text-zinc-500">
                Image analysis:{" "}
                <span className="text-zinc-950">{analysisHint}</span>
              </p>
            )}
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              className="w-full max-w-md rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
              alt="Preview"
            />
          )}

          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <div className="mb-4">
              <label className="mb-2 block font-medium text-zinc-950">
                Playlist name:
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 outline-none transition focus:border-zinc-950"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-medium text-zinc-950">
                Genre optional:
              </label>
              <input
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
                placeholder="rock, metal, indie pop, chillwave"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-zinc-950">
                Tracks: <span className="text-zinc-500">{tracks}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={tracks}
                onChange={(event) => setTracks(Number(event.target.value))}
                className="w-full accent-zinc-950"
              />
              <div className="mt-1 flex justify-between text-xs text-zinc-500">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={generatePlaylist}
            className="mt-6 inline-flex cursor-pointer items-center gap-3 rounded-xl bg-zinc-950 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-zinc-800 active:scale-95"
          >
            {loading ? "Generating" : "Generate Playlist"}
          </button>
        </div>
      )}

      {step === 3 && playlistUrl && (
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <h3 className="mb-4 text-xl font-semibold text-zinc-950">
              Your playlist is ready!
            </h3>
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-green-700 underline"
            >
              Open Spotify Playlist
            </a>
          </div>
        </div>
      )}
    </section>
  );
}