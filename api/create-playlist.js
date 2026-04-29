import axios from "axios";
import { URLSearchParams } from "url";

export default async function handler(req, res) {
  const { mood, genre, tracks, name, token } = req.body;

  console.log("[DEBUG] ===== CREATE PLAYLIST START =====");
  console.log("[DEBUG] Token received - length:", token ? token.length : 0);
  console.log("[DEBUG] Token preview:", token ? token.substring(0, 80) + "..." : "NO TOKEN");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  let userId = null;

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // ✅ Pobranie user ID
    console.log("[DEBUG] Calling /me endpoint...");
    const meResponse = await axios.get("https://api.spotify.com/v1/me", { headers });

    userId = meResponse.data.id;

    console.log("[DEBUG] User ID:", userId);
    console.log("[DEBUG] Full /me response keys:", Object.keys(meResponse.data));

    // 🔍 Szukanie utworów
    const searchQuery = [genre, mood].filter(Boolean).join(" ").trim();
    const limit = Math.max(1, Math.min(10, Number(tracks) || 5));

    console.log("[DEBUG] Search query:", searchQuery);

    const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
      headers,
      params: { q: searchQuery, type: "track", limit },
    });

    const tracks_list = searchResponse.data.tracks?.items || [];

    if (tracks_list.length === 0) {
      console.error("[ERROR] No tracks found");
      return res.status(404).json({ error: "No tracks found" });
    }

    const uris = tracks_list.map((t) => t.uri);

    console.log("[DEBUG] Tracks found:", uris.length);
    console.log("[DEBUG] Sample URI:", uris[0]);
    console.log("[DEBUG] All URIs:", JSON.stringify(uris));

    // 🎵 Tworzenie playlisty - UŻYJ /me/playlists zamiast /users/{id}/playlists
    console.log("[DEBUG] Creating playlist using /me/playlists endpoint");

    const createResponse = await axios.post(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: name || "My Photo Playlist 🎵",
        public: false,
        collaborative: false,
        description: "Generated from photo",
      },
      { headers }
    );

    const playlistId = createResponse.data.id;

    console.log("[DEBUG] Playlist created:", playlistId);

    console.log("[DEBUG] Adding tracks to playlist...");
    console.log("[DEBUG] Playlist ID:", playlistId);
    console.log("[DEBUG] Number of tracks to add:", uris.length);
    
    // Spotify API accepts both JSON and form-urlencoded for adding tracks
    // Try sending with proper formatting
    try {
      // 🔍 Log the exact payload being sent
      console.log("[DEBUG] Payload - URIs count:", uris.length);
      console.log("[DEBUG] Token preview for add:", token.substring(0, 50) + "...");
      
      // Try form-encoded format first (Spotify might prefer this)
      const params = new URLSearchParams();
      uris.forEach((uri, index) => {
        params.append("uris", uri);
      });
      
      console.log("[DEBUG] Trying form-encoded format...");
      
      const addTracksResponse = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        params,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      console.log("[DEBUG] Tracks added successfully!");
      console.log("[DEBUG] Snapshot ID:", addTracksResponse.data.snapshot_id);

      return res.json({
        url: createResponse.data.external_urls.spotify,
        playlistId,
        message: "Playlist created and tracks added!"
      });
    } catch (addError) {
      console.error("[ERROR] Form-encoded failed, trying JSON...");
      console.error("[ERROR] Status:", addError.response?.status);
      
      // Fallback to JSON
      try {
        const addTracksResponse = await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          { uris },
          { 
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("[DEBUG] Tracks added with JSON format!");
        return res.json({
          url: createResponse.data.external_urls.spotify,
          playlistId,
          message: "Playlist created and tracks added!"
        });
      } catch (jsonError) {
        console.error("[ERROR] Both methods failed!");
        console.error("[ERROR] JSON attempt status:", jsonError.response?.status);
        console.error("[ERROR] Error message:", jsonError.response?.data?.error?.message);
        
        // Return partial success - playlist WAS created even if tracks failed
        return res.json({
          url: createResponse.data.external_urls.spotify,
          playlistId,
          warning: "Playlist created but tracks could not be added",
          error: jsonError.response?.data?.error?.message
        });
      }
    }

  } catch (error) {
    console.error("[ERROR] ===== CREATE PLAYLIST FAILED =====");
    console.error("[ERROR] Message:", error.message);

    if (error.response) {
      console.error("[ERROR] Status:", error.response.status);
      console.error("[ERROR] Data:", JSON.stringify(error.response.data, null, 2));
      // NEW: extra debug info
      console.error("[ERROR] Token used:", token ? token.substring(0, 40) + "..." : "NONE");
      console.error("[ERROR] User ID at failure:", userId || "NOT FETCHED YET");
      console.error("[ERROR] Failed URL:", error.config?.url);
      console.error("[ERROR] Request headers sent:", JSON.stringify(error.config?.headers, null, 2));
    }

    return res.status(500).json({
      error: error.response?.data?.error?.message || error.message,
    });
  }
}