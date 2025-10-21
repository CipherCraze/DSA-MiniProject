
import heapq

"""This is the backup code, incase the main code doesnt work. Terminal based"""

n=int(input("Enter the choice:"))
print("1. Hospital Navigation System")
print("2. Emergency Management System")
print("3. Inventory Management System")
print("4. Patient Record System")


if n==1:
    hospital_graph={}

    def addVertex(graph,vertex):
        if vertex not in graph:
            graph[vertex]=[]

    def addEdge(graph,vertex1,vertex2,distance):
        if vertex1 in graph and vertex2 in graph:
            graph[vertex1].append((vertex2,distance))
            graph[vertex2].append((vertex1,distance))

    def dijkstra(graph,start_node,end_node):
        distances={node: float('inf') for node in graph}
        distances[start_node]=0

        priority_queue=[(0,start_node)]

        previous_nodes={}

        while priority_queue:
            current_distance,current_node=heapq.heappop(priority_queue)
            if current_distance>distances[current_node]:
                continue
                
            if current_node==end_node:
                break
            
            for near, weight in graph.get(current_node,[]):
                distance=current_distance+weight
                
                if distance<distances[near]:
                    distances[near]=distance
                    previous_nodes[near]=current_node
                    heapq.heappush(priority_queue,(distance,near))

        path=[]
        current=end_node

        if distances[current]==float('inf'):
            return None, []
        while current in previous_nodes:
            path.insert(0,current)
            current=previous_nodes[current]

        if path:
            path.insert(0,start_node)
        
        return distances[end_node], path

    if __name__=="__main__":
        locations=["PKG","ME","ER","OPC","RAD","LAB","SUR","IWA","IWB","PHR","CAF"]
        
        """Full form : PKG - Parking Garage, ME - Main Entrance and reception, 
            ER - Emergency Room, OPC - Outpatient Clinic,RAD - Radiology & Imaging center, 
            LAB - Laboratory, SUR - Surgical Center, IWA - Inpatient Ward A, IWB - Inpatient Ward B, 
            PHR - Pharmacy, CAF - Cafeteria"""
        
        for loc in locations:
            addVertex(hospital_graph,loc)

        edges=[("PKG", "ME", 100), ("ME", "OPC", 120), ("ME", "CAF", 50),
            ("ME", "IWA", 150), ("ER", "RAD", 60), ("ER", "SUR", 90),
            ("OPC", "LAB", 70), ("OPC", "PHR", 80), ("RAD", "LAB", 40),
            ("RAD", "IWA", 110), ("RAD", "IWB", 130), ("LAB", "PHR", 50),
            ("IWA", "IWB", 80), ("IWA", "SUR", 100), ("IWB", "SUR", 70),
            ("CAF", "IWA", 140)]
        
        for loc1,loc2,dist in edges:
            addEdge(hospital_graph,loc1,loc2,dist)

        print("Welcome to the Hospital Navigation System")
        print("Available Locations:",", ".join(locations))

        while True:
            start =input("Enter your starting location (or 'exit' to quit): ").strip().upper()
            if start=='EXIT':
                break
            end=input("Enter your destination location: ").strip().upper()

            if start not in locations or end not in locations:
                print("Invalid locations. Please try again.")
                continue
            if start==end:
                print("You are already at your destination.")
                continue

            totaldistance,path=dijkstra(hospital_graph,start,end)
            if totaldistance is not None:
                print(f"📍 Shortest distance: {totaldistance} meters.")
                print(f"🚶 Path: {' -> '.join(path)}")
            else:
                print("No path found between the specified locations.")
        print("Thank you for using the Hospital Navigation System. Stay safe!")
elif n==2:
    pass  # Emergency Management System code would go here
elif n==3:
    pass  # Inventory Management System code would go here
elif n==4:
    pass  # Patient Record System code would go here
elif n==5:
    pass  # Exit