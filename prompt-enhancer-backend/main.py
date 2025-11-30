from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ---------------------- CORS ----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------- GROQ CLIENT ----------------------
client = os.getenv("GROQ_API_KEY")

# ---------------------- INPUT MODEL ----------------------
class PromptInput(BaseModel):
    prompt: str

# ---------------------- AI ENHANCER ENDPOINT ----------------------
@app.post("/enhance")
async def enhance_prompt(data: PromptInput):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You enhance user prompts for better AI output."},
                {"role": "user", "content": f"Enhance this prompt: {data.prompt}"}
            ],
            temperature=0.4
        )

        # ✅ FIXED: Correct access method
        enhanced = response.choices[0].message.content

        return {"enhanced_prompt": enhanced}

    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}
