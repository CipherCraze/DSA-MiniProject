import json
import os
from datetime import datetime
BASE_DIR=os.path.dirname(os.path.abspath(__file__))
MEDI_F=os.path.join(BASE_DIR, "medicine.json")
PATI_F=os.path.join(BASE_DIR, "patient.json")
#Loading and saving :-)
def load_json(file):
    if not os.path.exists(file):
        return {}
    try:
        with open(file,"r") as f:
            return json.load(f)
    except:
        return {}
def save_json(file, data):
    with open(file,"w") as f:
        json.dump(data,f,indent=4)
#Billing :-()
def bill_patient(patient_name,medicine_name):
    medicines=load_json(MEDI_F)
    patients=load_json(PATI_F)
    if medicine_name not in medicines or medicines[medicine_name]["stock"]==0:
        print(f"{medicine_name} not available")
        return
    serials=medicines[medicine_name]["serials"]
    valid_serial=None
    for serial_num,details in list(serials.items()):
        expiry_date=datetime.strptime(details["expiry"],"%Y-%m-%d")
        if expiry_date<datetime.now():
        
            del serials[serial_num]
        else:
            if (valid_serial is None or 
                expiry_date<datetime.strptime(serials[valid_serial]["expiry"],"%Y-%m-%d")):
                valid_serial=serial_num
    #here a normal for loop is used to find the earliest serial cuz along with finding the minimum,we also have to find the non expired ones and delete the expired ones
    medicines[medicine_name]["stock"]=len(serials)
    save_json(MEDI_F,medicines)

    if valid_serial is None:
        print("No available (non-expired) serials for this medicine.")
        return
    details=serials[valid_serial]
    price=details["price"]
    del medicines[medicine_name]["serials"][serial_num]
    medicines[medicine_name]["stock"]=len(medicines[medicine_name]["serials"])#
    save_json(MEDI_F,medicines)

    if patient_name not in patients:
        patients[patient_name]={"purchases":[],"frequency":{},"total_price":0}

    if "total_price" not in patients[patient_name]:
        patients[patient_name]["total_price"]=0
    patients[patient_name]["purchases"].append({"medicine":medicine_name,"serial":valid_serial,"price": price,"date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
    patients[patient_name]["frequency"][medicine_name]=(patients[patient_name]["frequency"].get(medicine_name, 0) + 1)
    patients[patient_name]["total_price"]+=price

    save_json(PATI_F, patients)
    print(f"Billed {patient_name} for {medicine_name} (Serial {serial_num},Price:{price})")
    print(f"Total price for {patient_name}:{patients[patient_name]['total_price']}")
#Testing :-(
if __name__=="main_":
    bill_patient("Alice","Paracetamol")
    bill_patient("Bob","Amoxicillin")
    bill_patient("Alice","Paracetamol")