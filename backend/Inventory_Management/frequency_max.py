import heapq
import json
import os
BASE_DIR=os.path.dirname(os.path.abspath(__file__))
MEDI_F=os.path.join(BASE_DIR, "medicine.json")
PATI_F=os.path.join(BASE_DIR, "patient.json")
def load_patients():
    if not os.path.exists(PATI_F):
        return {}
    try:
        with open(PATI_F,"r") as f:
            return json.load(f)
    except:
        return {}
#Max heap
def build_frequency_max_heap():
    patients=load_patients()
    freq_map={}
    for pdata in patients.values():
        for med,count in pdata.get("frequency",{}).items():
            freq_map[med]=freq_map.get(med, 0)+count
    heap=[]
    for med,count in freq_map.items():
        heapq.heappush(heap,(-count,med))
    return heap
def get_most_demanded_medicine():
    heap=build_frequency_max_heap()
    if not heap:
        return None
    freq,med = heap[0]
    return {"medicine":med, "frequency":-freq}
#Testing
if __name__=="__main__":
    top=get_most_demanded_medicine()
    if top:
        print(f"Most demanded:{top['medicine']}(Demanded {top['frequency']} times)")
    else:
        print("No billing records found")
