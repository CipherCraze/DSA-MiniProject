from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import heapq
from typing import List, Optional
import time
from datetime import datetime

app = FastAPI(
    title="Emergency Triage Management API",
    version="1.0.0",
    description="Hospital Emergency Management System with priority-based patient queue"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Severity classification dictionary (from Emergency_Management.py)
severity_map = {
    # CRITICAL (Life-threatening)
    "heart attack": 1,
    "stroke": 1,
    "breathing difficulty": 1,
    "severe accident": 1,
    "cardiac arrest": 1,
    "unconscious": 1,
    "severe bleeding": 1,
    "seizure": 1,
    "anaphylaxis": 1,
    "burns (severe)": 1,

    # SERIOUS (Requires urgent but not immediate life support)
    "fracture": 2,
    "high fever": 2,
    "severe pain": 2,
    "severe infection": 2,
    "chest pain": 2,
    "deep wound": 2,
    "dehydration": 2,
    "burns (moderate)": 2,

    # MODERATE (Needs attention, but stable condition)
    "food poisoning": 3,
    "minor injury": 3,
    "asthma": 3,
    "vomiting": 3,
    "diarrhea": 3,
    "sprain": 3,
    "skin rash": 3,
    "ear pain": 3,
    "burns (mild)": 3,

    # NORMAL (General OPD, not emergency)
    "headache": 4,
    "cold": 4,
    "cough": 4,
    "sore throat": 4,
    "toothache": 4,
    "allergy (mild)": 4,
    "body ache": 4,
    "fatigue": 4,
    "insomnia": 4
}

# Doctor pool
doctors = [
    "Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Davis", 
    "Dr. Miller", "Dr. Anderson", "Dr. Thomas", "Dr. Garcia",
    "Dr. Martinez", "Dr. Rodriguez"
]

# Global queue and counter
patient_queue = []
arrival_counter = [0]
patient_start_times = {}
patient_doctors = {}

# Pydantic models
class PatientInput(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=0, le=150)
    symptom: str = Field(..., min_length=1)

class PatientResponse(BaseModel):
    id: int
    name: str
    age: int
    severity: str
    condition: str
    time: str
    doctor: str
    priority: int
    waitingMinutes: int

class StatsResponse(BaseModel):
    Critical: int
    Serious: int
    Moderate: int
    Normal: int
    total: int

class MessageResponse(BaseModel):
    message: str
    patient: dict

class SymptomCategory(BaseModel):
    name: str
    severity: str
    priority: int

# Helper functions
def get_severity_label(priority: int) -> str:
    labels = {1: "Critical", 2: "Serious", 3: "Moderate", 4: "Normal"}
    return labels.get(priority, "Normal")

def format_time_ago(start_time):
    elapsed = int(time.time() - start_time)
    if elapsed < 60:
        return f"{elapsed} sec ago"
    elif elapsed < 3600:
        minutes = elapsed // 60
        return f"{minutes} min ago"
    else:
        hours = elapsed // 3600
        return f"{hours} hr ago"

def get_waiting_minutes(start_time):
    return int((time.time() - start_time) / 60)

def assign_doctor(priority: int) -> str:
    """Assign doctor based on severity - critical patients get priority doctors"""
    if priority == 1:  # Critical
        return doctors[0]  # Dr. Smith for critical
    elif priority == 2:  # Serious
        index = arrival_counter[0] % 3
        return doctors[1 + index]
    elif priority == 3:  # Moderate
        index = arrival_counter[0] % 3
        return doctors[4 + index]
    else:  # Normal
        index = arrival_counter[0] % 3
        return doctors[7 + index]

def create_patient(name: str, age: int, symptom: str):
    """Create patient tuple following Emergency_Management.py logic"""
    symptom_lower = symptom.lower().strip()
    priority = severity_map.get(symptom_lower, 4)  # Default to Normal if unknown
    arrival = arrival_counter[0]
    arrival_counter[0] += 1
    
    patient = {
        "name": name,
        "age": age,
        "symptom": symptom_lower
    }
    
    # Track arrival time and assign doctor
    patient_start_times[arrival] = time.time()
    patient_doctors[arrival] = assign_doctor(priority)
    
    return (priority, arrival, patient)

# API Endpoints
@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Emergency Triage Management API",
        "version": "1.0.0",
        "status": "active",
        "queue_size": len(patient_queue),
        "docs": "/docs"
    }

@app.get("/api/patients", response_model=List[PatientResponse], tags=["Patients"])
def get_patients():
    """Get all patients in queue sorted by priority (Critical first)"""
    sorted_queue = sorted(patient_queue)
    patients_list = []
    
    for priority, arrival, patient in sorted_queue:
        time_str = format_time_ago(patient_start_times.get(arrival, time.time()))
        waiting_mins = get_waiting_minutes(patient_start_times.get(arrival, time.time()))
        
        patients_list.append(PatientResponse(
            id=arrival,
            name=patient['name'],
            age=patient['age'],
            severity=get_severity_label(priority),
            condition=patient['symptom'].title(),
            time=time_str,
            doctor=patient_doctors.get(arrival, "Unassigned"),
            priority=priority,
            waitingMinutes=waiting_mins
        ))
    
    return patients_list

@app.post("/api/patients", response_model=MessageResponse, status_code=201, tags=["Patients"])
def add_patient(patient_input: PatientInput):
    """Add a new patient to the emergency queue"""
    symptom_lower = patient_input.symptom.lower().strip()
    
    # Validate symptom exists in severity map
    if symptom_lower not in severity_map:
        # Try to find close matches
        available_symptoms = list(severity_map.keys())
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Unknown symptom",
                "symptom": patient_input.symptom,
                "message": "Please select a valid symptom from the list",
                "available_symptoms": available_symptoms
            }
        )
    
    # Create patient using the logic from Emergency_Management.py
    patient_tuple = create_patient(
        patient_input.name,
        patient_input.age,
        symptom_lower
    )
    
    # Add to priority queue
    heapq.heappush(patient_queue, patient_tuple)
    
    priority, arrival, patient = patient_tuple
    severity_label = get_severity_label(priority)
    
    return MessageResponse(
        message=f"Patient '{patient['name']}' registered successfully",
        patient={
            "name": patient['name'],
            "age": patient['age'],
            "severity": severity_label,
            "condition": patient['symptom'].title(),
            "doctor": patient_doctors.get(arrival, "Unassigned"),
            "position": len(patient_queue),
            "queuePosition": sum(1 for p in patient_queue if p[0] <= priority)
        }
    )

@app.post("/api/patients/treat", response_model=MessageResponse, tags=["Patients"])
def treat_next_patient():
    """Treat the next patient (highest priority, earliest arrival)"""
    if not patient_queue:
        raise HTTPException(status_code=400, detail="No patients in queue")
    
    priority, arrival, patient = heapq.heappop(patient_queue)
    severity_label = get_severity_label(priority)
    
    # Calculate waiting time
    wait_time = get_waiting_minutes(patient_start_times.get(arrival, time.time()))
    
    # Clean up tracking
    if arrival in patient_start_times:
        del patient_start_times[arrival]
    if arrival in patient_doctors:
        doctor = patient_doctors[arrival]
        del patient_doctors[arrival]
    else:
        doctor = "Unknown"
    
    return MessageResponse(
        message=f"Patient '{patient['name']}' is being treated",
        patient={
            "name": patient['name'],
            "severity": severity_label,
            "condition": patient['symptom'].title(),
            "doctor": doctor,
            "waitedMinutes": wait_time,
            "remaining": len(patient_queue)
        }
    )

@app.get("/api/stats", response_model=StatsResponse, tags=["Statistics"])
def get_stats():
    """Get patient count by severity level"""
    stats = {'Critical': 0, 'Serious': 0, 'Moderate': 0, 'Normal': 0}
    
    for priority, _, _ in patient_queue:
        severity_label = get_severity_label(priority)
        stats[severity_label] += 1
    
    return StatsResponse(
        Critical=stats['Critical'],
        Serious=stats['Serious'],
        Moderate=stats['Moderate'],
        Normal=stats['Normal'],
        total=len(patient_queue)
    )

@app.get("/api/symptoms", response_model=List[SymptomCategory], tags=["Symptoms"])
def get_symptoms():
    """Get all available symptoms categorized by severity"""
    symptoms_list = []
    
    for symptom, priority in severity_map.items():
        symptoms_list.append(SymptomCategory(
            name=symptom.title(),
            severity=get_severity_label(priority),
            priority=priority
        ))
    
    # Sort by priority then name
    symptoms_list.sort(key=lambda x: (x.priority, x.name))
    return symptoms_list

@app.delete("/api/patients/clear", tags=["Admin"])
def clear_queue():
    """Clear all patients from queue (for testing/reset)"""
    count = len(patient_queue)
    patient_queue.clear()
    patient_start_times.clear()
    patient_doctors.clear()
    arrival_counter[0] = 0
    
    return {
        "message": "Queue cleared successfully",
        "patientsCleared": count
    }

@app.get("/api/health", tags=["Health"])
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "queue_size": len(patient_queue),
        "total_arrivals": arrival_counter[0],
        "active_doctors": len(set(patient_doctors.values()))
    }

@app.get("/api/queue/next", tags=["Queue"])
def peek_next_patient():
    """Peek at the next patient without removing from queue"""
    if not patient_queue:
        return {"message": "No patients in queue", "patient": None}
    
    # Get the patient with highest priority without removing
    sorted_queue = sorted(patient_queue)
    priority, arrival, patient = sorted_queue[0]
    
    return {
        "message": "Next patient to be treated",
        "patient": {
            "name": patient['name'],
            "age": patient['age'],
            "severity": get_severity_label(priority),
            "condition": patient['symptom'].title(),
            "doctor": patient_doctors.get(arrival, "Unassigned"),
            "waiting": format_time_ago(patient_start_times.get(arrival, time.time()))
        }
    }

if __name__ == "__main__":
    import uvicorn
    print("🚑 Starting Emergency Triage Management API...")
    print("📊 Access API docs at: http://localhost:8000/docs")
    print("🔄 Alternative docs at: http://localhost:8000/redoc")
    print("⚡ Server starting on http://0.0.0.0:8000")
    print("Press CTRL+C to quit")
    uvicorn.run("emergency_api:app", host="0.0.0.0", port=8000, reload=True)
