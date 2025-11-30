# Prompt Enhancer AI

[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-green)](https://fastapi.tiangolo.com/)
[![Groq AI](https://img.shields.io/badge/Groq-AI-purple)](https://groq.com/)

---

## 🚀 Project Overview

**Prompt Enhancer** is an AI-powered tool that **enhances and optimizes user prompts** to generate better AI outputs.  
Inspired by platforms like **ChatGPT, Gemini, and Prompt Cowboy**, it provides:

- Real-time prompt enhancement  
- ChatGPT-style typing animation  
- Creative, professional, and optimized prompts for various tasks

---

## 💡 Features

- Enhance prompts for creative writing, business ideas, emails, coding tasks, and more  
- Real-time streaming response (ChatGPT-style typing)  
- User-friendly React frontend with Tailwind CSS  
- Backend powered by **FastAPI** and **Groq AI**  
- Cross-origin support (CORS enabled) for easy integration  

---

## 🛠️ Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend    | React 18 + Tailwind CSS + Typewriter Effect |
| Backend     | Python 3.11 + FastAPI + Groq AI |
| Deployment  | Localhost (Development) |
| API         | REST API + StreamingResponse (Real-time) |

---

## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/prompt-enhancer.git
```
```
cd prompt-enhancer
```

### 2️⃣ Backend Setup (FastAPI)

- Navigate to backend:
  
  ```bash
  cd prompt-enhancer-backend
  ```
  
- Delete old virtual environment (IMPORTANT)
  
  ```bash
  Remove-Item -Recurse -Force venv
  ```
  
- Create new virtual environment:
  
  ```bash
  python -m venv venv
  ```
  
- Activate venv:
  
   ```bash
  venv\Scripts\activate
   ```
  ## Install all dependencies
  ```bash
  pip install --upgrade pip
  ```

  ```bash
  pip install -r requirements.txt
  ```

  ### 🔑 Add .env file (required)
   - Create a .env file inside backend folder:

  ```bash
  GROQ_API_KEY="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"
  ```

### ▶ Start backend server

```bash
uvicorn main:app --reload
```

### 3️⃣ Frontend Setup (React)
 - Open a new terminal.
 - Navigate to:
   ```bash
   cd prompt-enhancer-frontend
   ```
 - Install dependencies:
     ```bash
     npm install
     ```
 - Start frontend server:
     ```bash
     npm run dev
     ```
