import os
import sys
import runpy



BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)


def run_script_by_path(path):
    
    try:
        runpy.run_path(path, run_name="__main__")
    except Exception as e:
        print(f"Error running {path}: {e}")


def main_menu():
    while True:
        print("\n" + "="*50)
        print("🏥 Hospital Management - Backup Terminal")
        print("="*50)
        print("1. Hospital Navigation System")
        print("2. Emergency Management System")
        print("3. Inventory Management System")
        print("4. Patient Record / Appointments System")
        print("5. Exit")
        print("="*50)

        choice = input("Enter your choice: ").strip()
        
        if choice == "1":
            # Hospital_Graph_DSA.py is a script with an interactive __main__ block
            path = os.path.join(BASE_DIR, "Hospital_Graph_DSA.py")
            if os.path.exists(path):
                print("\n🗺️  Launching Hospital Navigation System...\n")
                run_script_by_path(path)
            else:
                print("❌ Hospital_Graph_DSA.py not found in backend folder.")

        elif choice == "2":
            # Emergency_Management.py has a main() interactive loop
            path = os.path.join(BASE_DIR, "Emergency_Management.py")
            if os.path.exists(path):
                print("\n🚑 Launching Emergency Management System...\n")
                run_script_by_path(path)
            else:
                print("❌ Emergency_Management.py not found in backend folder.")

        elif choice == "3":
            # Inventory CLI is located at Inventory_Management/main.py
            path = os.path.join(BASE_DIR, "Inventory_Management", "main.py")
            if os.path.exists(path):
                print("\n💊 Launching Inventory Management System...\n")
                run_script_by_path(path)
            else:
                print("❌ Inventory_Management/main.py not found.")

        elif choice == "4":
            # Doctor appointment CLI
            path = os.path.join(BASE_DIR, "Doctor_Appointment&Registry", "DoctorAppointment.py")
            if os.path.exists(path):
                print("\n📅 Launching Patient Record / Appointments System...\n")
                run_script_by_path(path)
            else:
                print("❌ DoctorAppointment.py not found in Doctor_Appointment&Registry folder.")

        elif choice == "5":
            print("\n👋 Exiting backup terminal. Goodbye!")
            break

        else:
            print("❌ Invalid choice. Please enter a number between 1 and 5.")


if __name__ == "__main__":
    try:
        main_menu()
    except KeyboardInterrupt:
        print("\n\n  Interrupted. Exiting.")
        sys.exit(0)