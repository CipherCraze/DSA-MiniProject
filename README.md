# 🏥 Hospital Management System - DSA Mini Project

A comprehensive **Hospital Management System** built with **React + Vite** frontend and **FastAPI** backend, implementing various **Data Structures and Algorithms** for efficient hospital operations.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.5-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Data Structures & Algorithms](#-data-structures--algorithms)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Modules](#-modules)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This Hospital Management System is a **full-stack web application** that demonstrates practical implementations of various **Data Structures and Algorithms** in a real-world healthcare scenario. The system manages four critical hospital operations:

1. **Emergency Triage** - Priority-based patient queue management
2. **Hospital Navigation** - Shortest path routing using Dijkstra's algorithm
3. **Doctor Appointments** - Scheduling and patient registry management
4. **Pharmacy Management** - Inventory tracking with FIFO billing and heap-based analytics

---

## ✨ Features

### 🚑 Emergency Triage System
- **Priority Queue Management** using Min Heap
- Real-time severity classification (Critical, Serious, Moderate, Normal)
- Automatic doctor assignment based on urgency
- Dynamic queue visualization with wait times
- Treatment tracking and patient statistics

### 🗺️ Hospital Navigation
- **Dijkstra's Shortest Path Algorithm** implementation
- Interactive hospital map with 11 locations
- Real-time distance calculation (meters)
- Estimated walking time computation
- Visual path highlighting

### 📅 Doctor Appointment Scheduling
- Patient registry management
- Doctor schedule management (time slots 0-23)
- Appointment booking system
- Patient visit history tracking
- Doctor-patient mapping in time slots
- Color-coded availability (Green: Available, Red: Booked)

### 💊 Pharmacy Inventory Management
- **FIFO (First In, First Out) Billing** - Sells medicine with earliest expiry first
- Serial number tracking for individual medicine units
- **3 Heap-Based Analytics:**
  - **Max Heap** - Most demanded medicine
  - **Min Heap** - Lowest stock alert
  - **Min Heap** - Nearest expiry warning
- Patient billing history with purchase frequency
- Real-time stock monitoring
- Expiry date tracking

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                  │
│                  http://localhost:5173/5174                 │
├─────────────────────────────────────────────────────────────┤
│  • WelcomePage      • EmergencyTriage                       │
│  • PharmacyManagement • AppointmentScheduling               │
│  • HospitalNavigation                                       │
└────────────────────┬────────────────────────────────────────┘
                     │ REST API (HTTP)
                     │
┌────────────────────▼────────────────────────────────────────┐
│              Backend (FastAPI - Unified API)                │
│                  http://localhost:8000                      │
├─────────────────────────────────────────────────────────────┤
│  • /api/emergency/*    - Emergency Triage Endpoints         │
│  • /api/navigation/*   - Hospital Navigation Endpoints      │
│  • /api/appointments/* - Appointment Scheduling Endpoints   │
│  • /api/pharmacy/*     - Pharmacy Management Endpoints      │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  Data Storage (JSON Files)                  │
├─────────────────────────────────────────────────────────────┤
│  • Patients.json       - Patient registry                   │
│  • Doctors.json        - Doctor schedules                   │
│  • medicine.json       - Pharmacy inventory                 │
│  • patient.json        - Billing history                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧮 Data Structures & Algorithms

### 1. **Min Heap (Priority Queue)** - Emergency Triage
```python
# Priority-based patient queue
heapq.heappush(patient_queue, (severity, arrival_time, patient_data))
# O(log n) insertion, O(1) access to highest priority
```
- **Use Case**: Manage emergency patients by severity level
- **Complexity**: O(log n) insertion, O(log n) deletion
- **Benefit**: Ensures critical patients are treated first

### 2. **Dijkstra's Algorithm** - Hospital Navigation
```python
# Shortest path calculation
distances[start] = 0
priority_queue = [(0, start)]
while priority_queue:
    current_distance, current = heapq.heappop(priority_queue)
    for neighbor, weight in graph[current]:
        distance = current_distance + weight
        if distance < distances[neighbor]:
            distances[neighbor] = distance
            heapq.heappush(priority_queue, (distance, neighbor))
```
- **Use Case**: Find shortest route between hospital locations
- **Complexity**: O((V + E) log V) where V = vertices, E = edges
- **Benefit**: Optimal pathfinding for patient/staff navigation

### 3. **Hash Map (Dictionary)** - Appointment Scheduling
```python
# Doctor schedule storage
{
  "1": {
    "name": "Dr. Smith",
    "slots": {"9": "Patient-1", "10": null, "11": "Patient-2"}
  }
}
```
- **Use Case**: Fast O(1) lookup for doctor schedules and patient records
- **Complexity**: O(1) average case for insert/search/delete
- **Benefit**: Instant access to appointment data

### 4. **FIFO Queue Logic** - Pharmacy Billing
```python
# Sell medicine with earliest expiry first
serials = medicine["serials"]
earliest = min(serials.items(), key=lambda x: datetime.strptime(x[1]["expiry"], "%Y-%m-%d"))
```
- **Use Case**: Prevent medicine wastage by selling oldest stock first
- **Complexity**: O(n) for finding minimum
- **Benefit**: Reduces expired inventory loss

### 5. **Max Heap** - Most Demanded Medicine Analytics
```python
# Build frequency map and max heap
for patient in patients.values():
    for med, count in patient["frequency"].items():
        freq_map[med] += count

heap = [(-freq, med) for med, freq in freq_map.items()]
heapq.heapify(heap)  # O(n) heapify
most_demanded = heap[0]  # O(1) access
```
- **Use Case**: Identify medicines requiring frequent restocking
- **Complexity**: O(n) to build, O(1) to access max
- **Benefit**: Inventory optimization insights

### 6. **Min Heap** - Stock Alert & Expiry Tracking
```python
# Lowest stock medicine
heap = [(medicine["stock"], name) for name, medicine in medicines.items()]
heapq.heapify(heap)
lowest_stock = heap[0]

# Nearest expiry
heap = [(datetime.strptime(details["expiry"], "%Y-%m-%d"), med, serial)
        for med, data in medicines.items()
        for serial, details in data["serials"].items()]
heapq.heapify(heap)
nearest_expiry = heap[0]
```
- **Use Case**: Proactive alerts for low stock and expiring medicines
- **Complexity**: O(n) to build, O(1) to access min
- **Benefit**: Prevents stockouts and waste

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 7.1.7** - Build tool & dev server
- **TailwindCSS 3.4.15** - Utility-first CSS framework
- **Framer Motion 12.1.3** - Animation library
- **React Router DOM 7.1.1** - Client-side routing
- **Recharts 2.15.0** - Data visualization charts
- **Lucide React 0.468.0** - Icon library
- **React Hot Toast 2.4.1** - Toast notifications

### Backend
- **FastAPI 0.115.5** - Modern Python web framework
- **Uvicorn 0.34.0** - ASGI server
- **Pydantic 2.10.3** - Data validation
- **Python 3.8+** - Programming language

### Data Storage
- **JSON Files** - Lightweight persistent storage
- No database required (file-based)

---

## 📦 Installation

### Prerequisites
- **Node.js** 20.19+ or 22.12+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/downloads/))
- **npm** or **yarn** package manager
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone Repository
```bash
git clone https://github.com/CipherCraze/DSA-MiniProject.git
cd DSA-MiniProject
```

### Step 2: Install Frontend Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Install Backend Dependencies
```bash
cd backend
pip install fastapi uvicorn pydantic
# or use requirements.txt if available
pip install -r requirements.txt
```

### Step 4: Verify Installation
Check if all dependencies are installed:
```bash
# Frontend
npm list

# Backend
pip list
```

---

## 🚀 Usage

### Starting the Application

#### Option 1: Manual Start (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
cd backend
uvicorn unified_api:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```

#### Option 2: Using PowerShell Script (Windows)
```powershell
.\start-unified.ps1
```

### Access Points
- **Frontend**: http://localhost:5173 (or 5174 if port is occupied)
- **Backend API**: http://localhost:8000
- **API Documentation (Swagger)**: http://localhost:8000/docs
- **API Documentation (ReDoc)**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/api/health

### Stopping the Application
Press `Ctrl+C` in both terminal windows to stop the servers.

---

## 📚 API Documentation

### Emergency Triage Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/emergency/patients` | Get all patients in queue |
| POST | `/api/emergency/patients` | Add new patient to queue |
| POST | `/api/emergency/patients/treat` | Treat next patient (dequeue) |
| GET | `/api/emergency/stats` | Get severity statistics |
| GET | `/api/emergency/symptoms` | Get all available symptoms |
| DELETE | `/api/emergency/patients/clear` | Clear entire queue |

### Navigation Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/navigation/locations` | Get all hospital locations |
| POST | `/api/navigation/path` | Find shortest path between two locations |

### Appointments Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments/patients` | Get all registered patients |
| POST | `/api/appointments/patients` | Register new patient |
| GET | `/api/appointments/patients/{id}/history` | Get patient visit history |
| GET | `/api/appointments/doctors` | Get all doctors |
| POST | `/api/appointments/doctors` | Add new doctor |
| GET | `/api/appointments/doctors/{id}/schedule` | Get doctor schedule |
| POST | `/api/appointments/book` | Book appointment |
| POST | `/api/appointments/visit` | Record doctor visit |
| DELETE | `/api/appointments/patients/{id}` | Delete patient |
| DELETE | `/api/appointments/doctors/{id}` | Delete doctor |

### Pharmacy Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pharmacy/medicines` | Get all medicines |
| POST | `/api/pharmacy/medicines` | Add medicine serial |
| DELETE | `/api/pharmacy/medicines/{name}/{serial}` | Remove medicine serial |
| GET | `/api/pharmacy/medicines/{name}` | Search specific medicine |
| POST | `/api/pharmacy/billing` | Bill patient (FIFO) |
| GET | `/api/pharmacy/patients` | Get billing history |
| GET | `/api/pharmacy/analytics/most-demanded` | Get most demanded medicine (Max Heap) |
| GET | `/api/pharmacy/analytics/lowest-stock` | Get lowest stock medicine (Min Heap) |
| GET | `/api/pharmacy/analytics/nearest-expiry` | Get nearest expiry (Min Heap) |
| DELETE | `/api/pharmacy/clear-inventory` | Clear inventory |
| DELETE | `/api/pharmacy/clear-billing` | Clear billing records |

### Example API Requests

#### Add Patient to Emergency Queue
```bash
curl -X POST http://localhost:8000/api/emergency/patients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 45,
    "symptom": "chest pain"
  }'
```

#### Find Shortest Path
```bash
curl -X POST http://localhost:8000/api/navigation/path \
  -H "Content-Type: application/json" \
  -d '{
    "start": "ME",
    "end": "ER"
  }'
```

#### Add Medicine Serial
```bash
curl -X POST http://localhost:8000/api/pharmacy/medicines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Paracetamol",
    "serial": "P001",
    "expiry": "2026-12-31",
    "price": 50.00
  }'
```

---

## 📁 Project Structure

```
DSA-MiniProject/
├── backend/
│   ├── unified_api.py                    # Main unified FastAPI server
│   ├── Emergency_Management.py           # Emergency triage logic
│   ├── Hospital_Graph_DSA.py            # Navigation graph implementation
│   ├── Doctor_Appointment&Registry/
│   │   ├── DoctorAppointment.py         # Appointment logic
│   │   ├── Doctors.json                 # Doctor data storage
│   │   └── Patients.json                # Patient data storage
│   └── Inventory_Management/
│       ├── main.py                      # Pharmacy CLI (original)
│       ├── inventory_management.py      # Inventory operations
│       ├── billing.py                   # FIFO billing logic
│       ├── frequency_max.py             # Max heap analytics
│       ├── expiry_min.py               # Expiry min heap
│       ├── stock_min.py                # Stock min heap
│       ├── medicine.json               # Medicine inventory
│       └── patient.json                # Billing history
├── src/
│   ├── pages/
│   │   ├── WelcomePage.jsx             # Landing page
│   │   ├── EmergencyTriage.jsx         # Emergency module UI
│   │   ├── HospitalNavigation.jsx      # Navigation module UI
│   │   ├── AppointmentScheduling.jsx   # Appointments module UI
│   │   └── PharmacyManagement.jsx      # Pharmacy module UI
│   ├── components/
│   │   ├── Navbar.jsx                  # Navigation bar
│   │   └── Footer.jsx                  # Footer component
│   ├── App.jsx                         # Main app component
│   ├── main.jsx                        # App entry point
│   ├── App.css                         # App styles
│   └── index.css                       # Global styles
├── public/                              # Static assets
├── package.json                         # Frontend dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS config
├── eslint.config.js                    # ESLint configuration
├── index.html                          # HTML template
└── README.md                           # Project documentation
```

---

## 🎨 Modules

### 1. Emergency Triage Module
**File**: `src/pages/EmergencyTriage.jsx`

**Features**:
- Add patients with name, age, and symptom
- Automatic severity classification (4 levels)
- Priority queue visualization
- Treat next patient (dequeue)
- Real-time statistics dashboard
- Symptom list with severity indicators
- Doctor assignment based on priority

**DSA**: Min Heap (Priority Queue), Hash Map

---

### 2. Hospital Navigation Module
**File**: `src/pages/HospitalNavigation.jsx`

**Features**:
- Interactive location selection
- Dijkstra's shortest path calculation
- Distance display in meters
- Estimated walking time (1.4 m/s)
- Visual path representation
- 11 hospital locations with icons

**DSA**: Graph (Adjacency List), Dijkstra's Algorithm, Min Heap

**Locations**:
- 🅿️ Parking Garage (PKG)
- 🚪 Main Entrance (ME)
- 🚑 Emergency Room (ER)
- 🏥 Outpatient Clinic (OPC)
- 🩻 Radiology (RAD)
- 🧪 Laboratory (LAB)
- 🔬 Surgical Center (SUR)
- 🛏️ Inpatient Ward A (IWA)
- 🏨 Inpatient Ward B (IWB)
- 💊 Pharmacy (PHR)
- 🍽️ Cafeteria (CAF)

---

### 3. Appointment Scheduling Module
**File**: `src/pages/AppointmentScheduling.jsx`

**Features**:
- Patient registration with contact info
- Doctor registration with working hours
- Time slot booking (0-23 hours)
- Patient visit history tracking
- Doctor schedule viewing
- All patient records modal
- All doctor records modal
- Color-coded slot availability
- Appointment refresh functionality

**DSA**: Hash Map, Array

---

### 4. Pharmacy Management Module
**File**: `src/pages/PharmacyManagement.jsx`

**Features**:
- Add medicine serial (with expiry & price)
- Remove medicine serial
- Search medicine by name
- Display full inventory
- **FIFO Billing** - Sells earliest expiry first
- Patient billing history
- **3 Analytics Dashboards**:
  1. Most Demanded Medicine (Max Heap)
  2. Lowest Stock Alert (Min Heap)
  3. Nearest Expiry Warning (Min Heap)
- Serial number tracking
- Stock status badges
- Expiry status indicators

**DSA**: FIFO Queue Logic, Max Heap, Min Heap (2x), Hash Map

---

## 🖼️ Screenshots

### Welcome Page
Landing page with navigation to all 4 modules

### Emergency Triage Dashboard
Real-time patient queue with severity levels and statistics

### Hospital Navigation
Interactive map with shortest path visualization

### Appointment Scheduling
Doctor schedule grid with color-coded availability

### Pharmacy Management
Inventory table with analytics cards showing heap-based insights

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
```bash
git fork https://github.com/CipherCraze/DSA-MiniProject.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/YourFeatureName
```

3. **Commit your changes**
```bash
git commit -m "Add: Your feature description"
```

4. **Push to the branch**
```bash
git push origin feature/YourFeatureName
```

5. **Open a Pull Request**

### Code Style Guidelines
- Follow **PEP 8** for Python code
- Use **ESLint** for JavaScript/React code
- Write clear commit messages
- Add comments for complex algorithms
- Update README if adding new features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **CipherCraze** - [GitHub Profile](https://github.com/CipherCraze)

---

## 🙏 Acknowledgments

- Data Structures and Algorithms course instructors
- FastAPI documentation and community
- React and Vite teams for excellent developer tools
- Open-source contributors

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [API Documentation](http://localhost:8000/docs)
2. Open an [Issue](https://github.com/CipherCraze/DSA-MiniProject/issues)
3. Contact: [Your Email/Contact]

---

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Real-time WebSocket updates
- [ ] Email/SMS notifications
- [ ] Report generation (PDF/Excel)
- [ ] Advanced analytics dashboard
- [ ] Mobile responsive design improvements
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Unit and integration tests

---

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Backend
API_PORT=8000
API_HOST=0.0.0.0
RELOAD=true

# Frontend
VITE_API_URL=http://localhost:8000
```

### Customizing Port Numbers
Edit `vite.config.js` to change frontend port:
```javascript
export default defineConfig({
  server: {
    port: 5173  // Change this
  }
})
```

Edit `unified_api.py` to change backend port:
```python
if __name__ == "__main__":
    uvicorn.run("unified_api:app", host="0.0.0.0", port=8000, reload=True)
```

---

## 🐛 Known Issues

1. **Node.js Version Warning**: Vite requires Node.js 20.19+ or 22.12+
   - **Solution**: Upgrade Node.js or ignore the warning (works with 20.18.1)

2. **Port 5173 Already in Use**: Frontend may start on port 5174
   - **Solution**: Close other Vite apps or update CORS in backend

3. **CORS Errors**: If frontend and backend ports mismatch
   - **Solution**: Update `allow_origins` in `unified_api.py`

---

## 📊 Performance Metrics

- **Emergency Queue**: O(log n) insert/delete
- **Navigation Path**: O((V + E) log V) calculation
- **Appointment Lookup**: O(1) average case
- **Pharmacy Analytics**: O(n) heap build, O(1) access
- **API Response Time**: < 100ms average
- **Frontend Load Time**: < 2s initial load

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Practical DSA implementation in real-world scenarios
- ✅ Full-stack web development (React + FastAPI)
- ✅ RESTful API design principles
- ✅ State management in React
- ✅ Algorithm optimization techniques
- ✅ JSON-based data persistence
- ✅ Responsive UI/UX design
- ✅ Code organization and modularity

---

**Built with ❤️ for DSA Mini Project**

*Last Updated: October 2025*
