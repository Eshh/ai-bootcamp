# Variables & Data Types
text = "Hello"
number = 42
pi = 3.14
is_active = True

# Multiple Assignment
x, y, z = 10, 20, 30
a = b = c = 0
x, y = y, x

# Type Conversion
int_val = int("42")
float_val = float("3.14")
str_val = str(100)
bool_val = bool(0)

# Operators
add = 7 + 3
sub = 7 - 3
mul = 7 * 3
div = 7 / 3
floor_div = 7 // 3
mod = 7 % 3
exp = 2 ** 10

is_equal = (5 == 5)
is_not_equal = (5 != 3)
chained = (0 < x < 100)

short_circuit_and = "hello" and "world"
short_circuit_or = None or "default"

# String Formatting
name = "Eswar"
age = 28
print(f"My name is {name} and I am {age} years old.")
print(f"Pi to 2 decimals: {pi:.2f}")

# Math Library
import math
sqrt_val = math.sqrt(16)
ceil_val = math.ceil(3.2)
floor_val = math.floor(3.8)
gcd_val = math.gcd(12, 8)

# Lists
fruits = ["apple", "banana", "cherry"]
print(fruits[0])
print(fruits[-1])
print(fruits[1:3])

fruits.append("date")
fruits.insert(1, "avocado")
fruits.extend(["elderberry", "fig"])
fruits.remove("banana")
popped = fruits.pop()
idx = fruits.index("apple")
cnt = fruits.count("cherry")
fruits.sort()
fruits.reverse()
fruits_copy = fruits.copy()
fruits.clear()

# List Comprehension (Important!)
# Syntax: [expression for item in iterable if condition]
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
upper_fruits = [fruit.upper() for fruit in fruits_copy]

# Dictionaries
person = {
    "name": "Eswar",
    "age": 28,
    "skills": ["Python", "AI"]
}
print(person["name"])
print(person.get("email", "N/A"))

person["email"] = "eswar@example.com"
del person["age"]

for key, value in person.items():
    print(f"{key}: {value}")

keys = person.keys()
values = person.values()
person.update({"location": "Earth"})
person.pop("email")
person.clear()

# Tuples
coords = (10.5, 20.3)
cx, cy = coords
single = (42,)

# Sets
nums = {1, 2, 3, 3, 2}
nums.add(4)
nums.discard(2)
nums.remove(3)
nums.pop()
nums.clear()
e = dict() # this is a dictionary
f = set() # this is a set
g = {} # this is also a dictionary

a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)
print(a & b)
print(a - b)
print(a ^ b)

# For Loops
for fruit in fruits_copy:
    print(fruit)

for i in range(5):
    print(i)

for i in range(2, 8, 2):
    print(i)

for index, fruit in enumerate(fruits_copy):
    print(f"{index}: {fruit}")

# While Loops
count = 0
while count < 3:
    print(count)
    count += 1
