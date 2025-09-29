import heapq
import json
import os
BASE_DIR=os.path.dirname(os.path.abspath(__file__))
MEDI_F=os.path.join(BASE_DIR, "medicine.json")
PATI_F=os.path.join(BASE_DIR, "patient.json")
#Loading and saving
def load_medicines():
    #Load medicine
    if not os.path.exists(MEDI_F):
        return {}
    with open(MEDI_F,"r") as f:
        return json.load(f)
#Min heap 
def build_stock_min_heap():
    medicines=load_medicines()
    heap=[]
    for name,data in medicines.items():
        stock=data["stock"]
        heapq.heappush(heap,(stock,name))
    return heap

def get_min_stock_medicine():
    heap=build_stock_min_heap()
    if not heap:
        return None
    stock,name=heap[0]  
    return {"name":name,"stock":stock}
#Testing
if __name__=="__main__":
    min_stock_med=get_min_stock_medicine()
    if min_stock_med:
        print(f"Lowest stock:{min_stock_med['name']}(Stock:{min_stock_med['stock']})")
    else:
        print("No medicines in inventory")
