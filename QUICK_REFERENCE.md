# 🚀 Emergency Triage - Quick Reference

## ⚡ One-Command Start

```powershell
.\start-emergency-triage.ps1
```

This automatically:
- ✅ Checks Python & Node.js
- ✅ Installs all dependencies
- ✅ Starts backend (port 8000)
- ✅ Starts frontend (port 5173)
- ✅ Opens browser

---

## 📋 Manual Start (2 terminals)

### Terminal 1: Backend
```powershell
cd backend
python emergency_api.py
```

### Terminal 2: Frontend
```powershell
npm run dev
```

---

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend UI** | http://localhost:5173/triage | Main application |
| **Backend API** | http://localhost:8000 | API root |
| **API Docs** | http://localhost:8000/docs | Swagger UI |
| **Health Check** | http://localhost:8000/api/health | Server status |

---

## 🎮 Quick Actions

### Register Patient
1. Click "Register New Patient"
2. Fill: Name, Age, Symptom
3. Click "✅ Register Patient"

### Treat Patient
- Click "Treat Next Patient" (removes highest priority)

### View Symptoms
- Click "Symptom Guide" to see all 40+ symptoms

### Clear Queue
- Click "Clear Queue" → Confirm (removes all patients)

---

## 🔍 Symptom Examples

| Severity | Examples |
|----------|----------|
| 🔴 Critical | heart attack, stroke, cardiac arrest, severe bleeding |
| 🟠 Serious | fracture, high fever, severe pain, chest pain |
| 🟡 Moderate | food poisoning, minor injury, asthma, migraine |
| 🟢 Normal | cold, minor headache, allergic reaction, cough |

*Type symptoms in lowercase (e.g., "heart attack")*

---

## 🛠️ Troubleshooting

### Backend won't start?
```powershell
pip install fastapi uvicorn pydantic
```

### Frontend won't start?
```powershell
npm install
```

### Can't connect?
- Verify backend is running: `http://localhost:8000/api/health`
- Check firewall settings
- Clear browser cache (Ctrl+Shift+R)

### "Invalid symptom" error?
- Use Symptom Guide to find valid symptoms
- Enter in lowercase (e.g., "heart attack" not "Heart Attack")

---

## 📊 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/patients` | Get all patients |
| POST | `/api/patients` | Add new patient |
| POST | `/api/patients/treat` | Treat next patient |
| GET | `/api/stats` | Get statistics |
| GET | `/api/symptoms` | Get all symptoms |
| DELETE | `/api/patients/clear` | Clear queue |

---

## 🧪 Test Scenario

**Goal:** Verify priority ordering

1. Register "Alice" with "heart attack" (Critical 🔴)
2. Register "Bob" with "cold" (Normal 🟢)
3. Register "Charlie" with "fracture" (Serious 🟠)

**Expected Queue:**
```
1. Alice (Critical) 🔴
2. Charlie (Serious) 🟠
3. Bob (Normal) 🟢
```

✅ **Pass:** Higher priority patients appear first

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/emergency_api.py` | FastAPI server |
| `backend/Emergency_Management.py` | Core algorithm |
| `src/pages/EmergencyTriage.jsx` | React UI |
| `start-emergency-triage.ps1` | Automation script |
| `EMERGENCY_TRIAGE_SETUP.md` | Full documentation |

---

## 🎯 Success Checklist

- ✅ Both servers running
- ✅ Frontend loads at localhost:5173/triage
- ✅ Can register patients
- ✅ Queue shows in priority order
- ✅ Treat Patient works
- ✅ Statistics update
- ✅ No console errors (F12)

---

## 🎉 Demo Tips

1. **Start with empty queue** (Clear Queue button)
2. **Add 3-4 patients** with different severities
3. **Show Symptom Guide** (explain 4 categories)
4. **Treat top patient** (explain priority)
5. **Show statistics** (real-time updates)
6. **Add urgent patient** (jumps to front)

**Time:** 2-3 minutes

---

## 📞 Need Help?

Read full guide:
```powershell
code EMERGENCY_TRIAGE_SETUP.md
```

Check implementation:
```powershell
code INTEGRATION_SUMMARY.md
```

---

**🏥 Ready to Impress! 🚀**

*Last Updated: 2024-01-15*
