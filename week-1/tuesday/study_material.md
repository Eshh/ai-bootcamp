# 📋 AI Bootcamp — Week 1, Tuesday

**Date:** Tuesday, 25 February 2026
**Topic:** Python Fundamentals — Variables, Operators, Strings, Math & Data Structures

**Summary:** This session laid the foundation of Python programming, covering variable assignment and data types, arithmetic and logical operators, string formatting techniques, the math standard library, core data structures, and Python's magic/special comments. The session was conducted in Google Colab.

---

## 🎯 Learning Objectives

- Understand Python's dynamic typing and variable assignment patterns
- Master arithmetic, comparison, and logical operators
- Learn the three main string formatting techniques in Python
- Use the `math` standard library for mathematical operations
- Understand the four core Python data structures: Lists, Dictionaries, Tuples, and Sets
- Understand **Control Flow** using `for` and `while` loops
- Know what magic comments are and when to use them

---

## 1. Variables & Data Types

### Basic Variable Assignment

Python is **dynamically typed** — you don't declare a type; it's inferred from the assigned value.

```python
text = "Hello"        # str
number = 42           # int
pi = 3.14             # float
is_active = True      # bool
```

> 💡 **Pro Tip:** Use `type()` to inspect any variable's type at runtime: `type(pi)` → `<class 'float'>`

### Core Data Types

| Type | Example | Description |
|------|---------|-------------|
| `int` | `42`, `-7`, `1_000_000` | Whole numbers (arbitrary precision in Python) |
| `float` | `3.14`, `1e-5`, `2.5e10` | Floating-point (IEEE 754 double precision) |
| `str` | `"hello"`, `'world'` | Immutable text sequences |
| `bool` | `True`, `False` | Boolean values (subclass of `int`) |
| `NoneType` | `None` | Represents absence of a value |
| `complex` | `3+4j` | Complex numbers with real and imaginary parts |

### Multiple Assignment (Pythonic Pattern)

Python lets you assign multiple variables in a **single line** using tuple unpacking:

```python
# Assign different values
x, y, z = 10, 20, 30

# Assign the same value to multiple variables
a = b = c = 0

# Swap variables without a temp variable
x, y = y, x
```

> 📌 **Did You Know?** Under the hood, `x, y, z = 10, 20, 30` creates a tuple `(10, 20, 30)` on the right side and unpacks it into the variables on the left. This is called **tuple unpacking** and works with any iterable.

### Numeric Literals & Readability

For large numbers, use **underscores** as visual separators (Python 3.6+):

```python
population = 1_400_000_000    # Much more readable than 1400000000
hex_color = 0xFF_AA_CC        # Works in hex too
```

Scientific notation for very large or very small floats:

```python
speed_of_light = 3e8          # 3 × 10⁸
planck_constant = 6.626e-34   # 6.626 × 10⁻³⁴
```

### Type Checking & Comparisons

```python
type(42)             # <class 'int'>
isinstance(42, int)  # True (preferred — also checks inheritance)
```

### Type Coercion vs. Type Conversion

**Type Coercion** (implicit) — Python automatically converts types in mixed expressions:

```python
result = 5 + 2.0     # int + float → float (result = 7.0)
result = True + 1    # bool + int → int (result = 2, because True == 1)
```

**Type Conversion** (explicit) — You manually cast using constructor functions:

```python
int("42")            # str → int: 42
float("3.14")        # str → float: 3.14
str(100)             # int → str: "100"
bool(0)              # int → bool: False
bool("")             # str → bool: False (empty string is falsy)
list("abc")          # str → list: ['a', 'b', 'c']
```

> ⚠️ **Common Pitfall:** `int("3.14")` raises a `ValueError`. You must do `int(float("3.14"))` to convert a decimal string to an integer.

> 💡 **Going Deeper — Truthy & Falsy Values:**
> Python treats certain values as `False` in boolean context: `0`, `0.0`, `""`, `[]`, `{}`, `()`, `set()`, `None`. Everything else is `True`. This is heavily used in idiomatic Python: `if my_list:` instead of `if len(my_list) > 0:`.

---

## 2. Operators

### Arithmetic Operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `7 + 3` | `10` |
| `-` | Subtraction | `7 - 3` | `4` |
| `*` | Multiplication | `7 * 3` | `21` |
| `/` | Division (float) | `7 / 3` | `2.333...` |
| `//` | Floor Division | `7 // 3` | `2` |
| `%` | Modulo | `7 % 3` | `1` |
| `**` | Exponentiation | `2 ** 10` | `1024` |

> 📌 **Did You Know?** `/` always returns a `float` in Python 3, even for `6 / 2` → `3.0`. Use `//` for integer division. This was a breaking change from Python 2.

> 💡 **Best Practice:** Use `divmod(a, b)` when you need both quotient and remainder: `divmod(7, 3)` → `(2, 1)`.

### Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `5 == 5` → `True` |
| `!=` | Not equal to | `5 != 3` → `True` |
| `>` | Greater than | `5 > 3` → `True` |
| `<` | Less than | `3 < 5` → `True` |
| `>=` | Greater or equal | `5 >= 5` → `True` |
| `<=` | Less or equal | `3 <= 5` → `True` |

**Chained Comparisons** (Pythonic):

```python
# Instead of: x > 0 and x < 100
0 < x < 100           # Reads like math notation!

# Even longer chains work
1 < a < b < 100
```

> ⚠️ **Common Pitfall:** `==` compares **values**, `is` compares **identity** (same object in memory). Never use `is` to compare values — except for `None`: always write `if x is None`.

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `and` | True if both are True | `True and False` → `False` |
| `or` | True if at least one is True | `True or False` → `True` |
| `not` | Inverts the boolean | `not True` → `False` |

**Short-circuit evaluation:**

```python
# 'and' stops at first False, 'or' stops at first True
result = None or "default"     # "default" (common pattern for defaults)
result = "hello" and "world"   # "world" (returns last evaluated value)
```

> 💡 **Going Deeper:** Logical operators don't always return `bool` — they return the actual operand that decided the result. This enables patterns like `name = user_input or "Anonymous"`.

---

## 3. String Formatting

Python offers three ways to format strings. **f-strings are the modern standard.**

### f-Strings (Python 3.6+ — Recommended)

```python
name = "Eswar"
age = 30
print(f"My name is {name} and I am {age} years old.")

# Expressions inside braces
print(f"Next year I'll be {age + 1}")
print(f"Name uppercase: {name.upper()}")

# Formatting numbers
pi = 3.14159
print(f"Pi to 2 decimals: {pi:.2f}")      # 3.14
print(f"Large number: {1000000:,}")         # 1,000,000
print(f"Percentage: {0.856:.1%}")           # 85.6%
```

### `.format()` Method

```python
print("Hello, {}! You are {} years old.".format(name, age))
print("Hello, {0}! {0} is {1} years old.".format(name, age))    # Positional
print("Hello, {n}! Age: {a}".format(n=name, a=age))             # Named
```

### `%` Formatting (Legacy — Avoid in New Code)

```python
print("Hello, %s! You are %d years old." % (name, age))
print("Pi is approximately %.2f" % pi)
```

| Specifier | Type | Example |
|-----------|------|---------|
| `%s` | String | `"Hello, %s" % "world"` |
| `%d` | Integer | `"Age: %d" % 25` |
| `%f` | Float | `"Pi: %.2f" % 3.14` |
| `%x` | Hex | `"Hex: %x" % 255` → `"ff"` |

> 💡 **Best Practice:** Always use **f-strings** for new code. They are the fastest, most readable, and most Pythonic option. The `.format()` method is useful when the template is stored separately (e.g., in a config file). Avoid `%` formatting entirely in modern Python.

---

## 4. The `math` Library

Python's `math` module provides mathematical functions and constants from the C standard library.

```python
import math
```

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `math.pi` | `3.141592653589793` | π (pi) |
| `math.e` | `2.718281828459045` | Euler's number |
| `math.tau` | `6.283185307179586` | τ = 2π |
| `math.inf` | `inf` | Positive infinity |
| `math.nan` | `nan` | Not a Number |

### Common Functions

```python
math.sqrt(16)         # 4.0 — Square root
math.pow(2, 10)       # 1024.0 — Power (returns float)
math.ceil(3.2)        # 4 — Round up
math.floor(3.8)       # 3 — Round down
math.factorial(5)     # 120 — 5!
math.gcd(12, 8)       # 4 — Greatest common divisor
math.log(100, 10)     # 2.0 — Logarithm (base 10)
math.log2(1024)       # 10.0 — Log base 2
math.sin(math.pi/2)   # 1.0 — Trigonometric functions (radians)
math.degrees(math.pi) # 180.0 — Radians to degrees
math.radians(180)     # 3.14159... — Degrees to radians
```

> 📌 **Did You Know?** `math.pi` is a **constant**, not a function — no parentheses needed. Use `math.pi`, not `math.pi()`.

> ⚠️ **Common Pitfall:** `math.pow()` always returns a `float`. For integer exponentiation, use the built-in `**` operator: `2 ** 10` → `1024` (int) vs `math.pow(2, 10)` → `1024.0` (float).

> 💡 **Going Deeper:** For complex math (linear algebra, statistics, random numbers), look beyond `math`:
> - `statistics` — mean, median, stdev
> - `random` — random numbers, shuffling
> - `numpy` — arrays, vectorized math (essential for AI/ML)

---

## 5. Data Structures

Python has four built-in collection types. Choosing the right one is critical for writing efficient code.

### Quick Comparison

| Structure | Ordered | Mutable | Duplicates | Syntax |
|-----------|---------|---------|------------|--------|
| **List** | ✅ | ✅ | ✅ | `[1, 2, 3]` |
| **Tuple** | ✅ | ❌ | ✅ | `(1, 2, 3)` |
| **Dictionary** | ✅ (3.7+) | ✅ | Keys: ❌ | `{"a": 1}` |
| **Set** | ❌ | ✅ | ❌ | `{1, 2, 3}` |

### Lists — Ordered, Mutable Sequences

```python
fruits = ["apple", "banana", "cherry"]

# Access & Slice
fruits[0]            # "apple"
fruits[-1]           # "cherry" (last element)
fruits[1:3]          # ["banana", "cherry"] (slicing)

# Modify
fruits.append("date")         # Add to end
fruits.insert(1, "avocado")   # Insert at index
fruits.remove("banana")       # Remove by value
popped = fruits.pop()         # Remove & return last item

# Useful operations
len(fruits)                   # Length
"apple" in fruits             # Membership check: True
fruits.sort()                 # Sort in-place
sorted(fruits)                # Returns new sorted list
```

> 💡 **Best Practice:** Use **list comprehensions** for creating lists from transformations:
> ```python
> squares = [x**2 for x in range(10)]            # [0, 1, 4, 9, ...]
> evens = [x for x in range(20) if x % 2 == 0]   # [0, 2, 4, 6, ...]
> ```

### Dictionaries — Key-Value Mappings

```python
person = {
    "name": "Eswar",
    "age": 30,
    "skills": ["Python", "AI"]
}

# Access
person["name"]               # "Eswar"
person.get("email", "N/A")   # "N/A" (safe access with default)

# Modify
person["email"] = "eswar@example.com"   # Add/update
del person["age"]                        # Delete key

# Iterate
for key, value in person.items():
    print(f"{key}: {value}")
```

> ⚠️ **Common Pitfall:** Accessing a missing key with `person["missing"]` raises `KeyError`. Always use `.get()` for safe access, or check with `if "key" in dict`.

> 📌 **Did You Know?** Since Python 3.7, dictionaries maintain **insertion order** as a language guarantee (it was an implementation detail in 3.6).

### Tuples — Immutable Sequences

```python
coordinates = (10.5, 20.3)
rgb = (255, 128, 0)

# Access (same as lists)
coordinates[0]       # 10.5

# Cannot modify
# coordinates[0] = 5   ← TypeError!

# Tuple unpacking
x, y = coordinates   # x=10.5, y=20.3

# Single-element tuple (note the comma!)
single = (42,)       # Tuple, NOT just parentheses
not_tuple = (42)     # This is just the integer 42
```

> 💡 **When to use Tuples over Lists:** Use tuples for fixed collections that shouldn't change (coordinates, RGB values, database records). They're slightly faster and can be used as dictionary keys (lists cannot).

### Sets — Unordered, Unique Elements

```python
unique_numbers = {1, 2, 3, 3, 2}    # {1, 2, 3} — duplicates removed

# Add & Remove
unique_numbers.add(4)
unique_numbers.discard(2)    # No error if missing (unlike .remove())

# Set Operations (the real power of sets)
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b       # Union: {1, 2, 3, 4, 5, 6}
a & b       # Intersection: {3, 4}
a - b       # Difference: {1, 2}
a ^ b       # Symmetric Difference: {1, 2, 5, 6}
```

> 💡 **Best Practice:** Use sets for **membership testing** — `x in my_set` is **O(1)** average time vs **O(n)** for lists. If you're checking "is this item in my collection?" frequently, convert to a set first.

> ⚠️ **Common Pitfall:** `{}` creates an **empty dictionary**, not an empty set. Use `set()` for an empty set.

---

## 6. Control Flow & Loops

Python provides two main types of loops for iterative control flow: `for` loops (definite iteration) and `while` loops (indefinite iteration).

### For Loops

The `for` loop in Python iterates over the items of any iterable (like a list, tuple, string, or dictionary) in the order that they appear.

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

**Iterating with `range()`**
The `range()` function generates a sequence of numbers, perfect for executing a loop a specific number of times.

```python
# range(start, stop, step)
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8, 2):    # 2, 4, 6
    print(i)
```

**Iterating with `enumerate()`**
When you need both the index and the value of items in a list, `enumerate()` is the Pythonic way to do it.

```python
fruits = ["apple", "banana"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# 0: apple
# 1: banana
```

> 💡 **Best Practice:** Avoid using `for i in range(len(items)):` to access list elements by index. Always use `for item in items:` or `for i, item in enumerate(items):`.

### While Loops

The `while` loop executes a block of code repeatedly as long as a given condition is `True`.

```python
count = 0
while count < 3:
    print(count)
    count += 1
```

**Loop Control Statements**
- `break`: Exits the loop completely.
- `continue`: Skips the rest of the current iteration and moves to the next one.

```python
while True:  # Infinite loop pattern
    user_input = input("Enter 'q' to quit: ")
    if user_input == 'q':
        break       # Exit the loop entirely
    if user_input == '':
        continue    # Skip the empty input processing
    print(f"You entered: {user_input}")
```

> 📌 **Did You Know?** Python loops have an `else` clause! The `else` block runs **only if** the loop completes naturally (without hitting a `break` statement). This is useful for search loops.

```python
for item in [1, 2, 3]:
    if item == 5:
        print("Found 5!")
        break
else:
    print("5 was not found in the list.")
```

---

## 7. Magic Comments

Magic comments are special comments that affect how Python interprets the source file.

### Encoding Declaration

```python
# -*- coding: utf-8 -*-
```

Tells the Python interpreter what character encoding the source file uses. **In Python 3, UTF-8 is the default**, so this is rarely needed — but you'll see it in legacy codebases or files with special characters.

### Shebang Line

```python
#!/usr/bin/env python3
```

Tells Unix/Linux/macOS which interpreter to use when the script is run directly (`./script.py`). Must be the **very first line** of the file.

### Type Checking Ignore

```python
# type: ignore
```

Tells type checkers (mypy, pyright) to skip checking that line.

### Other Common Special Comments

| Comment | Purpose |
|---------|---------|
| `# noqa` | Tell linters (flake8) to ignore that line |
| `# pragma: no cover` | Exclude line from test coverage reports |
| `# TODO:` | Mark planned work (recognized by IDEs) |
| `# FIXME:` | Mark known bugs (recognized by IDEs) |

> 📌 **Did You Know?** The `# -*- coding: ... -*-` syntax was borrowed from Emacs. In modern Python 3, you almost never need it since UTF-8 is the default encoding.

---

## ✅ Key Takeaways

1. Python is **dynamically typed** — types are inferred, not declared
2. **Multiple assignment** and **tuple unpacking** are Pythonic patterns you should use
3. Use **f-strings** for all string formatting in modern Python
4. `math.pi` is a constant (no parentheses); use `**` over `math.pow()` for integer powers
5. **Lists** are your go-to mutable sequence; **Tuples** for immutable data; **Dicts** for key-value pairs; **Sets** for uniqueness and fast lookups
6. Use **`for` loops** to iterate over collections and **`while` loops** for condition-based iteration. Leverage `enumerate()`.
7. Understand the difference between **type coercion** (implicit) and **type conversion** (explicit)
8. Know your falsy values: `0`, `0.0`, `""`, `[]`, `{}`, `None`, `False`

---

## 🔗 Resources & References

- [Python Official Tutorial](https://docs.python.org/3/tutorial/)
- [Python Data Types — Real Python](https://realpython.com/python-data-types/)
- [f-String Formatting — PEP 498](https://peps.python.org/pep-0498/)
- [Python `math` Module Docs](https://docs.python.org/3/library/math.html)
- [Google Colab](https://colab.research.google.com/) — The IDE used in this bootcamp
