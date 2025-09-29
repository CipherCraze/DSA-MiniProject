import json
import os
from datetime import datetime
BASE_DIR=os.path.dirname(os.path.abspath(__file__))
MEDI_F=os.path.join(BASE_DIR, "medicine.json")
PATI_F=os.path.join(BASE_DIR, "patient.json")
#Loading and saving
def load_medicines():
    if not os.path.exists(MEDI_F):
        return {}
    with open(MEDI_F,"r") as f:
        return json.load(f)
def save_medicines(data):
    with open(MEDI_F,"w") as f:
        json.dump(data,f,indent=4)
#Inventory
def add_medicine_serial(name,serial,expiry,price):
    #Add a medicine (stock increases by one).
    medicines=load_medicines()
    if name not in medicines:
        medicines[name]={"stock":0,"serials":{}}
    medicines[name]["serials"][str(serial)]={"expiry":expiry,"price":price}
    medicines[name]["stock"]=len(medicines[name]["serials"])
    save_medicines(medicines)
    print(f"Added {name}(Serial {serial},Expiry {expiry},Price {price})")

def remove_medicine_serial(name, serial):
    #remove a medicine (stock decreases by one).
    medicines=load_medicines()
    if name in medicines and str(serial) in medicines[name]["serials"]:
        del medicines[name]["serials"][str(serial)]
        medicines[name]["stock"]=len(medicines[name]["serials"])
        save_medicines(medicines)
        print(f"Removed serial {serial} of {name}")
    else:
        print("Serial not found")

def search_medicine(name):
    #Search a medicne
    medicines=load_medicines()
    if name in medicines:
        print(f"\n{name}(Stock:{medicines[name]['stock']})")
        for serial,details in medicines[name]["serials"].items():
            print(f"Serial: {serial},Expiry: {details['expiry']},Price: {details['price']}")
        return medicines[name]
    else:
        print("Medicine not found")
        return None

def display_medicines():
    #Display
    medicines=load_medicines()
    print("\nInventory:")
    for name,data in medicines.items():
        status="OUT OF STOCK" if data["stock"]==0 else f"Stock:{data['stock']}"
        print(f"\n{name}({status})")
        for serial,details in data["serials"].items():
            print(f"Serial {serial}| Expiry:{details['expiry']}| Price:{details['price']}")
#Testing
if __name__=="__main__":
    add_medicine_serial("Paracetamol",1,"2025-07-10",10)
    add_medicine_serial("Paracetamol",2,"2025-12-05",10)
    add_medicine_serial("Amoxicillin",1,"2026-01-15",25)
    search_medicine("Paracetamol")
    display_medicines()
    remove_medicine_serial("Paracetamol",1)
    display_medicines()
