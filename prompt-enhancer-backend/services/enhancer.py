from openai import OpenAI
import os
from dotenv import load_dotenv
from services.analyzer import detect_task, detect_slots

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def enhance_prompt(prompt: str):
    task = detect_task(prompt)
    slots = detect_slots(prompt)

    system_instruction = f"""
    You are a Prompt Enhancement AI. Your goal is to rewrite user prompts
    into highly detailed, optimized, clear and structured prompts.

    Task type: {task}
    Missing Slots: {slots}
    """

    response = client.chat.completions.create(
        model="gpt-5.1",
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content
