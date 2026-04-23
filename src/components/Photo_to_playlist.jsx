import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Print() {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🎧 NEW STATES
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");
  const [tracks, setTracks] = useState(20);
  const [expanded, setExpanded] = useState(false);

  // 🔐 LOGIN SPOTIFY
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

  // 🔄 CALLBACK
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
          window.history.replaceState({}, document.title, "/");
        });
    }
  }, []);

  // 🎵 GENERATE PLAYLIST
  const generatePlaylist = async () => {
    const savedToken = token || localStorage.getItem("spotify_token");

    if (!savedToken) return alert("Zaloguj się do Spotify");

    setLoading(true);
    setExpanded(true);

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          genre,
          tracks,
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
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16
                     bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                     bg-clip-text text-transparent"
      >
        Photo to Playlist
      </motion.h2>

      {/* DESCRIPTION */}
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

      {/* UPLOAD + SETTINGS */}
      {!token && (
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
            />
          )}

          {/* SETTINGS */}
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6">
            {/* GENRE */}
            <div className="mb-4">
              <label className="block mb-2">Genre of music:</label>
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 rounded"
              />
            </div>

            {/* MOOD */}
            <div className="mb-4">
              <label className="block mb-2">Mood:</label>
              <input
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 rounded"
              />
            </div>

   {/* SLIDER */}
<div>
  <label className="block mb-2">
    Tracks: <span className="text-purple-400">{tracks}</span>
  </label>

  <input
    type="range"
    min="10"
    max="50"
    value={tracks}
    onChange={(e) => setTracks(e.target.value)}
    className="w-full accent-purple-500"
  />

  <div className="flex justify-between text-xs text-gray-400">
    <span>10</span>
    <span>50</span>
  </div>
</div>

{/* 🎵 RESULT CARD (NOWE) */}
{playlistUrl && expanded && (
  <div className="mt-6 p-5 bg-gray-800 border border-gray-700 rounded-2xl text-center">
    <h4 className="text-lg font-semibold mb-3 text-white">
      Your playlist is ready 🎉
    </h4>

    <a
      href={playlistUrl}
      target="_blank"
      className="text-green-400 underline text-lg"
    >
      Open Spotify Playlist
    </a>
  </div>
)}
          </div>

          {/* BUTTON */}
          <a
            onClick={generatePlaylist}
            className="inline-flex items-center gap-3 mt-6 px-8 py-4 
                       bg-purple-600 hover:bg-purple-700 
                       text-white font-medium text-lg rounded-xl cursor-pointer"
            font-medium
            text-lg
            rounded-xl
            cursor-pointer
          >
            {loading ? "Generating..." : "Generate Playlist"}
          </a>
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
