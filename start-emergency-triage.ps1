# Emergency Triage System - Quick Start Script
# This script starts both backend and frontend servers

Write-Host "🚑 Emergency Triage System - Starting..." -ForegroundColor Cyan
Write-Host ""

# Check Python installation
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found! Please install Python 3.8+" -ForegroundColor Red
    exit 1
}

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js 20.18+" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
Write-Host ""

# Install Python dependencies
Write-Host "Installing Python packages (FastAPI, Uvicorn)..." -ForegroundColor Yellow
pip install fastapi uvicorn pydantic --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Python dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install Python dependencies" -ForegroundColor Red
    exit 1
}

# Install Node.js dependencies
Write-Host "Installing Node.js packages (React, Vite, Tailwind)..." -ForegroundColor Yellow
npm install --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install Node.js dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Starting servers..." -ForegroundColor Cyan
Write-Host ""

# Start backend server in a new window
Write-Host "Starting Backend (FastAPI) on http://localhost:8000" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; cd backend; python emergency_api.py"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend server in a new window
Write-Host "Starting Frontend (Vite) on http://localhost:5173" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

# Wait for frontend to start
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Access Points:" -ForegroundColor Cyan
Write-Host "   Frontend:  http://localhost:5173/triage" -ForegroundColor White
Write-Host "   Backend:   http://localhost:8000" -ForegroundColor White
Write-Host "   API Docs:  http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "⚡ Opening browser in 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:5173/triage"

Write-Host ""
Write-Host "🎉 System is ready! Check the new PowerShell windows for server logs." -ForegroundColor Green
Write-Host ""
Write-Host "To stop servers: Close the PowerShell windows or press Ctrl+C in each." -ForegroundColor Gray
Write-Host ""
