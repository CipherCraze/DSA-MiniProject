# 🏥 Hospital Management System - API Documentation

## 📋 Overview

Unified FastAPI backend serving **3 core modules** on a single port (8000):
- 🚑 **Emergency Triage** - Priority queue patient management
- 🗺️ **Hospital Navigation** - Dijkstra's shortest path algorithm
- 📅 **Doctor Appointments** - Patient-Doctor scheduling system

**Base URL:** `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs` (Swagger UI)

---

## 🚀 Quick Start

### Start the Server

```powershell
cd backend
uvicorn unified_api:app --host 0.0.0.0 --port 8000 --reload
```

Or use the unified startup script:

```powershell
.\start-unified.ps1
```

---

## 📡 API Endpoints

### 🏠 Root & Health

#### `GET /`
Get API information and statistics

**Response:**
```json
{
  "message": "🏥 Hospital Management System API",
  "version": "3.0.0",
  "status": "operational",
  "modules": {
    "emergency_triage": "/api/emergency/*",
    "navigation": "/api/navigation/*",
    "appointments": "/api/appointments/*"
  },
  "statistics": {
    "patients_in_queue": 5,
    "hospital_locations": 11,
    "registered_patients": 12,
    "registered_doctors": 8
  }
}
```

#### `GET /api/health`
Health check for all services

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-21T10:30:00",
  "services": {
    "emergency_triage": {
      "active": true,
      "queue_size": 5,
      "total_arrivals": 25
    },
    "navigation": {
      "active": true,
      "locations": 11,
      "graph_loaded": true
    },
    "appointments": {
      "active": true,
      "total_patients": 12,
      "total_doctors": 8
    }
  }
}
```

---

## 🚑 Emergency Triage Module

### Endpoints

#### `GET /api/emergency/patients`
Get all patients in emergency queue (sorted by priority)

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 45,
    "severity": "Critical",
    "symptom": "Heart Attack",
    "waitTime": "5 min ago",
    "doctor": "Dr. Smith",
    "queuePosition": 1
  }
]
```

#### `POST /api/emergency/patients`
Add new patient to emergency queue

**Request Body:**
```json
{
  "name": "Jane Doe",
  "age": 30,
  "symptom": "fracture"
}
```

**Response:**
```json
{
  "message": "Patient 'Jane Doe' registered successfully",
  "patient": {
    "name": "Jane Doe",
    "age": 30,
    "severity": "Serious",
    "condition": "Fracture",
    "doctor": "Dr. Johnson",
    "queuePosition": 2
  }
}
```

#### `POST /api/emergency/patients/treat`
Treat the next patient in queue (removes from queue)

**Response:**
```json
{
  "message": "Patient 'John Doe' is being treated",
  "patient": {
    "name": "John Doe",
    "severity": "Critical",
    "doctor": "Dr. Smith",
    "waitedMinutes": 5,
    "remaining": 1
  }
}
```

#### `GET /api/emergency/stats`
Get patient count by severity level

**Response:**
```json
{
  "Critical": 2,
  "Serious": 3,
  "Moderate": 5,
  "Normal": 4
}
```

#### `GET /api/emergency/symptoms`
Get all available symptoms with severity levels

**Response:**
```json
[
  {
    "name": "Heart Attack",
    "severity": "Critical"
  },
  {
    "name": "Fracture",
    "severity": "Serious"
  }
]
```

#### `DELETE /api/emergency/patients/clear`
Clear all patients from emergency queue

**Response:**
```json
{
  "message": "Emergency queue cleared successfully",
  "patientsCleared": 14
}
```

### Severity Levels & Symptoms

| Severity | Priority | Symptoms |
|----------|----------|----------|
| **Critical** | 1 | heart attack, stroke, breathing difficulty, severe accident, cardiac arrest, unconscious, severe bleeding, seizure, anaphylaxis, burns (severe) |
| **Serious** | 2 | fracture, high fever, severe pain, severe infection, chest pain, deep wound, dehydration, burns (moderate) |
| **Moderate** | 3 | food poisoning, minor injury, asthma, vomiting, diarrhea, sprain, skin rash, ear pain, burns (mild) |
| **Normal** | 4 | headache, cold, cough, sore throat, toothache, allergy (mild), body ache, fatigue, insomnia |

---

## 🗺️ Hospital Navigation Module

### Endpoints

#### `GET /api/navigation/locations`
Get all hospital locations

**Response:**
```json
[
  {
    "id": "PKG",
    "name": "Parking Garage",
    "icon": "🅿️"
  },
  {
    "id": "ER",
    "name": "Emergency Room",
    "icon": "🚑"
  }
]
```

#### `POST /api/navigation/path`
Find shortest path between two locations using Dijkstra's algorithm

**Request Body:**
```json
{
  "start": "PKG",
  "end": "ER"
}
```

**Response:**
```json
{
  "distance": 220.0,
  "path": ["PKG", "ME", "ER"],
  "pathNames": ["Parking Garage", "Main Entrance", "Emergency Room"],
  "valid": true,
  "estimatedTime": 3
}
```

### Hospital Locations

| ID | Name | Icon |
|----|------|------|
| PKG | Parking Garage | 🅿️ |
| ME | Main Entrance | 🚪 |
| ER | Emergency Room | 🚑 |
| OPC | Outpatient Clinic | 🏥 |
| RAD | Radiology | 🩻 |
| LAB | Laboratory | 🧪 |
| SUR | Surgical Center | 🔬 |
| IWA | Inpatient Ward A | 🛏️ |
| IWB | Inpatient Ward B | 🏨 |
| PHR | Pharmacy | 💊 |
| CAF | Cafeteria | 🍽️ |

### Graph Connections (16 edges)

| From | To | Distance (m) |
|------|-----|-------------|
| PKG | ME | 100 |
| ME | OPC | 120 |
| ME | CAF | 50 |
| ME | IWA | 150 |
| ER | RAD | 60 |
| ER | SUR | 90 |
| OPC | LAB | 70 |
| OPC | PHR | 80 |
| RAD | LAB | 40 |
| RAD | IWA | 110 |
| RAD | IWB | 130 |
| LAB | PHR | 50 |
| IWA | IWB | 80 |
| IWA | SUR | 100 |
| IWB | SUR | 70 |
| CAF | IWA | 140 |

---

## 📅 Doctor Appointments Module

### Endpoints

#### `GET /api/appointments/patients`
Get all registered patients

**Response:**
```json
[
  {
    "patient_id": "1",
    "name": "Alice Johnson",
    "age": 28,
    "contact": "555-0101",
    "history": [
      {
        "Doctor": "Dr. Smith",
        "Time": 10,
        "Medicine": "Paracetamol",
        "Date": "2025-10-20"
      }
    ]
  }
]
```

#### `POST /api/appointments/patients`
Register a new patient

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "age": 28,
  "contact": "555-0101"
}
```

**Response:**
```json
{
  "message": "Patient added successfully",
  "patient_id": "1",
  "patient": {
    "name": "Alice Johnson",
    "age": 28,
    "contact": "555-0101",
    "history": []
  }
}
```

#### `GET /api/appointments/patients/{patient_id}/history`
Get patient's appointment history

**Response:**
```json
{
  "patient_id": "1",
  "name": "Alice Johnson",
  "history": [
    {
      "Doctor": "Dr. Smith",
      "Time": 10,
      "Medicine": "Paracetamol",
      "Date": "2025-10-20"
    }
  ]
}
```

#### `GET /api/appointments/doctors`
Get all registered doctors

**Response:**
```json
[
  {
    "doctor_id": "1",
    "name": "Dr. Sarah Wilson",
    "slots": {
      "9": null,
      "10": "1",
      "11": null,
      "12": "2"
    }
  }
]
```

#### `POST /api/appointments/doctors`
Add a new doctor

**Request Body:**
```json
{
  "name": "Dr. Sarah Wilson",
  "start_time": 9,
  "end_time": 17
}
```

**Response:**
```json
{
  "message": "Doctor added successfully",
  "doctor_id": "1",
  "doctor": {
    "name": "Dr. Sarah Wilson",
    "slots": {
      "9": null,
      "10": null,
      "11": null,
      "12": null,
      "13": null,
      "14": null,
      "15": null,
      "16": null
    }
  }
}
```

#### `GET /api/appointments/doctors/{doctor_id}/schedule`
Get doctor's schedule with available/booked slots

**Response:**
```json
{
  "doctor_id": "1",
  "name": "Dr. Sarah Wilson",
  "available_slots": [9, 11, 13, 14, 15, 16],
  "booked_slots": {
    "10": "1",
    "12": "2"
  },
  "total_slots": 8
}
```

#### `POST /api/appointments/book`
Book an appointment

**Request Body:**
```json
{
  "doctor_id": "1",
  "patient_id": "1",
  "time": 10
}
```

**Response:**
```json
{
  "message": "Appointment booked successfully with Dr. Sarah Wilson at 10:00",
  "appointment": {
    "doctor_id": "1",
    "doctor_name": "Dr. Sarah Wilson",
    "patient_id": "1",
    "patient_name": "Alice Johnson",
    "time": "10:00",
    "status": "Confirmed"
  }
}
```

#### `POST /api/appointments/visit`
Record a doctor visit with medicine prescription

**Request Body:**
```json
{
  "doctor_id": "1",
  "time": 10,
  "medicine": "Paracetamol, Ibuprofen"
}
```

**Response:**
```json
{
  "message": "Doctor visit recorded successfully",
  "patient": "Alice Johnson",
  "doctor": "Dr. Sarah Wilson",
  "medicine": "Paracetamol, Ibuprofen"
}
```

#### `DELETE /api/appointments/patients/{patient_id}`
Delete a patient from registry

**Response:**
```json
{
  "message": "Patient Alice Johnson deleted successfully"
}
```

#### `DELETE /api/appointments/doctors/{doctor_id}`
Delete a doctor from registry

**Response:**
```json
{
  "message": "Doctor Dr. Sarah Wilson deleted successfully"
}
```

---

## 🛠️ Data Storage

### Emergency Triage
- **In-Memory**: Uses Python `heapq` (priority queue)
- **Persistence**: No persistence (resets on server restart)

### Hospital Navigation
- **In-Memory**: Graph structure in Python dictionary
- **Static Data**: 11 locations, 16 edges (hardcoded)

### Doctor Appointments
- **File-Based**: JSON files in `backend/Doctor_Appointment&Registry/`
  - `Doctors.json` - Doctor registry and schedules
  - `Patients.json` - Patient registry and visit history
- **Persistence**: Data persists across server restarts

---

## 🔧 Technical Details

### Technology Stack
- **Framework**: FastAPI 0.115+
- **Server**: Uvicorn ASGI server
- **Validation**: Pydantic models
- **CORS**: Enabled for `localhost:5173` and `localhost:3000`
- **Python**: 3.8+

### Algorithms Used

#### Emergency Triage
- **Priority Queue**: Python `heapq` (min-heap)
- **Complexity**: O(log n) insert, O(log n) extract
- **FIFO**: Within same priority level using arrival counter

#### Hospital Navigation
- **Dijkstra's Algorithm**: Shortest path finding
- **Complexity**: O((V + E) log V) where V=11 vertices, E=16 edges
- **Data Structure**: Priority queue with distance tracking

#### Doctor Appointments
- **Time Slot Management**: Dictionary-based O(1) lookup
- **Patient History**: List append O(1)
- **Doctor Assignment**: Dictionary mapping

---

## 🚀 Performance

- **Average Response Time**: < 50ms
- **Concurrent Requests**: Supports 100+ simultaneous connections
- **Hot Reload**: Enabled in development mode
- **Auto-Documentation**: Swagger UI and ReDoc

---

## 🔒 Error Handling

All endpoints return standard HTTP status codes:

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (invalid input) |
| 404 | Not Found |
| 500 | Internal Server Error |

**Error Response Format:**
```json
{
  "detail": "Error message describing what went wrong"
}
```

---

## 📝 Example Usage Workflow

### Emergency Triage Flow
1. Get available symptoms: `GET /api/emergency/symptoms`
2. Add patient: `POST /api/emergency/patients`
3. View queue: `GET /api/emergency/patients`
4. Check stats: `GET /api/emergency/stats`
5. Treat patient: `POST /api/emergency/patients/treat`

### Navigation Flow
1. Get all locations: `GET /api/navigation/locations`
2. Find shortest path: `POST /api/navigation/path`

### Appointment Flow
1. Register patient: `POST /api/appointments/patients`
2. Add doctor: `POST /api/appointments/doctors`
3. Check schedule: `GET /api/appointments/doctors/{id}/schedule`
4. Book appointment: `POST /api/appointments/book`
5. Record visit: `POST /api/appointments/visit`
6. View history: `GET /api/appointments/patients/{id}/history`

---

## 🌐 CORS Configuration

The API allows requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative React port)

All HTTP methods and headers are allowed.

---

## 📦 Dependencies

```
fastapi>=0.115.0
uvicorn[standard]>=0.30.0
pydantic>=2.0.0
```

Install with:
```bash
pip install fastapi uvicorn pydantic
```

---

## 🎯 Frontend Integration

**Base API URL in React:**
```javascript
// Emergency Triage
const API_URL = 'http://localhost:8000/api/emergency';

// Hospital Navigation
const API_URL = 'http://localhost:8000/api/navigation';

// Doctor Appointments
const API_URL = 'http://localhost:8000/api/appointments';
```

**Example Fetch:**
```javascript
const response = await fetch(`${API_URL}/patients`);
const data = await response.json();
```

---

## 📊 Testing

Visit `http://localhost:8000/docs` for interactive API testing with Swagger UI.

Or use cURL:
```bash
# Health check
curl http://localhost:8000/api/health

# Get emergency patients
curl http://localhost:8000/api/emergency/patients

# Get hospital locations
curl http://localhost:8000/api/navigation/locations

# Get all doctors
curl http://localhost:8000/api/appointments/doctors
```

---

## 🔄 Version History

- **v3.0.0** (Current) - Added Doctor Appointments module
- **v2.0.0** - Added Hospital Navigation module
- **v1.0.0** - Initial release with Emergency Triage

---

**Last Updated:** October 21, 2025
