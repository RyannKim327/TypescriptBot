text = "Ixhad"
x = "abcdefghijklmnopqrstuvwxyz"
a = ""
b = 0

for i in text:
    d = i.isupper()
    e = 97
    if d:
        e = 65
    c = (ord(i) - e) + 1
    for j in range(7):
        c -= b
        b -= c
    a += chr((c % 26) + e) + " "

print(a)