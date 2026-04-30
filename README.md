# 🎓 Scholaryat AI (In Progress 🚧)

🚀 AI-powered scholarship matching platform that analyzes student resumes and transcripts to deliver **highly personalized scholarship recommendations**.

🌐 **Live Demo:** https://your-vercel-link.vercel.app  
📂 **GitHub Repo:** https://github.com/hayattahmed22/scholaryat-ai

---

## 🚧 Project Status

This project is **actively in development**.  
Core functionality is working, but improvements are being made to:

- 📄 Resume parsing accuracy  
- 🎯 Scholarship relevance & filtering  
- ⚡ Performance and reliability  
- 💳 Monetization (premium unlocks)

---

## ✨ Current Features

- 📄 Upload Resume + Transcript
- 🧠 AI extracts:
  - GPA
  - Major
  - Skills
  - Citizenship
- 🎯 Personalized scholarship matching (basic version)
- ⚡ Real-time matching via n8n workflows
- 🔒 Freemium model:
  - Free → 5 scholarships
  - Paid → unlock all matches (UI ready)

---

## 🧠 How It Works

1. User uploads resume + transcript  
2. Text is extracted and structured  
3. Data is sent to an AI matching engine (n8n + LLM)  
4. Scholarships are ranked based on relevance  
5. Results are displayed in the UI  

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend / Logic
- n8n (automation workflows)
- OpenAI / LLMs (reasoning + matching)

### Database
- Supabase (PostgreSQL)

---

## 🔥 What Makes This Different

❌ Most platforms:
- Show generic “no essay” scholarships  
- Don’t use actual student data  

✅ Scholaryat AI:
- Reads real resumes  
- Extracts structured student profiles  
- Matches based on **actual eligibility + relevance**

---

## ⚠️ Current Limitations

- PDF/DOCX parsing not fully automated yet  
- Some matches may still be generic (improving filtering logic)  
- Dataset still being refined  

---

## 🚀 Planned Improvements

- 📄 Full automatic resume parsing  
- 🎯 Strong filtering (major, GPA, citizenship)  
- 💳 Stripe integration for premium  
- 📧 Scholarship alerts (email system)  
- 🤖 Better ranking algorithm (ML-based scoring)

---

## 🧪 Example Use Case

A student with:
- GPA: 3.8  
- Major: Computer Science  
- Interests: AI, Cybersecurity  

➡️ Gets scholarships tailored to:
- Tech fields  
- Women in STEM  
- High academic performers  
