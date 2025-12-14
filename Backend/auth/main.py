import time
import sys

def print_lyrics():
    lyrics =[
        "wirira wikiyanduriza umutima",
        "ninge uzi ahondimo nkwerekeza kdi sinakuyobya",
        "no mu mwijima nzarasa nkumucyo wizuba",
        "kugirango ugende ahabona, nkumwana w'umwami uganje",
        "unshingikirizaho gusa ",
        "urebe uko nzagusindagiza, nkakugeza muri cyagihungu cya mashimwe",
        "akakaririmbo ndakagutuye mn kdi bonne chance ibiba byose Imana irabizi"

    ]
    delays = [0.7,0.2,0.5,0.5,1.1,0.6,0.6]
    print("ninge ubivuze: \n")
    time.sleep(1.0)

    for i, line in enumerate(lyrics):
        for char in line:
            sys.stdout.write(char)
            sys.stdout.flush()
            time.sleep(0.05)
        print()
    
        time.sleep(delays[i])