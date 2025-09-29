import heapq
import time

# Severity classification dictionary
severity_map = {
    # CRITICAL (Life-threatening)
    "heart attack": 1,
    "stroke": 1,
    "breathing difficulty": 1,
    "severe accident": 1,
    "cardiac arrest": 1,
    "unconscious": 1,
    "severe bleeding": 1,
    "seizure": 1,
    "anaphylaxis": 1,  # severe allergic reaction
    "burns (severe)": 1,

    # SERIOUS (Requires urgent but not immediate life support)
    "fracture": 2,
    "high fever": 2,
    "severe pain": 2,
    "severe infection": 2,
    "chest pain": 2,
    "deep wound": 2,
    "dehydration": 2,
    "burns (moderate)": 2,

    # MODERATE (Needs attention, but stable condition)
    "food poisoning": 3,
    "minor injury": 3,
    "asthma": 3,
    "vomiting": 3,
    "diarrhea": 3,
    "sprain": 3,
    "skin rash": 3,
    "ear pain": 3,
    "burns (mild)": 3,

    # NORMAL (General OPD, not emergency)
    "headache": 4,
    "cold": 4,
    "cough": 4,
    "sore throat": 4,
    "toothache": 4,
    "allergy (mild)": 4,
    "body ache": 4,
    "fatigue": 4,
    "insomnia": 4
}

# Arrival counter to preserve FIFO for same priority
arrival_counter = 0

def create_patient(name, age, symptom):
    global arrival_counter
    symptom_l = symptom.lower()
    priority = severity_map.get(symptom_l, 4)
    arrival = arrival_counter
    arrival_counter += 1
    patient = {"name": name, "age": age, "symptom": symptom_l}
    return (priority, arrival, patient)

def patient_str(priority, patient):
    levels = {1: "CRITICAL", 2: "SERIOUS", 3: "MODERATE", 4: "NORMAL"}
    return f"{patient['name']} (Age {patient['age']}) - {patient['symptom'].title()} [{levels[priority]}]"

def add_patient(queue, patient_tuple):
    heapq.heappush(queue, patient_tuple)
    priority, _, patient = patient_tuple
    print(f"\n✅ Patient '{patient['name']}' classified as {priority} and added to queue.")

def treat_patient(queue):
    if not queue:
        print("\n⚠️ No patients in the queue.")
        return
    priority, _, patient = heapq.heappop(queue)
    print(f"\n🚑 Treating patient: {patient_str(priority, patient)}")

def show_queue(queue):
    if not queue:
        print("\n⚠️ No patients waiting.")
        return
    print("\n🩺 Current Patient Queue:")
    for idx, (priority, _, patient) in enumerate(sorted(queue), 1):
        print(f"  {idx}. {patient_str(priority, patient)}")

# Main program
def main():
    queue = []

    while True:
        print("\n--- Hospital Emergency Management System ---")
        print("1. Register Patient")
        print("2. Show Patient Queue")
        print("3. Treat Next Patient")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            name = input("Enter patient name: ")
            age = input("Enter patient age: ")
            symptom = input("Enter patient symptom: ")

            patient_tuple = create_patient(name, age, symptom)
            add_patient(queue, patient_tuple)

        elif choice == "2":
            show_queue(queue)

        elif choice == "3":
            treat_patient(queue)

        elif choice == "4":
            print("\n👋 Exiting system. Stay safe!")
            break

        else:
            print("\n❌ Invalid choice. Try again.")


if __name__ == "__main__":
    main()
