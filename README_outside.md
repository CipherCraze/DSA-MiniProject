# 🏥 Hospital Management System - DSA Mini Project

A comprehensive **Hospital Management System** built with **React + Vite** frontend and **Python** backend, connected via **Fast API** implementing various **Data Structures and Algorithms** for  hospital operations.

⚠️ Use the `backend\backup.py` as an alternate.

## Required Software

1. **Node.js** (v20.19+ or 22.12+)
2. **Python** (v3.8 or higher)

## How to Setup

### Setup Frontend
1. Open terminal in the root directory
- Ensure that Node.Js works:

```bash
node --v
```
- Install all dependencies:
```bash
npm i
```
This will install:
- React 19.1.1
- Vite 7.1.7
- Tailwind CSS 3.4.18
- Framer Motion 12.23.24
- React Router DOM 7.9.4
- Lucide React (Icons)
- Recharts (Charts)
- And other dependencies from `package.json`

#### Run Frontend Code:

```bash
npm run dev
```

### Setup Backend (USE A SEPERATE TERMINAL)
2. Navigate to the backend folder:
- Use the command to go to the backend folder:

```bash
cd backend
```
- Install the python libraries required
```bash
pip install -r 'requirements.txt'
```

This will install:
- FastAPI 0.115.6
- Uvicorn 0.34.0
- Pydantic 2.10.5

#### Run the BACKEND:
After ensuring that you are in the backend folder:

```bash
uvicorn unified_api:app --host 0.0.0.0 --port 8000 --reload
```

⚠️ Run the frontend and the backend in seperate terminals
___

### Access Points
Once both servers are running, access the application at:

- **Frontend (Main UI)**: http://localhost:5173 (or 5174 if port is occupied)
- **Backend API**: http://localhost:8000
- **API Documentation (Swagger)**: http://localhost:8000/docs

### 🔄 Using Backup Terminal-Based System

If the web-based system doesn't work or you prefer a **command-line interface**, use the backup system:

#### What is backup.py?
`backup.py` is a **terminal-based fallback** that provides direct CLI access to hospital systems without requiring a web browser or frontend server. Perfect for:
- Testing backend logic independently
- Debugging without UI complications  
- Quick demonstrations
- Systems with limited resources

#### Running the Backup System:

```bash
cd backend
python backup.py
```