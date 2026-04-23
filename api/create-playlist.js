import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.body;

  const clientId = process.env.VITE_Client_ID;
  const clientSecret = process.env.VITE_Client_secret;

  const redirectUri = process.env.REDIRECT_URI;

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

    return res.json(response.data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}