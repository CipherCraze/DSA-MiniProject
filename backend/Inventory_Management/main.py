import sys
from inventory_management import add_medicine_serial, remove_medicine_serial, search_medicine, display_medicines
from billing import bill_patient
from frequency_max import get_most_demanded_medicine
from stock_min import get_min_stock_medicine
from expiry_min import get_nearest_expiry

def run_sample_tests():
    print("\nRunning Complex Sample Tests")
    #Add serials
    add_medicine_serial("Paracetamol",1,"2025-07-10",10)
    add_medicine_serial("Paracetamol",2,"2025-12-05",12)
    add_medicine_serial("Paracetamol",3,"2026-01-01",15)
    add_medicine_serial("Amoxicillin",1,"2026-01-15",25)
    add_medicine_serial("Amoxicillin",2,"2025-10-10",20)
    add_medicine_serial("Ibuprofen",1,"2025-11-20",18)
    add_medicine_serial("Ibuprofen",2,"2026-02-28",22)
    add_medicine_serial("Cetirizine",1,"2025-09-30",8)
    display_medicines()
    get_nearest_expiry()
    #Bill
    bill_patient("Alice","Paracetamol")
    bill_patient("Bob","Amoxicillin")
    bill_patient("Alice","Ibuprofen")
    bill_patient("Charlie","Cetirizine")
    bill_patient("Bob","Paracetamol")
    bill_patient("Alice","Paracetamol")
    bill_patient("Charlie","Ibuprofen")
    bill_patient("Bob","Ibuprofen")
    bill_patient("Alice","Amoxicillin")
    display_medicines()
    get_nearest_expiry()
    #Remove serials
    remove_medicine_serial("Paracetamol",3)
    remove_medicine_serial("Ibuprofen",2)
    remove_medicine_serial("Cetirizine",1)
    display_medicines()
    #Search
    search_medicine("Paracetamol")
    search_medicine("Ibuprofen")
    search_medicine("Cetirizine")
    search_medicine("Amoxicillin")
    #Show analytics
    top=get_most_demanded_medicine()
    if top:
        print(f"Most demanded:{top['medicine']}(Demanded {top['frequency']} times)")
    min_stock_med = get_min_stock_medicine()
    if min_stock_med:
        print(f"Lowest stock:{min_stock_med['name']}(Stock:{min_stock_med['stock']})")
    get_nearest_expiry()

def main_menu():
    while True:
        print("\nMain Menu")
        print("0) Run Sample Tests")
        print("1) Add Medicine Serial")
        print("2) Remove Medicine Serial")
        print("3) Search Medicine")
        print("4) Display Inventory")
        print("5) Bill Patient")
        print("6) Most Demanded Medicine")
        print("7) Medicine with Lowest Stock")
        print("8) Medicine with Nearest Expiry")
        print("9) Exit")
        choice=input("Enter choice:")
        if choice=="0":
            run_sample_tests()
        elif choice=="1":
            name=input("Medicine Name:")
            serial=input("Serial Number:")
            expiry=input("Expiry Date (YYYY-MM-DD):")
            price=float(input("Price:"))
            add_medicine_serial(name,serial,expiry,price)
        elif choice=="2":
            name=input("Medicine Name:")
            serial=input("Serial Number:")
            remove_medicine_serial(name,serial)
        elif choice=="3":
            name=input("Medicine Name:")
            search_medicine(name)
        elif choice=="4":
            display_medicines()
        elif choice=="5":
            patient=input("Patient Name:")
            medicine=input("Medicine Name:")
            bill_patient(patient, medicine)
        elif choice=="6":
            top=get_most_demanded_medicine()
            if top:
                print(f"Most demanded:{top['medicine']}(Demanded {top['frequency']} times)")
            else:
                print("No billing records found")
        elif choice=="7":
            min_stock_med=get_min_stock_medicine()
            if min_stock_med:
                print(f"Lowest stock:{min_stock_med['name']}(Stock:{min_stock_med['stock']})")
            else:
                print("No medicines in inventory")
        elif choice=="8":
            get_nearest_expiry()
        elif choice=="9":
            print("Exiting!!!")
            sys.exit(0)
        else:
            print("Invalid choice!!!")
if __name__=="__main__":
    main_menu()
