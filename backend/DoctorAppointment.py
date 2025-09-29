
patients = {}
doctors = {}

def add_patient(patient_id, name, age, contact):
    if patient_id not in patients:
        patients[patient_id] = {
            "name": name,
            "age": age,
            "contact": contact,
            "history": []
        }
        print(f"Patient added. Patient ID: {patient_id}")


def add_doctor(doctor_id, name, start_time, end_time):
    if doctor_id not in doctors:
        doctors[doctor_id] = {
            "name": name,
            "slots": {t: None for t in range(start_time, end_time)}
        }


def book_appointment(doctor_id, patient_id):
    if doctor_id not in doctors:
        print("Doctor not found")
        return
    if patient_id not in patients:
        print("Patient not found")
        return 

    doctor = doctors[doctor_id]
    available = [t for t in doctor["slots"] if doctor["slots"][t] is None]

    if not available:
        print( f"No slots available for {doctor['name']}")
        return

    print(f"Available slots for {doctor['name']}: {available}")
    try:
        time = int(input("Enter the time you want to book (hour): "))
    except ValueError:
        print("Invalid input")
        return

    if time not in available:
        print("That slot is not available")
        return
    doctor['slots'][time]=patient_id
    print( f"Appointment booked with {doctor['name']} at {time}:00")
    return

def see_patient(doctor_id,time,medicine):
    doctor=doctors.get(doctor_id)
    if doctor is None:
        print("Doctor not found")
        return
    patient_id=doctor["slots"].get(time)
    if patient_id is None:
        print("Patient not found")
        return
    patients[patient_id]['history'].append({'Doctor': doctor['name'],'Time':time,'Medicine':medicine})

def show_patient_history(patient_id):
    if patient_id not in patients:
        print ("Patient not found")
        return
    for i in patients[patient_id]['history']:
        print(f"Doctor: {i['Doctor']}, Time: {i['Time']}, Medicine: {i['Medicine']}")
    return

def show_doctor_schedule(doctor_id):
    if doctor_id not in doctors:
        print("Doctor not found")
        return
    print(doctors[doctor_id]["slots"])
    return

def show_patient_records():
    if not patients:
        print("No patients found.")
        return
    for k,l in patients.items():
        print(f"Patient ID: {k}, Name: {l['name']}, Age: {l['age']}, Contact: {l['contact']}")

def show_doctor_records():
    if not doctors:
        print("No doctors found.")
        return
    for c,d in doctors.items():
        print(f"Doctor ID: {c}, Name: {d['name']}, Slots: {d['slots']}")

def main():
    n=0
    while n!=9:
        print("""Choose an action:
             1.Book appointment
             2.Add patient
             3.Add doctor
             4.Add doctor visit details
             5.See patient history
             6.View doctor schedule
             7.View patient records
             8.View doctor records
             9.Exit""")

        n=int(input())
        if n==1:
            doc_id=int(input("Enter doctor id:"))
            pat_id=int(input("Enter patient id:"))
            book_appointment(doc_id,pat_id)
        if n==2:
            pat_name=input("Patient's name: ")
            pat_age=int(input("Patient's age: "))
            pat_contact=input("Mobile no: ")
            pat_id=len(patients)+1
            add_patient(pat_id,pat_name,pat_age,pat_contact)
        if n==3:
            doc_name=input("Doctor name: ")
            doc_st=int(input("Time of start of shift: "))
            doc_end=int(input("Time of end of shift: "))
            doc_id=len(doctors)+1
            add_doctor(doc_id,doc_name,doc_st,doc_end)
        if n==4:
            doc_id=int(input("Doctor ID: "))
            timeofvisit=int(input("Time of visit: "))
            medicine=input("Medicines prescribed: ")
            see_patient(doc_id,timeofvisit,medicine)
        if n==5:
            patient_id=int(input("Patient ID: "))
            show_patient_history(patient_id)
        if n==6:
            doc_id=int(input("Doctor ID: "))
            show_doctor_schedule(doc_id)
        if n==7:
            show_patient_records()
        if n==8:
            show_doctor_records()
        if n==9:
            print("Exiting....")
            return