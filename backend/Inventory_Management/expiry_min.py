import heapq
import json
import os
from datetime import datetime
BASE_DIR=os.path.dirname(os.path.abspath(__file__))
MEDI_F=os.path.join(BASE_DIR, "medicine.json")
PATI_F=os.path.join(BASE_DIR, "patient.json")
def load_medicines():
    try:
        with open(MEDI_F,"r") as f:
            return json.load(f)
    except:
        return {}
def build_expiry_min_heap():
    medicines=load_medicines()
    min_heap=[]
    for medicine_name,data in medicines.items():
        for serial,details in data["serials"].items(): 
            expiry_date=datetime.strptime(details["expiry"], "%Y-%m-%d")
            heapq.heappush(min_heap,(expiry_date, medicine_name, serial))
    return min_heap
def get_nearest_expiry():
    min_heap=build_expiry_min_heap()
    if not min_heap:
        print("No medicines available.")
        return
    expiry_date,medicine_name,serial=heapq.heappop(min_heap)
    print(f"Nearest Expiry:{medicine_name} (Serial {serial}),Expiry on {expiry_date.date()}")

if __name__=="__main__":
    get_nearest_expiry()
