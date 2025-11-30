def detect_task(prompt: str):
    if "code" in prompt.lower():
        return "coding"
    if "design" in prompt.lower():
        return "design"
    if "explain" in prompt.lower():
        return "explanation"
    return "general"

def detect_slots(prompt: str):
    slots = []
    if "login" in prompt:
        slots.append("UI components, validation, responsiveness")
    return slots
