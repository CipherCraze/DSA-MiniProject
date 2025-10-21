from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Tuple
import heapq

app = FastAPI(
    title="Hospital Navigation API",
    version="1.0.0",
    description="Hospital pathfinding system using Dijkstra's algorithm"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize hospital graph
hospital_graph = {}

# Pydantic models
class Location(BaseModel):
    id: str
    name: str
    icon: str
    fullName: str

class PathRequest(BaseModel):
    start: str
    end: str

class PathResponse(BaseModel):
    distance: float
    path: List[str]
    pathNames: List[str]
    valid: bool
    estimatedTime: int

class GraphInfo(BaseModel):
    locations: List[Location]
    totalLocations: int
    totalConnections: int

# Graph building functions
def addVertex(graph, vertex):
    """Add a vertex to the graph"""
    if vertex not in graph:
        graph[vertex] = []

def addEdge(graph, vertex1, vertex2, distance):
    """Add bidirectional edge between two vertices"""
    if vertex1 in graph and vertex2 in graph:
        graph[vertex1].append((vertex2, distance))
        graph[vertex2].append((vertex1, distance))

def dijkstra(graph, start_node, end_node):
    """
    Dijkstra's shortest path algorithm implementation
    Returns: (total_distance, path_list)
    """
    distances = {node: float('inf') for node in graph}
    distances[start_node] = 0
    
    priority_queue = [(0, start_node)]
    previous_nodes = {}
    
    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)
        
        if current_distance > distances[current_node]:
            continue
        
        if current_node == end_node:
            break
        
        for neighbor, weight in graph.get(current_node, []):
            distance = current_distance + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous_nodes[neighbor] = current_node
                heapq.heappush(priority_queue, (distance, neighbor))
    
    # Reconstruct path
    path = []
    current = end_node
    
    if distances[current] == float('inf'):
        return None, []
    
    while current in previous_nodes:
        path.insert(0, current)
        current = previous_nodes[current]
    
    if path:
        path.insert(0, start_node)
    
    return distances[end_node], path

# Location metadata
location_data = {
    "PKG": {"name": "Parking Garage", "icon": "🅿️", "fullName": "Parking Garage"},
    "ME": {"name": "Main Entrance", "icon": "🚪", "fullName": "Main Entrance & Reception"},
    "ER": {"name": "Emergency Room", "icon": "🚑", "fullName": "Emergency Room"},
    "OPC": {"name": "Outpatient Clinic", "icon": "🏥", "fullName": "Outpatient Clinic"},
    "RAD": {"name": "Radiology", "icon": "🩻", "fullName": "Radiology & Imaging Center"},
    "LAB": {"name": "Laboratory", "icon": "🧪", "fullName": "Laboratory"},
    "SUR": {"name": "Surgical Center", "icon": "🔬", "fullName": "Surgical Center"},
    "IWA": {"name": "Inpatient Ward A", "icon": "🛏️", "fullName": "Inpatient Ward A"},
    "IWB": {"name": "Inpatient Ward B", "icon": "🏨", "fullName": "Inpatient Ward B"},
    "PHR": {"name": "Pharmacy", "icon": "💊", "fullName": "Pharmacy"},
    "CAF": {"name": "Cafeteria", "icon": "🍽️", "fullName": "Cafeteria"}
}

# Initialize graph on startup
def initialize_graph():
    """Initialize the hospital graph with all locations and connections"""
    global hospital_graph
    hospital_graph = {}
    
    locations = ["PKG", "ME", "ER", "OPC", "RAD", "LAB", "SUR", "IWA", "IWB", "PHR", "CAF"]
    
    # Add all vertices
    for loc in locations:
        addVertex(hospital_graph, loc)
    
    # Add all edges (bidirectional connections with distances in meters)
    edges = [
        ("PKG", "ME", 100),
        ("ME", "OPC", 120),
        ("ME", "CAF", 50),
        ("ME", "IWA", 150),
        ("ER", "RAD", 60),
        ("ER", "SUR", 90),
        ("OPC", "LAB", 70),
        ("OPC", "PHR", 80),
        ("RAD", "LAB", 40),
        ("RAD", "IWA", 110),
        ("RAD", "IWB", 130),
        ("LAB", "PHR", 50),
        ("IWA", "IWB", 80),
        ("IWA", "SUR", 100),
        ("IWB", "SUR", 70),
        ("CAF", "IWA", 140)
    ]
    
    for loc1, loc2, dist in edges:
        addEdge(hospital_graph, loc1, loc2, dist)

# Initialize graph on module load
initialize_graph()

# API Endpoints
@app.get("/", tags=["Root"])
def root():
    """API root information"""
    return {
        "message": "Hospital Navigation API",
        "version": "1.0.0",
        "status": "active",
        "algorithm": "Dijkstra's Shortest Path",
        "locations": len(hospital_graph),
        "docs": "/docs"
    }

@app.get("/api/locations", response_model=List[Location], tags=["Navigation"])
def get_locations():
    """Get all available hospital locations"""
    locations = []
    for loc_id in hospital_graph.keys():
        data = location_data.get(loc_id, {"name": loc_id, "icon": "📍", "fullName": loc_id})
        locations.append(Location(
            id=loc_id,
            name=data["name"],
            icon=data["icon"],
            fullName=data["fullName"]
        ))
    
    # Sort alphabetically by name
    locations.sort(key=lambda x: x.name)
    return locations

@app.get("/api/graph/info", response_model=GraphInfo, tags=["Navigation"])
def get_graph_info():
    """Get information about the hospital graph structure"""
    locations = []
    total_connections = 0
    
    for loc_id in hospital_graph.keys():
        data = location_data.get(loc_id, {"name": loc_id, "icon": "📍", "fullName": loc_id})
        locations.append(Location(
            id=loc_id,
            name=data["name"],
            icon=data["icon"],
            fullName=data["fullName"]
        ))
        total_connections += len(hospital_graph[loc_id])
    
    # Divide by 2 because edges are bidirectional
    total_connections = total_connections // 2
    
    return GraphInfo(
        locations=locations,
        totalLocations=len(locations),
        totalConnections=total_connections
    )

@app.post("/api/path", response_model=PathResponse, tags=["Navigation"])
def find_shortest_path(request: PathRequest):
    """
    Find the shortest path between two locations using Dijkstra's algorithm
    """
    start = request.start.strip().upper()
    end = request.end.strip().upper()
    
    # Validate locations exist
    if start not in hospital_graph:
        raise HTTPException(
            status_code=400,
            detail=f"Starting location '{start}' not found. Available locations: {', '.join(hospital_graph.keys())}"
        )
    
    if end not in hospital_graph:
        raise HTTPException(
            status_code=400,
            detail=f"Destination '{end}' not found. Available locations: {', '.join(hospital_graph.keys())}"
        )
    
    # Check if start and end are the same
    if start == end:
        return PathResponse(
            distance=0,
            path=[start],
            pathNames=[location_data.get(start, {"name": start})["name"]],
            valid=True,
            estimatedTime=0
        )
    
    # Find shortest path
    total_distance, path = dijkstra(hospital_graph, start, end)
    
    if total_distance is None or not path:
        return PathResponse(
            distance=0,
            path=[],
            pathNames=[],
            valid=False,
            estimatedTime=0
        )
    
    # Convert path IDs to names
    path_names = [location_data.get(loc, {"name": loc})["name"] for loc in path]
    
    # Calculate estimated walking time (average walking speed: 80 meters/minute)
    estimated_time = round(total_distance / 80)
    
    return PathResponse(
        distance=round(total_distance, 2),
        path=path,
        pathNames=path_names,
        valid=True,
        estimatedTime=max(1, estimated_time)  # At least 1 minute
    )

@app.get("/api/connections/{location}", tags=["Navigation"])
def get_connections(location: str):
    """Get all direct connections from a specific location"""
    location = location.strip().upper()
    
    if location not in hospital_graph:
        raise HTTPException(
            status_code=404,
            detail=f"Location '{location}' not found"
        )
    
    connections = []
    for neighbor, distance in hospital_graph[location]:
        neighbor_data = location_data.get(neighbor, {"name": neighbor, "icon": "📍"})
        connections.append({
            "id": neighbor,
            "name": neighbor_data["name"],
            "icon": neighbor_data["icon"],
            "distance": distance
        })
    
    return {
        "location": location,
        "locationName": location_data.get(location, {"name": location})["name"],
        "connections": connections,
        "totalConnections": len(connections)
    }

@app.get("/api/health", tags=["Health"])
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Hospital Navigation API",
        "algorithm": "Dijkstra",
        "graphLoaded": len(hospital_graph) > 0,
        "locations": len(hospital_graph)
    }

if __name__ == "__main__":
    import uvicorn
    print("🗺️ Starting Hospital Navigation API...")
    print("📊 Access API docs at: http://localhost:8001/docs")
    print("🔄 Alternative docs at: http://localhost:8001/redoc")
    print("⚡ Server starting on http://0.0.0.0:8001")
    print("Press CTRL+C to quit")
    uvicorn.run("navigation_api:app", host="0.0.0.0", port=8001, reload=True)
