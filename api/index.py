import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import json
import base64

app = FastAPI(title="Kolory Chat Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("[DEBUG] api/index.py załadowany")
print("[DEBUG] OPENAI_API_KEY obecny?", "TAK" if "OPENAI_API_KEY" in os.environ else "NIE")
print("[DEBUG] Długość klucza:", len(os.environ.get("OPENAI_API_KEY", "")))

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Message(BaseModel):
    text: str

class PhotoAnalysisRequest(BaseModel):
    imageBase64: str
    playlistName: str
    userMood: str = None
    tracksCount: int = 5


def analyze_photo_for_spotify(image_base64: str, playlist_name: str, user_mood: str = None, tracks_count: int = 5) -> dict:
    """
    Analizuje obraz za pomocą GPT Vision i generuje optimalne zapytanie Spotify.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or len(api_key) < 40:
        raise HTTPException(status_code=500, detail="Brak poprawnego klucza OPENAI_API_KEY")

    try:
        system_prompt = """You are an expert music curator AI. Analyze images and generate Spotify playlist data.

CRITICAL RULES:
1. SEARCHQUERY MUST BE A REAL MUSIC GENRE/STYLE - NO MOODS
2. Use only searchable Spotify terms
3. Combine: genre + vibe (style descriptor)
4. Output ONLY valid JSON, no explanations

GENRE EXAMPLES (GOOD):
- "lofi chill beats"
- "dark ambient electronic"  
- "indie pop summer"
- "sad acoustic piano"
- "night drive synthwave"
- "upbeat dance electronic"
- "indie folk acoustic"
- "deep house electronic"
- "ambient sleep music"
- "lo-fi hip hop"

FORBIDDEN (BAD) QUERIES:
- "happy mood"
- "sad feeling"
- "energetic vibes"
- "calm aesthetic"
- "peaceful atmosphere"

TRACKS MUST:
- Be realistic artist/title pairs
- Likely exist on Spotify
- Match search query

OUTPUT (STRICT JSON ONLY):
{
  "searchQuery": "MUST BE REAL GENRE + STYLE, 2-5 words",
  "tracks": [{"title": "...", "artist": "..."}]
}"""

        user_prompt = f"""Analyze this image and generate Spotify playlist data.

Playlist name: {playlist_name}
Number of tracks: {tracks_count}
"""
        if user_mood:
            user_prompt += f"Optional user preference: {user_mood}\n"

        user_prompt += """
RETURN ONLY VALID JSON. NO TEXT OUTSIDE JSON."""

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": system_prompt + "\n\n" + user_prompt
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=500
        )

        result_text = response.choices[0].message.content.strip()

        try:
            result = json.loads(result_text)
        except json.JSONDecodeError:
            json_match = result_text.find('{')
            if json_match != -1:
                json_end = result_text.rfind('}') + 1
                result = json.loads(result_text[json_match:json_end])
            else:
                print("[ERROR] Could not parse JSON from:", result_text[:200])
                raise ValueError("Nie udało się sparsować JSON z odpowiedzi GPT")

        search_query = result.get("searchQuery", "indie pop").strip()
        
        if not search_query or search_query.lower() in ["mood", "feeling", "vibes", "aesthetic"]:
            search_query = "indie pop acoustic"
        
        if "mood" in search_query.lower() or "feeling" in search_query.lower():
            search_query = "indie pop"

        result["searchQuery"] = search_query
        result["tracks"] = result.get("tracks", [])[:tracks_count]

        print("[DEBUG] Photo analysis completed")
        print("[DEBUG] Search query:", result["searchQuery"])
        print("[DEBUG] Tracks found:", len(result["tracks"]))

        return result

    except Exception as e:
        print("[ERROR] Błąd w analyze_photo_for_spotify:", str(e))
        raise HTTPException(status_code=500, detail=f"Błąd analizy zdjęcia: {str(e)}")



@app.get("/api/test")
async def test():
    print("[DEBUG] Endpoint /api/test wywołany")
    return {
        "status": "Backend działa 😎",
        "klucz_length": len(os.environ.get("OPENAI_API_KEY", ""))
    }


@app.post("/api/analyze-photo")
async def analyze_photo(request: PhotoAnalysisRequest):
    """
    Analizuje przesłane zdjęcie i generuje dane do playlisty Spotify.
    """
    print("[DEBUG] Endpoint /api/analyze-photo wywołany")

    if not request.imageBase64 or len(request.imageBase64) < 100:
        raise HTTPException(status_code=400, detail="Obraz jest zbyt mały lub pusty")

    result = analyze_photo_for_spotify(
        image_base64=request.imageBase64,
        playlist_name=request.playlistName,
        user_mood=request.userMood,
        tracks_count=request.tracksCount
    )

    return result


@app.post("/api/chat")
async def chat(message: Message):

    user_text = message.text

    print("[DEBUG] Endpoint /api/chat wywołany")
    print("[DEBUG] Otrzymano:", user_text[:100])

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or len(api_key) < 40:
        return {"error": "Brak poprawnego klucza OPENAI_API_KEY"}

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Jesteś pomocnym chatbotem."},
                {"role": "user", "content": user_text}
            ]
        )

        reply = completion.choices[0].message.content

        print("[DEBUG] Odpowiedź GPT:", reply[:100])

        return {"reply": reply}

    except Exception as e:
        print("[ERROR] Błąd w /api/chat:", str(e))
        return {"error": str(e)}
