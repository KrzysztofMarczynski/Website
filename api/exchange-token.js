import axios from "axios";
import { URLSearchParams } from "url";

export default async function handler(req, res) {
  const { code } = req.body;

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("[ERROR] Brakujące zmienne env:", { 
      clientId: !!clientId, 
      clientSecret: !!clientSecret, 
      redirectUri: !!redirectUri 
    });
    return res.status(500).json({ error: "Brakujące zmienne środowiskowe" });
  }

  if (!code) {
    return res.status(400).json({ error: "Brak parametru 'code'" });
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokenData = response.data;

    console.log("[DEBUG] Token exchange successful");
    console.log("[DEBUG] Token type:", tokenData.token_type);
    console.log("[DEBUG] Expires in:", tokenData.expires_in);
    console.log("[DEBUG] Scope received:", tokenData.scope || "NO SCOPES");

    return res.status(200).json(tokenData);

  } catch (error) {
    console.error("[ERROR] Spotify token exchange failed:");
    if (error.response) {
      console.error("[ERROR] Status:", error.response.status);
      console.error("[ERROR] Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("[ERROR] Message:", error.message);
    }

    return res.status(500).json({ 
      error: error.response?.data?.error_description || 
             error.response?.data?.error || 
             error.message 
    });
  }
}