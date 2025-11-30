# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# from groq import Groq
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()

# # ---------------------- CORS ----------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------------------- GROQ CLIENT ----------------------
# API_KEY = os.getenv("GROQ_API_KEY")
# client = Groq(api_key=API_KEY)
# # client = "gsk_nQngBohnErsBCdR6mLD3WGdyb3FY0yjwE7t83NFkwmCSPlXwudOhk"
# # client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# # ---------------------- INPUT MODEL ----------------------
# class PromptInput(BaseModel):
#     prompt: str

# # ---------------------- AI ENHANCER ENDPOINT ----------------------
# @app.post("/enhance")
# async def enhance_prompt(data: PromptInput):
#     try:
#         response = client.chat.completions.create(
#             model="llama-3.1-8b-instant",
#             messages=[
#                 {"role": "system", "content": "You enhance user prompts for better AI output."},
#                 {"role": "user", "content": f"Enhance this prompt: {data.prompt}"}
#             ],
#             temperature=0.4
#         )

#         # ✅ FIXED: Correct access method
#         enhanced = response.choices[0].message.content

#         return {"enhanced_prompt": enhanced}

#     except Exception as e:
#         print("Error:", e)
#         return {"error": str(e)}





from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import os
from dotenv import load_dotenv

# ---------------------- Load environment ----------------------
# Load .env only if running locally
load_dotenv()  # Safe: won't override existing environment variables

# Fetch the API key from environment or .env
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError(
        "GROQ_API_KEY not found! "
        "Set it in environment variables (GitHub Secrets for deployment) "
        "or in a local .env file for development."
    )

# ---------------------- Initialize Groq Client ----------------------
client = Groq(api_key=api_key)

# ---------------------- Initialize FastAPI ----------------------
app = FastAPI()

# ---------------------- CORS ----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------- Input Model ----------------------
class PromptInput(BaseModel):
    prompt: str

# ---------------------- AI Enhancer Endpoint ----------------------
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

        # Correct way to access enhanced content
        enhanced = response.choices[0].message.content
        return {"enhanced_prompt": enhanced}

    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}
