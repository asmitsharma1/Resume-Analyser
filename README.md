# Resume-Analyser
# 🚀 AI Resume Analyzer (Fullstack Project)

A production-style **AI Resume Analyzer & Career Roadmap system** built while learning Fullstack Development, DevOps & Database integration.

This project automatically:
- Extracts skills from resume
- Suggests best career role
- Builds skill roadmap
- Tracks progress
- Uses database
- Frontend + Backend connected
- Ready for CI/CD

---

## 📌 Why I Built This

While learning:
- FastAPI
- Next.js
- Database (Supabase)
- CI/CD
- GitHub

I wanted to build a **real industry-level project** instead of small demos.

So I created:

> A system where user uploads resume  
> → AI extracts skills  
> → Matches job roles  
> → Suggests missing skills  
> → Tracks progress  
> → Scalable for future LLM integration  

---

## 🧠 Learning Journey & Errors Faced

### ❌ Error 1: Docker not connecting

Cannot connect to docker daemon

**Fix:**  
Started Docker Desktop properly.

---

### ❌ Error 2: Jenkins branch mismatch

refs/heads/master not found

**Fix:**  
Renamed branch:
```bash
git branch -M main



❌ Error 3: OpenAI quota exceeded

429 insufficient_quota

Fix:
Shifted to:
	•	HuggingFace local model
	•	Offline AI inference

⸻

❌ Error 4: Langchain import error

No module named text_splitter

Fix:
Used correct new import path.

⸻

❌ Error 5: Supabase DB not connecting

could not translate host name

Fix:
Used pooler connection string:

aws-1-ap-south-1.pooler.supabase.com


⸻

❌ Error 6: Career API returning empty

Reason:
	•	Role was case sensitive
	•	“ias” ≠ “IAS Officer”

Fix:
Converted input to lowercase:

role.lower().strip()


⸻

❌ Error 7: Frontend not showing skills

Reason:
Skills not passed to career API

Fix:
Stored skills:

localStorage.setItem("user_skills", skills)


⸻

❌ Error 8: .map() undefined crash

Cannot read map of undefined

Fix:
Used optional chaining:

data?.required_skills?.map()


⸻

⚙ Tech Stack

Backend
	•	FastAPI
	•	Python
	•	Supabase (PostgreSQL)
	•	SQLAlchemy

Frontend
	•	Next.js
	•	Tailwind CSS
	•	Framer Motion
	•	Shadcn UI

DevOps
	•	Git
	•	GitHub
	•	Jenkins
	•	Docker

⸻

🔥 Features

✔ Resume PDF upload
✔ Automatic skill extraction
✔ Role recommendation
✔ Skill gap analysis
✔ Career roadmap
✔ Progress percentage
✔ Database integration
✔ Google auth ready
✔ CI/CD ready
✔ Production architecture

⸻

🗂 Folder Structure

resume-analyser/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── venv/
│
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Upload.jsx
│   ├── career/
│
└── README.md


⸻

🛠️ How to Run Locally

Backend

cd backend
source venv/bin/activate
uvicorn main:app --reload

Runs on:

http://127.0.0.1:8000

Docs:

http://127.0.0.1:8000/docs


⸻

Frontend

cd frontend
npm run dev

Runs on:

http://localhost:3000


⸻

🔌 API Endpoints

Upload Resume

POST /upload

Career Roadmap

POST /career-plan


⸻

📊 Database Tables

users
resumes
skills

Tracks:
	•	user info
	•	resume history
	•	extracted skills

⸻

🧠 Architecture

User
  ↓
Frontend (Next.js)
  ↓
Backend (FastAPI)
  ↓
Skill Extraction Engine
  ↓
Role Matching Logic
  ↓
Supabase Database
  ↓
Career Roadmap


⸻

🎯 Future Plans

✔ Google Login
✔ Skill confidence tracking
✔ Dashboard UI
✔ Graph analytics
✔ LLM integration
✔ Resume score
✔ Job scraping
✔ CI/CD auto deploy

⸻

🏆 What I Learned
	•	Fullstack development
	•	API design
	•	Error debugging
	•	Database integration
	•	DevOps basics
	•	Real project architecture
	•	Production workflow

⸻

👨‍💻 Developer

Asmit Sharma
Founder – LifeFundies
B.Tech CSE
Vice President – E-Cell

GitHub:
https://github.com/asmitsharma1

⸻

⭐ If you like this project

Give it a ⭐ on GitHub ❤️

⸻

🎉 THANK YOU

This project was built from scratch,
debugging every error manually,
learning real industry skills.

⸻

🔥 Motivation Quote

“Projects don’t make you developer.
Debugging makes you developer.”

