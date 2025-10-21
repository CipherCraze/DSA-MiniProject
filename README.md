# Hospital Management System with Data Structures and Algorithms
## Interim Project Report

---

## 1. Introduction

### Brief Background of the Project
This project develops a comprehensive Hospital Management System that integrates multiple healthcare operations including inventory management, doctor appointment scheduling, patient billing, emergency management, and hospital navigation. The system leverages various data structures and algorithms to provide efficient solutions for common hospital administrative challenges.

### Motivation Behind Choosing the Problem
Healthcare systems face numerous operational challenges including:
- Inefficient inventory management leading to medicine shortages or wastage
- Complex appointment scheduling and patient tracking
- Difficulty in hospital navigation for patients and visitors
- Manual billing processes prone to errors
- **Critical emergency triage requiring immediate priority-based patient handling**

These challenges motivated the development of an automated system that can streamline hospital operations while demonstrating practical applications of data structures and algorithms.

### Importance of Data Structures in Solving This Problem
Data structures play a crucial role in this system:
- **Priority Heaps** for emergency patient triage and critical operations
- **Min-Heaps** for finding medicines with nearest expiry dates and lowest stock
- **Max-Heaps** for identifying most frequently demanded medicines
- **Hash Tables/Dictionaries** for fast patient and medicine lookups
- **Graphs** for hospital navigation and shortest path finding
- **JSON structures** for persistent data storage and retrieval

---

## 2. Problem Statement

### Clear Definition of the Problem
The project addresses the need for an integrated hospital management system that can:
1. Manage medicine inventory with expiry tracking
2. Handle patient billing and frequency analysis
3. Schedule and track doctor appointments
4. **Prioritize emergency patients based on medical severity**
5. Provide optimal navigation within hospital premises

### Scope and Boundaries
**Scope:**
- Inventory management with serial number tracking
- Patient billing with purchase history
- Doctor appointment booking system
- **Emergency patient triage with severity-based prioritization**
- Hospital navigation using shortest path algorithms

**Boundaries:**
- Limited to basic CRUD operations
- File-based storage (JSON) rather than database integration
- Command-line interface only
- Single hospital facility
- **Predefined severity classifications for emergency cases**

### Assumptions and Constraints
- Medicine serials are unique within each medicine type
- Doctor availability is based on predefined time slots
- Hospital layout is represented as a static graph
- **Emergency classifications follow standard medical triage protocols**
- All operations are performed by authorized personnel

---

## 3. Objectives

### Goals to be Achieved
1. **Efficiency**: Implement O(log n) operations for critical functions using heaps
2. **Usability**: Provide intuitive menu-driven interfaces for all modules
3. **Data Integrity**: Ensure consistent data management across all operations
4. **Scalability**: Design modular architecture for easy extension
5. ****Critical Care**: Implement life-saving emergency triage system**

### Project Demonstrations
- **Efficiency**: Heap-based priority operations for inventory management and emergency triage
- **Usability**: Comprehensive menu system with error handling
- **Impact**: Real-world applicability in healthcare settings with life-critical operations

---

## 4. Literature Survey

### Existing Solutions
1. **Hospital Information Systems (HIS)**: Large-scale enterprise solutions
2. **Electronic Health Records (EHR)**: Patient data management systems
3. **Pharmacy Management Systems**: Specialized inventory solutions
4. **Indoor Navigation Systems**: RFID and beacon-based solutions
5. ****Emergency Department Information Systems (EDIS)**: Triage and emergency management**

### Comparison of Approaches
| Approach | Advantages | Limitations |
|----------|------------|-------------|
| Enterprise HIS | Comprehensive features | High cost, complex implementation |
| Specialized Systems | Domain expertise | Limited integration capabilities |
| **Emergency Triage Systems** | **Life-saving prioritization** | **Often standalone, not integrated** |
| Custom Solutions | Tailored functionality | Development overhead |

### Research Gaps
- Limited integration between different hospital modules
- Lack of efficient algorithms for real-time operations
- Minimal focus on data structure optimization for healthcare applications
- **Gap in unified systems combining routine and emergency operations**

---

## 5. Relevance / Societal Impact

### Real-World Applications
- **Healthcare Accessibility**: Improved patient experience through efficient systems
- **Resource Optimization**: Better inventory management reduces waste
- **Emergency Response**: Quick navigation and appointment systems save critical time
- ****Life-Saving Triage**: Priority-based emergency care reduces mortality rates**

### Societal Impact
- **Healthcare Quality**: Reduced errors in medication and billing
- **Cost Reduction**: Optimized resource utilization
- **Accessibility**: Simplified navigation for elderly and disabled patients
- ****Emergency Care**: Faster response times for critical patients**
- ****Public Safety**: Systematic approach to medical emergencies**

### Novelty
- Integration of multiple hospital operations in a single system
- Use of advanced data structures for real-time optimization
- **Unified emergency and routine care management**
- Modular design allowing independent module operation

---

## 6. Approach & Methodology

### High-Level Approach
The system follows a modular architecture with **five** main components:
1. **Inventory Management Module**
2. **Billing and Analytics Module**
3. **Doctor Appointment Module**
4. ****Emergency Management Module**
5. **Hospital Navigation Module**

### Data Structures Employed

1. **Priority Heap (Min-Heap)**: For emergency patient triage based on severity
2. **Min-Heap**: For finding medicines with nearest expiry dates and lowest stock
3. **Max-Heap**: For identifying most frequently demanded medicines
4. **Hash Tables**: For fast lookups of patients, doctors, and medicines
5. **Graph**: For hospital layout representation and shortest path finding

### Algorithms Used

#### **Emergency Triage Algorithm**
```
function create_patient(name, age, symptom):
    severity = severity_map.get(symptom.lower(), 4)
    arrival_time = global_counter++
    patient = {name, age, symptom}
    return (severity, arrival_time, patient)

function add_patient(queue, patient_tuple):
    heappush(queue, patient_tuple)
    
function treat_next_patient(queue):
    if queue is not empty:
        return heappop(queue)  // Returns highest priority patient
```

#### Dijkstra's Algorithm (Hospital Navigation)
```
function dijkstra(graph, start, end):
    distances = {node: infinity for all nodes}
    distances[start] = 0
    priority_queue = [(0, start)]
    previous_nodes = {}
    
    while priority_queue is not empty:
        current_distance, current_node = pop minimum from priority_queue
        
        if current_node == end:
            break
            
        for neighbor, weight in graph[current_node]:
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous_nodes[neighbor] = current_node
                push (distance, neighbor) to priority_queue
    
    return reconstruct_path(previous_nodes, start, end)
```

#### Heap Operations (Inventory Management)
```
function get_nearest_expiry():
    min_heap = []
    for each medicine:
        for each serial:
            heappush(min_heap, (expiry_date, medicine, serial))
    return heappop(min_heap)
```

---

## 7. Current Status of Work

### Completed Tasks
✅ **Inventory Management Module**
- Add/remove medicine serials
- Search functionality
- Stock tracking with heap-based analytics

✅ **Billing System**
- Patient billing with FIFO medicine dispensing
- Purchase history tracking
- Frequency analysis using max-heap

✅ **Doctor Appointment System**
- Patient and doctor registration
- Appointment booking with time slot management
- Visit history tracking

✅ **Hospital Navigation**
- Graph-based hospital layout
- Dijkstra's algorithm for shortest path
- Interactive navigation interface

✅ **Emergency Management System**
- **Severity-based patient classification (Critical, Serious, Moderate, Normal)**
- **Priority queue implementation using min-heap**
- **FIFO ordering for same-priority patients**
- **Comprehensive symptom-to-severity mapping**

### Pending Tasks
🔄 **System Integration**
- Cross-module data sharing
- **Integration of emergency system with doctor appointments**
- Unified error handling

🔄 **Testing and Optimization**
- Comprehensive unit testing
- Performance optimization
- Edge case handling
- **Emergency system stress testing**

🔄 **Documentation**
- User manual creation
- Code documentation
- System architecture diagrams

### Challenges Faced
1. **Data Persistence**: Implementing consistent JSON-based storage across modules
2. **Error Handling**: Managing invalid inputs and edge cases
3. **Module Integration**: Ensuring seamless data flow between components
4. ****Emergency Classification**: Balancing comprehensive symptom coverage with system simplicity**

### Preliminary Results
- **Inventory Operations**: O(log n) complexity achieved for priority operations
- **Navigation**: Successfully finds optimal paths in hospital graph
- **Billing**: Accurate frequency tracking and patient history management
- ****Emergency Triage**: Correct prioritization with O(log n) insertion and extraction**

---

## 8. Implementation Details

### Programming Language and Environment
- **Language**: Python 3.x
- **Libraries**: 
  - `heapq` for heap operations
  - `json` for data persistence
  - `datetime` for date handling
  - `os` for file operations
  - `time` for emergency system timing

### Key Functions/Modules

#### **Emergency Management (Emergency_Management.py)**
```python
def create_patient(name, age, symptom):
    # Creates patient tuple with priority classification
    
def add_patient(queue, patient_tuple):
    # Adds patient to priority queue
    
def treat_patient(queue):
    # Treats highest priority patient first
```

#### Inventory Management (`inventory_management.py`)
```python
def add_medicine_serial(name, serial, expiry, price):
    # Adds medicine with serial tracking
    
def get_nearest_expiry():
    # Uses min-heap to find earliest expiry
```

#### Billing System (`billing.py`)
```python
def bill_patient(patient_name, medicine_name):
    # FIFO dispensing with history tracking
    
def get_most_demanded_medicine():
    # Max-heap for frequency analysis
```

#### Hospital Navigation (`Hospital_Graph_DSA.py`)
```python
def dijkstra(graph, start_node, end_node):
    # Shortest path algorithm implementation
```

### **Emergency Severity Classification**
```python
severity_map = {
    # CRITICAL (Priority 1) - Life-threatening
    "heart attack": 1, "stroke": 1, "breathing difficulty": 1,
    "cardiac arrest": 1, "unconscious": 1, "severe bleeding": 1,
    
    # SERIOUS (Priority 2) - Urgent care needed
    "fracture": 2, "high fever": 2, "severe pain": 2,
    
    # MODERATE (Priority 3) - Stable but needs attention
    "food poisoning": 3, "minor injury": 3, "asthma": 3,
    
    # NORMAL (Priority 4) - General OPD
    "headache": 4, "cold": 4, "cough": 4
}
```

### Data Structure Justifications
- **Priority Heaps**: O(log n) operations for emergency triage ensuring fastest care for critical patients
- **Min-Heaps**: O(log n) insert/extract for expiry and stock management
- **Dictionaries**: O(1) average case lookup for patient/medicine records
- **Graphs**: Natural representation for hospital layout and navigation

---

## 9. Conclusion & Future Scope

### Current Progress Summary
The project has successfully implemented all **five** core modules with appropriate data structures and algorithms. The system demonstrates practical applications of priority heaps, min/max heaps, graphs, and hash tables in a real-world healthcare context, **with particular emphasis on life-critical emergency management**.

### Remaining Tasks
- Integration testing across all modules
- **Integration of emergency patients with doctor scheduling**
- Performance benchmarking with large datasets
- User interface improvements
- Error handling enhancement

### Future Improvements
1. **Database Integration**: Replace JSON with SQL database for better scalability
2. **Web Interface**: Develop REST API and web frontend
3. **Real-time Updates**: Implement WebSocket for live inventory and emergency updates
4. **Machine Learning**: Predictive analytics for inventory management and emergency patterns
5. **Mobile Application**: Companion app for patient navigation and emergency alerts
6. ****Advanced Triage**: AI-powered symptom analysis for more accurate severity classification**

### Possible Extensions
- **Multi-hospital Support**: Extend system for hospital networks
- **IoT Integration**: RFID tracking for real-time inventory and patient location
- **Advanced Analytics**: Dashboards and reporting features for emergency response times
- **Security Features**: Role-based access control and audit trails
- ****Emergency Response Integration**: Connection with ambulance services and external emergency systems**
- ****Telemedicine Support**: Remote emergency consultation capabilities**

---

## 10. References

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms*. MIT Press.

2. Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2014). *Data Structures and Algorithms in Python*. John Wiley & Sons.

3. Healthcare Information and Management Systems Society (HIMSS). (2021). "Healthcare IT Standards and Interoperability." Retrieved from https://www.himss.org/

4. **Emergency Nurses Association. (2020). "Triage: Meeting the Challenge of Emergency Department Overcrowding." Journal of Emergency Nursing, 46(3), 285-291.**

5. Dijkstra, E. W. (1959). "A note on two problems in connexion with graphs." *Numerische Mathematik*, 1(1), 269-271.

6. Python Software Foundation. (2021). "Python Documentation - heapq module." Retrieved from https://docs.python.org/3/library/heapq.html

7. **Australasian College for Emergency Medicine. (2019). "Policy on the Australasian Triage Scale." Emergency Medicine Australasia, 31(4), 550-558.**

8. World Health Organization. (2020). "Digital health strategies for strengthening health systems." WHO Press.

9. **Institute of Medicine. (2007). "Hospital-Based Emergency Care: At the Breaking Point." The National Academies Press.**