Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host "🏥 Hospital Management System - Unified Startup" -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found! Install from python.org" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Install from nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan

# Install Python packages
Write-Host "Installing Python packages..." -ForegroundColor Yellow
pip install fastapi uvicorn pydantic --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Python packages ready" -ForegroundColor Green
}

# Install Node packages
Write-Host "Installing Node packages..." -ForegroundColor Yellow
npm install --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node packages ready" -ForegroundColor Green
}

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host "🚀 Starting Services..." -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Start unified backend
Write-Host "🏥 Starting Unified API (Port 8000)..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", `
    "cd '$PWD\backend'; Write-Host '🏥 Hospital Management System API' -ForegroundColor Green; uvicorn unified_api:app --host 0.0.0.0 --port 8000 --reload"

Start-Sleep -Seconds 3

# Start React frontend
Write-Host "⚛️  Starting React Frontend (Port 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", `
    "cd '$PWD'; Write-Host '⚛️ React Frontend' -ForegroundColor Cyan; npm run dev"

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Green
Write-Host "✅ ALL SERVICES STARTED!" -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Green
Write-Host ""
Write-Host "📍 Access Points:" -ForegroundColor Yellow
Write-Host "   Backend API:       http://localhost:8000" -ForegroundColor White
Write-Host "   API Docs:          http://localhost:8000/docs" -ForegroundColor White
Write-Host "   React Frontend:    http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "🔧 API Routes:" -ForegroundColor Yellow
Write-Host "   Emergency Triage:  /api/emergency/*" -ForegroundColor White
Write-Host "   Navigation:        /api/navigation/*" -ForegroundColor White
Write-Host "   Appointments:      /api/appointments/*" -ForegroundColor White
Write-Host "   Health Check:      /api/health" -ForegroundColor White
Write-Host ""
Write-Host "⏳ Opening browser in 3 seconds..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "✨ System is ready! Check the new PowerShell windows for logs." -ForegroundColor Green
Write-Host "To stop: Close the PowerShell windows or press Ctrl+C in each." -ForegroundColor Gray
Write-Host ""
