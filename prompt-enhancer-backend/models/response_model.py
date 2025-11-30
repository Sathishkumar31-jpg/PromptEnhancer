from pydantic import BaseModel

class EnhanceResponse(BaseModel):
    enhanced_prompt: str
