from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import re

app = FastAPI()

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # prod me frontend domain daalna
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= SKILL DATASET =================
TECH_SKILLS = [
    "python","java","javascript","c","c++","php","go","rust",
    "react","nextjs","angular","vue",
    "html","css","tailwind","bootstrap",
    "node","express","spring","spring boot",
    "fastapi","django","flask",
    "sql","mysql","postgresql","mongodb",
    "firebase","supabase","redis",
    "docker","kubernetes","aws","azure",
    "gcp","jenkins","github actions",
    "linux","nginx",
    "git","github","postman","figma",
    "flutter","react native","kotlin","swift",
    "wordpress","shopify",
    "pandas","numpy","machine learning",
    "deep learning","power bi","tableau"
]

# ================= ROLE MAP =================
ROLE_MAP = {

# ---------- ENGINEERING ----------
"Backend Developer": ["python","java","sql","spring","fastapi","django","node"],
"Frontend Developer": ["react","html","css","javascript","tailwind","nextjs"],
"Full Stack Developer": ["react","node","sql","docker","javascript"],
"Software Engineer": ["java","python","git","sql"],
"DevOps Engineer": ["docker","kubernetes","aws","linux","jenkins"],
"Cloud Engineer": ["aws","azure","gcp","docker","linux"],
"Site Reliability Engineer": ["linux","aws","kubernetes"],
"Mobile App Developer": ["flutter","react native","kotlin","swift"],
"AI Engineer": ["machine learning","python","deep learning"],
"Data Scientist": ["python","machine learning","pandas","numpy"],
"Cyber Security Analyst": ["network","linux","security"],
"Blockchain Developer": ["solidity","web3","ethereum"],

# ---------- LAW ----------
"Corporate Lawyer": ["corporate law","contract","compliance"],
"Criminal Lawyer": ["criminal law","ipc","crpc"],
"Legal Advisor": ["legal research","case analysis"],
"IP Lawyer": ["patent","trademark","copyright"],
"Judicial Services Aspirant": ["constitution","ipc","crpc","cpc"],
"Legal Content Writer": ["legal drafting","research"],

# ---------- MEDICAL ----------
"General Physician": ["mbbs","diagnosis","patient care"],
"Surgeon": ["surgery","anatomy"],
"Pediatrician": ["child care","mbbs"],
"Radiologist": ["ct scan","mri","imaging"],
"Medical Researcher": ["clinical trials","research"],
"Hospital Administrator": ["health management","operations"],

# ---------- CIVIL SERVICES ----------
"IAS Officer": ["polity","economy","ethics","current affairs"],
"IPS Officer": ["law","leadership","public safety"],
"IRS Officer": ["taxation","finance"],
"State PCS Officer": ["administration","governance"],
"Policy Analyst": ["public policy","research"],

# ---------- MANAGEMENT ----------
"Product Manager": ["product design","agile","roadmap"],
"Business Analyst": ["excel","data analysis","reporting"],
"HR Manager": ["recruitment","people management"],
"Marketing Manager": ["digital marketing","seo","branding"],
"Operations Manager": ["process management"],

# ---------- DESIGN ----------
"UI/UX Designer": ["figma","design","wireframe"],
"Graphic Designer": ["photoshop","illustrator"],
"Motion Designer": ["after effects","animation"],

# ---------- FINANCE ----------
"Investment Banker": ["finance","valuation"],
"Chartered Accountant": ["taxation","accounting"],
"Financial Analyst": ["excel","modeling"],
"Risk Analyst": ["risk management"],

# ---------- EDUCATION ----------
"Professor": ["teaching","research"],
"Online Tutor": ["subject expertise","communication"],
"Curriculum Designer": ["education design"],

# ---------- MEDIA ----------
"Journalist": ["news writing","reporting"],
"Content Creator": ["youtube","social media"],
"Public Relations Officer": ["communication","branding"],

# ---------- STARTUP ----------
"Startup Founder": ["business","funding","leadership"],
"Growth Manager": ["marketing","analytics"],
"Community Manager": ["networking","engagement"]
}

# ================= HELPERS =================

def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file.file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.lower()

def find_skills(text):
    found = []
    for skill in TECH_SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text):
            found.append(skill)
    return list(set(found))

def suggest_role(skills):
    score = {}
    for role, req in ROLE_MAP.items():
        match = len(set(skills) & set(req))
        score[role] = match
    best = max(score, key=score.get)
    return best, score

def match_role_case_insensitive(role_input):
    clean = role_input.strip().lower()
    for r in ROLE_MAP:
        if r.lower() == clean:
            return r
    return None

# ================= ROUTES =================

@app.get("/")
def home():
    return {"msg":"Resume Analyzer API running"}

# ---------- UPLOAD ----------
@app.post("/upload")
def upload_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file)
    skills = find_skills(text)

    best_role, score_map = suggest_role(skills)

    return {
        "skills_found": skills,
        "total_skills": len(skills),
        "suggested_role": best_role,
        "role_match_score": score_map
    }

# ---------- CAREER ROADMAP ----------
@app.post("/career-plan")
def career_plan(data: dict):

    role_input = data.get("target_role","")
    user_skills = data.get("user_skills",[])

    matched_role = match_role_case_insensitive(role_input)

    if not matched_role:
        return {"error":"Role not found"}

    required = ROLE_MAP[matched_role]

    user_skills_clean = [s.lower() for s in user_skills]

    missing = [s for s in required if s.lower() not in user_skills_clean]

    progress = int(((len(required)-len(missing))/len(required))*100)

    return {
        "target_role": matched_role,
        "your_skills": user_skills,
        "required_skills": required,
        "missing_skills": missing,
        "progress_percent": progress,
        "next_step": f"Start learning {missing[0]}" if missing else "You are job ready!"
    }