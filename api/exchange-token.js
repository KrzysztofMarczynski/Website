const axios = require("axios");
const { URLSearchParams } = require("url");

module.exports = async function handler(req, res) {
  const { code } = req.body;

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("[ERROR] Brakujące zmienne env:", { clientId: !!clientId, clientSecret: !!clientSecret, redirectUri: !!redirectUri });
    return res.status(500).json({ error: "Brakujące zmienne środowiskowe" });
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (e) {
    console.error("[ERROR] Spotify token exchange failed:", e.response?.data || e.message);
    return res.status(500).json({ error: e.response?.data?.error_description || e.message });
  }
};