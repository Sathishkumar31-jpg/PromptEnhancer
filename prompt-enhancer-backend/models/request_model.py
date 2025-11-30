from pydantic import BaseModel

class EnhanceRequest(BaseModel):
    prompt: str
