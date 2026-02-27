# 📋 AI Bootcamp — Week 1, Thursday

**Date:** Thursday, 26 February 2026
**Topic:** Python Intermediate Concepts & Introduction to Pandas

**Summary:** This session advanced Python fundamentals with dictionary comprehension, object copying (shallow vs deep), Python naming conventions, import aliasing, and the underscore variable convention. The second half introduced Pandas — the essential data manipulation library — covering Series and DataFrames from creation to core operations.

---

## 🎯 Learning Objectives

- Master **dictionary comprehension** for concise dict construction
- Understand the difference between **shallow copy** and **deep copy**
- Follow **Python naming conventions** (PEP 8) for variables, classes, and constants
- Use the **underscore `_` convention** for unused variables
- Understand **import aliases** and Python's **namespace** system
- Create and manipulate **Pandas Series** — the 1D labeled array
- Build and explore **Pandas DataFrames** — the 2D tabular workhorse

---

## 📝 Detailed Notes

---

## 1. Dictionary Comprehension

Dictionary comprehensions let you build dictionaries in a single, readable expression — just like list comprehensions, but for key-value pairs.

**Syntax:** `{key_expr: value_expr for item in iterable if condition}`

### Basic Example — Squares Mapping

```python
# Traditional way
squares = {}
for x in range(1, 6):
    squares[x] = x ** 2

# Dictionary comprehension (Preferred!)
squares = {x: x**2 for x in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

### With Filtering

```python
# Only even numbers
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
# {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
```

### Transforming Existing Dictionaries

```python
prices = {"apple": 1.20, "banana": 0.50, "cherry": 2.00}

# Apply 10% discount
discounted = {item: round(price * 0.9, 2) for item, price in prices.items()}
# {'apple': 1.08, 'banana': 0.45, 'cherry': 1.8}
```

### Swapping Keys and Values (Revisited)

```python
original = {"name": "Innocito", "age": 4, "city": "Vizag"}
swapped = {v: k for k, v in original.items()}
# {'Innocito': 'name', 4: 'age', 'Vizag': 'city'}
```

> ⚠️ **Common Pitfall:** If multiple keys have the same value, swapping will lose entries — only the last one survives. Always verify values are unique before swapping.

### Building Dicts from Two Lists with `zip()` + Comprehension

```python
keys = ["name", "age", "city"]
values = ["Innocito", 4, "Vizag"]

from_lists = {k: v for k, v in zip(keys, values)}
# {'name': 'Innocito', 'age': 4, 'city': 'Vizag'}
```

> 💡 **Pro Tip:** For the simple case of zipping keys and values, `dict(zip(keys, values))` is even more concise and equally readable. Use the comprehension form when you need to transform keys or values during construction.

> 📌 **Did You Know?** Python also has **set comprehensions** (`{x for x in iterable}`) and **generator expressions** (`(x for x in iterable)`). The syntax family is consistent — just change the brackets.

---

## 2. Shallow Copy vs. Deep Copy

When you assign one variable to another in Python, you don't copy the data — you create another **reference** to the same object. This is critical to understand when working with mutable objects like lists and dictionaries.

### The Problem — Shared References

```python
original = {"name": "Innocito", "skills": ["Python", "AI"]}
alias = original          # Not a copy — same object!

alias["name"] = "Changed"
print(original["name"])   # "Changed" — original is affected!
print(id(original) == id(alias))  # True — same memory address
```

### Shallow Copy — `copy.copy()` or `.copy()`

A **shallow copy** creates a new object, but the elements inside are still references to the same nested objects.

```python
import copy

original = {"name": "Innocito", "skills": ["Python", "AI"]}

# Two equivalent ways to shallow copy
shallow_1 = copy.copy(original)
shallow_2 = original.copy()       # Built-in method

print(id(original) == id(shallow_1))  # False — different top-level object

# Top-level changes are independent
shallow_1["name"] = "Changed"
print(original["name"])               # "Innocito" — unaffected ✅

# BUT nested mutable objects are still shared!
shallow_1["skills"].append("ML")
print(original["skills"])             # ["Python", "AI", "ML"] — affected! ⚠️
```

### Deep Copy — `copy.deepcopy()`

A **deep copy** recursively copies everything — the object and all objects it contains. The clone is completely independent.

```python
import copy

original = {"name": "Innocito", "skills": ["Python", "AI"]}
deep = copy.deepcopy(original)

deep["skills"].append("ML")
print(original["skills"])   # ["Python", "AI"] — completely independent ✅
```

### When to Use Each

| Type | New Object? | Nested Objects | Use Case |
|------|-------------|----------------|----------|
| **Assignment** (`=`) | ❌ Same ref | Shared | When you intentionally want two names for the same object |
| **Shallow Copy** | ✅ New top-level | Shared | Flat dicts/lists, or when you only modify top-level keys |
| **Deep Copy** | ✅ Full clone | Independent | Nested/complex structures where you need total independence |

> ⚠️ **Performance Note:** Deep copy is **more expensive** than shallow copy because it must recursively traverse and duplicate every nested object. Use it only when you genuinely need full independence.

> 💡 **Pro Tip:** You can verify whether two variables point to the same object using `id()`:
> ```python
> print(id(original))  # e.g., 140234567890
> print(id(deep))      # e.g., 140234567999 — different!
> ```

---

## 3. Python Naming Conventions (PEP 8)

Python has strong community conventions for naming, defined in [PEP 8](https://peps.python.org/pep-0008/). Following them makes your code immediately readable to any Python developer.

### Variable & Function Names — `snake_case`

In Python, variables and functions use **lowercase with underscores**:

```python
# ✅ Pythonic (snake_case)
number_start = 10
user_name = "eswar"
total_count = 42

def calculate_average(numbers):
    return sum(numbers) / len(numbers)

# ❌ Not Pythonic (camelCase — this is Java/JavaScript style)
numberStart = 10
userName = "eswar"

def calculateAverage(numbers):
    return sum(numbers) / len(numbers)
```

> 📌 **Did You Know?** Python won't stop you from using camelCase — it will execute just fine. But PEP 8 is the universally accepted style guide, and all major Python projects, libraries, and frameworks follow it. Linters like `flake8` and `pylint` will flag non-PEP 8 names.

### Class Names — `PascalCase`

Classes use **CapitalizedWords** (also called PascalCase or CamelCase):

```python
# ✅ Correct
class NumberStart:
    pass

class DataProcessor:
    pass

# ❌ Incorrect
class number_start:
    pass
```

### Constants — `UPPER_SNAKE_CASE`

Module-level constants use **all uppercase with underscores**:

```python
MAX_RETRY_COUNT = 3
DATABASE_URL = "postgres://localhost/mydb"
PI = 3.14159265
```

### Complete Naming Guide

| Element | Convention | Example |
|---------|-----------|---------|
| Variables | `snake_case` | `user_age`, `total_items` |
| Functions | `snake_case` | `get_user()`, `parse_data()` |
| Classes | `PascalCase` | `UserProfile`, `DataLoader` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_SIZE`, `API_KEY` |
| Modules | `snake_case` | `data_utils.py`, `my_module.py` |
| Packages | `lowercase` | `mypackage`, `utils` |
| Private | `_leading_underscore` | `_internal_method()` |
| Name Mangling | `__double_leading` | `__private_attr` |

---

## 4. The Underscore `_` — Python's Throwaway Variable

The underscore `_` is used by convention when you need to unpack a value but don't intend to use it:

```python
# We only need keys, not values
company = {"name": "Innocito", "age": 25, "city": "Vizag"}
for key, _ in company.items():
    print(f"Key: {key}")

# Ignoring the loop variable entirely
for _ in range(5):
    print("Hello!")   # We don't need the iteration number
```

### Other Uses of `_`

```python
# In the interactive interpreter, _ holds the last expression's result
>>> 2 + 3
5
>>> _
5

# As a visual separator in large numbers (Python 3.6+)
million = 1_000_000

# In tuple unpacking, discard unwanted elements
first, _, third = (1, 2, 3)    # We don't need the second value
_, *rest = [1, 2, 3, 4, 5]     # rest = [2, 3, 4, 5]
```

> 💡 **Best Practice:** Using `_` signals your intent to other developers and supresses "unused variable" warnings from linters. Always use it when you genuinely don't need a value.

---

## 5. Import Aliases & Namespaces

### Import Aliases — `import ... as`

Python lets you create short aliases for modules with long names. This is especially common in the data science ecosystem:

```python
import pandas as pd            # The universal convention
import numpy as np             # Everyone uses "np"
import matplotlib.pyplot as plt
import seaborn as sns

# Now use the alias everywhere
df = pd.DataFrame({"x": [1, 2, 3]})
arr = np.array([1, 2, 3])
```

> ⚠️ **Don't invent your own aliases.** The data science community has strong conventions (`pd`, `np`, `plt`, `sns`). Using non-standard aliases confuses collaborators and makes your code harder to read.

### Selective Imports — `from ... import`

Import specific items directly into your namespace:

```python
from math import pi, sqrt
from copy import deepcopy

# Now use them directly — no prefix needed
area = pi * r**2
clone = deepcopy(original)
```

### Namespace & Workspace Concepts

A **namespace** is a mapping from names to objects. Python uses namespaces to avoid naming conflicts:

```python
# Each module has its own namespace
import math
import cmath   # complex math

math.sqrt(4)    # Real square root → 2.0
cmath.sqrt(-1)  # Complex square root → 1j

# Without namespaces, these would collide!
```

**Key namespaces in Python:**
- **Built-in** — `print()`, `len()`, `range()` — always available
- **Global** — Module-level names
- **Local** — Inside a function
- **Enclosing** — In nested functions (closures)

Python resolves names using the **LEGB rule**: **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in.

> 💡 **Pro Tip:** Avoid `from module import *` — it dumps everything into your namespace and can silently overwrite existing names. Explicit imports are always better.

---

## 6. Pandas — Series

**Pandas** is Python's premier library for data manipulation and analysis. It provides two core data structures: **Series** (1D) and **DataFrame** (2D). If you're doing AI/ML, you'll use Pandas every single day.

```python
import pandas as pd    # Always use 'pd' alias
```

### Creating a Series

A **Series** is a one-dimensional labeled array — think of it as a column in a spreadsheet or a supercharged Python list with an index.

```python
# From a list — automatic integer index
s = pd.Series([10, 20, 30, 40, 50])
# 0    10
# 1    20
# 2    30
# 3    40
# 4    50
# dtype: int64

# From a list with custom index
s = pd.Series([10, 20, 30, 40, 50], index=["a", "b", "c", "d", "e"])
# a    10
# b    20
# c    30
# d    40
# e    50
# dtype: int64

# From a dictionary — keys become the index
from_dict = pd.Series({"x": 100, "y": 200})
# x    100
# y    200
# dtype: int64
```

### Inspecting a Series

```python
s = pd.Series([10, 20, 30, 40, 50], index=["a", "b", "c", "d", "e"])

type(s)              # pandas.core.series.Series
s.dtype              # int64 — the data type of the values
s.shape              # (5,) — returns a tuple
s.size               # 5 — total number of elements
s.index              # Index(['a', 'b', 'c', 'd', 'e'], dtype='object')
s.values             # array([10, 20, 30, 40, 50])
```

### Converting Back to Python Types

```python
s.to_dict()          # {'a': 10, 'b': 20, 'c': 30, 'd': 40, 'e': 50}
s.values.tolist()    # [10, 20, 30, 40, 50]
s.index.to_list()    # ['a', 'b', 'c', 'd', 'e']
```

### Accessing Elements

```python
# By label
s["a"]               # 10
s[["a", "c"]]        # Sub-series with indices 'a' and 'c'

# By position
s[0]                 # 10
s[1:3]               # Series with indices 'b' and 'c'

# Using .loc (label-based) and .iloc (position-based)
s.loc["b"]           # 20
s.iloc[1]            # 20
```

> 💡 **Best Practice:** Always prefer `.loc[]` and `.iloc[]` over raw `[]` indexing. They are explicit about whether you're using labels or positions, which prevents subtle bugs when your index is integer-based.

### Common Series Methods

```python
s = pd.Series([10, 20, 30, 40, 50], index=["a", "b", "c", "d", "e"])

# Descriptive statistics
s.sum()              # 150
s.mean()             # 30.0
s.median()           # 30.0
s.std()              # 15.811...
s.min(), s.max()     # (10, 50)
s.describe()         # Count, mean, std, min, 25%, 50%, 75%, max

# Value counts
s.value_counts()     # Frequency of each unique value

# Vectorized operations (no loops needed!)
s * 2                # Each element doubled
s ** 2               # Each element squared
s > 25               # Boolean Series: [False, False, True, True, True]
```

> 📌 **Did You Know?** Pandas operations are **vectorized** — they operate on entire arrays at once without Python loops. This is powered by NumPy under the hood and is orders of magnitude faster than iterating with `for` loops.

---

## 7. Pandas — DataFrames

A **DataFrame** is a two-dimensional, tabular data structure — essentially a collection of Series sharing the same index. Think of it as a spreadsheet or SQL table in Python. DataFrames are the **central object** in Pandas and the foundation of virtually all data work in Python.

### Creating DataFrames

```python
# From a dictionary of lists/tuples (most common)
df = pd.DataFrame({
    "name": ("Innocito", "K", "T"),
    "age": [25, 30, 35],
    "city": ["Vizag", "Hyd", "Bangalore"]
})
#       name  age       city
# 0  Innocito   25      Vizag
# 1         K   30        Hyd
# 2         T   35  Bangalore

# From a list of dictionaries (useful for API/JSON data)
df = pd.DataFrame([
    {"name": "Innocito", "age": 25, "city": "Vizag", "country": "India"},
    {"name": "K",        "age": 25, "city": "Vizag", "country": "India"},
])
#       name  age   city country
# 0  Innocito   25  Vizag   India
# 1         K   25  Vizag   India

# From a NumPy array with column names
import numpy as np
data = np.array([[1, 2], [3, 4], [5, 6]])
df = pd.DataFrame(data, columns=["x", "y"])
```

> 💡 **Pro Tip:** When creating a DataFrame from a list of dicts, missing keys in any dict become `NaN` in the resulting DataFrame. This is useful for handling incomplete/sparse data.

### Reading Data from Files (Real-World Data Loading)

In practice, you'll rarely construct DataFrames manually — you'll load data from files:

```python
# CSV — the most common format in data science
df = pd.read_csv("data.csv")
df = pd.read_csv("data.csv", index_col=0)              # Use first column as index
df = pd.read_csv("data.csv", usecols=["name", "age"])   # Load only specific columns

# Excel
df = pd.read_excel("data.xlsx", sheet_name="Sheet1")

# JSON (common from APIs)
df = pd.read_json("data.json")

# From clipboard (useful during exploration!)
df = pd.read_clipboard()
```

> 📌 **Did You Know?** `pd.read_csv()` has over 50 parameters! Key ones: `sep` (delimiter), `header` (row number for headers), `na_values` (custom missing value markers), `parse_dates` (auto-parse date columns), `dtype` (enforce column types), `nrows` (read only N rows for quick previews).

### Inspecting DataFrames — Your First Steps with Any Dataset

```python
df.head(5)           # First 5 rows (default) — always start here
df.tail(3)           # Last 3 rows
df.sample(5)         # 5 random rows — great for large datasets
df.shape             # (rows, columns) — e.g., (1000, 12)
df.columns           # Index of column names
df.dtypes            # Data type of each column
df.info()            # THE most useful method — types, non-null counts, memory
df.describe()        # Statistical summary of numeric columns
df.nunique()         # Count of unique values per column
df.isnull().sum()    # Count of missing values per column
```

> 💡 **Best Practice — The 5-Step Data Inspection Routine:**
> 1. `df.shape` — How big is the data?
> 2. `df.head()` — What does it look like?
> 3. `df.info()` — What types, any nulls?
> 4. `df.describe()` — What are the distributions?
> 5. `df.isnull().sum()` — Where are the gaps?

### Accessing Columns

Each column in a DataFrame is a **Series**:

```python
# Dot notation (convenient but limited)
df.name              # Returns the 'name' column as a Series
type(df.name)        # pandas.core.series.Series

# Bracket notation (always works, handles special characters)
df["name"]           # Same result
df[["name", "age"]]  # Multiple columns → returns a DataFrame
```

> ⚠️ **Common Pitfall:** Dot notation (`df.name`) fails for column names with spaces, special characters, or names that clash with DataFrame methods (like `count`, `mean`, `index`, etc.). Always use bracket notation for reliability.

### Selecting Rows — `loc` vs `iloc`

These are the two primary indexers. Understanding the difference is critical:

```python
# .iloc — Integer Location (position-based, like list indexing)
df.iloc[0]           # First row as a Series
df.iloc[0:3]         # First three rows (exclusive end)
df.iloc[0, 2]        # Row 0, Column 2 (single cell)
df.iloc[:, 0:2]      # All rows, first two columns

# .loc — Label-based (uses index labels and column names)
df.loc[0]            # Row with index label 0
df.loc[0:2]          # Rows 0 to 2 INCLUSIVE (unlike iloc!)
df.loc[0, "name"]    # Row 0, column "name"
df.loc[:, "name":"city"]  # All rows, columns from "name" to "city"

# Boolean indexing (most powerful — filtering)
df[df["age"] > 25]                          # Age over 25
df[(df["age"] > 25) & (df["city"] == "Vizag")]  # Multiple conditions
df[df["name"].str.contains("Inn")]          # String matching
```

> ⚠️ **Key Difference:** `.loc` slicing is **inclusive** on both ends (`df.loc[0:2]` includes row 2), while `.iloc` slicing is **exclusive** on the end (`df.iloc[0:2]` stops before row 2). This catches many beginners off guard!

### Adding, Modifying & Removing Columns

```python
# Add a new column
df["experience"] = [5, 10, 15]

# Computed column from existing data
df["senior"] = df["age"] > 28
df["age_group"] = df["age"].apply(lambda x: "Young" if x < 30 else "Senior")

# Rename columns
df.rename(columns={"name": "full_name", "age": "years"}, inplace=True)

# Drop columns
df.drop(columns=["experience"], inplace=True)
# Or: df = df.drop(columns=["experience"])

# Drop rows by index
df.drop(index=[0, 1], inplace=True)

# Reorder columns
df = df[["name", "city", "age"]]   # Explicit column order
```

> 💡 **Pro Tip — `inplace=True` vs Reassignment:**
> `df.drop(columns=["col"], inplace=True)` modifies `df` directly. Without `inplace=True`, it returns a *new* DataFrame. Modern Pandas best practice leans toward **reassignment** (`df = df.drop(...)`) over `inplace` for better readability and method chaining.

### Sorting

```python
# Sort by a single column
df.sort_values("age")                          # Ascending (default)
df.sort_values("age", ascending=False)         # Descending

# Sort by multiple columns
df.sort_values(["city", "age"], ascending=[True, False])

# Sort by index
df.sort_index()

# Reset the index after sorting
df = df.sort_values("age").reset_index(drop=True)
```

### Grouping & Aggregation — `groupby()`

`groupby` is one of Pandas' most powerful features — it splits data into groups, applies a function, and combines results:

```python
# Average age by city
df.groupby("city")["age"].mean()

# Multiple aggregations at once
df.groupby("city")["age"].agg(["mean", "min", "max", "count"])

# Group by multiple columns
df.groupby(["city", "senior"])["age"].mean()

# Named aggregation (Pandas 0.25+)
df.groupby("city").agg(
    avg_age=("age", "mean"),
    total=("name", "count"),
    oldest=("age", "max")
)
```

> 📌 **Did You Know?** The `groupby` pattern is called **Split-Apply-Combine**: split the DataFrame by groups, apply a function to each group, then combine results back. This pattern appears across SQL, R, and every data processing framework.

### Using `apply()` — Custom Transformations

When built-in methods aren't enough, `apply()` lets you run any function across rows or columns:

```python
# Apply a function to each element in a column
df["name_length"] = df["name"].apply(len)
df["name_upper"] = df["name"].apply(str.upper)

# Apply a custom function
def categorize_age(age):
    if age < 25: return "Junior"
    elif age < 35: return "Mid"
    else: return "Senior"

df["category"] = df["age"].apply(categorize_age)

# Apply across rows (axis=1)
df["summary"] = df.apply(lambda row: f"{row['name']} from {row['city']}", axis=1)
```

> ⚠️ **Performance Warning:** `apply()` with `axis=1` runs a Python loop under the hood — it's slow on large datasets. Prefer vectorized operations whenever possible: `df["x"] * 2` is orders of magnitude faster than `df["x"].apply(lambda v: v * 2)`.

### Handling Missing Data — `NaN`

Missing data is inevitable in real-world datasets. Pandas uses `NaN` (Not a Number) to represent missing values:

```python
# Detect missing values
df.isnull()              # Boolean DataFrame
df.isnull().sum()        # Count NaN per column
df.isnull().any()        # Which columns have NaN?

# Remove missing values
df.dropna()              # Drop rows with ANY NaN
df.dropna(subset=["age"])  # Only drop if 'age' is NaN
df.dropna(how="all")     # Only drop if ALL values are NaN

# Fill missing values
df.fillna(0)             # Replace NaN with 0
df["age"].fillna(df["age"].mean())  # Fill with column mean
df.fillna(method="ffill")   # Forward fill (carry previous value)
df.fillna(method="bfill")   # Backward fill
```

### String Methods — `.str` Accessor

Pandas provides vectorized string operations through the `.str` accessor:

```python
df["name"].str.lower()           # Lowercase all names
df["name"].str.upper()           # Uppercase
df["name"].str.len()             # Length of each name
df["name"].str.contains("Inn")   # Boolean: contains substring?
df["name"].str.startswith("I")   # Starts with "I"?
df["name"].str.replace("K", "Kumar")  # Replace substring
df["name"].str.split(",")       # Split into lists
df["city"].str.strip()          # Remove leading/trailing whitespace
```

### Merging DataFrames — `merge()`, `concat()`, `join()`

Combining datasets is a core operation in data work:

```python
# Concatenate (stack) DataFrames vertically
combined = pd.concat([df1, df2], ignore_index=True)

# Concatenate horizontally (side by side)
combined = pd.concat([df1, df2], axis=1)

# Merge (SQL-style joins)
employees = pd.DataFrame({"emp_id": [1, 2, 3], "name": ["A", "B", "C"]})
salaries = pd.DataFrame({"emp_id": [1, 2, 4], "salary": [50000, 60000, 70000]})

# Inner join (only matching rows)
pd.merge(employees, salaries, on="emp_id", how="inner")

# Left join (all from left, matching from right)
pd.merge(employees, salaries, on="emp_id", how="left")

# Right join | Outer join
pd.merge(employees, salaries, on="emp_id", how="right")
pd.merge(employees, salaries, on="emp_id", how="outer")
```

> 💡 **Pro Tip:** The `how` parameter in `merge()` mirrors SQL join types: `inner`, `left`, `right`, `outer`. If you know SQL, you already know Pandas merging!

### Saving Data — Writing to Files

```python
# To CSV
df.to_csv("output.csv", index=False)    # index=False avoids writing row numbers

# To Excel
df.to_excel("output.xlsx", index=False, sheet_name="Report")

# To JSON
df.to_json("output.json", orient="records")

# To clipboard (paste into Excel/Sheets)
df.to_clipboard(index=False)
```

### Real-World DataFrame Workflow Example

Here's a typical data analysis pipeline showing how these pieces fit together:

```python
import pandas as pd

# 1. Load data
df = pd.read_csv("employees.csv")

# 2. Inspect
print(df.shape)
print(df.info())

# 3. Clean
df.dropna(subset=["salary"], inplace=True)
df["department"] = df["department"].str.strip().str.lower()

# 4. Transform
df["annual_bonus"] = df["salary"] * 0.10
df["seniority"] = df["years"].apply(lambda y: "Senior" if y > 5 else "Junior")

# 5. Analyze
summary = df.groupby("department").agg(
    avg_salary=("salary", "mean"),
    total_employees=("name", "count"),
    total_bonus=("annual_bonus", "sum")
).sort_values("avg_salary", ascending=False)

# 6. Export
summary.to_csv("department_summary.csv")
```

> 📌 **Did You Know?** This **Load → Inspect → Clean → Transform → Analyze → Export** pipeline is the standard workflow for 90% of data analysis tasks. Master it and you can tackle most data problems.

---

## ❓ Q&A Highlights

**Q: How do you copy an object — shallow or deep?**
A: Use `.copy()` or `copy.copy()` for a shallow copy. Use `copy.deepcopy()` for a deep copy. Shallow copy creates a new top-level object but shares nested references. Deep copy is a full, independent clone but is more expensive.

**Q: Why does `{}` create a dict and not a set?**
A: Because the `{}` literal was historically for dictionaries. Use `set()` for an empty set. For non-empty sets, `{1, 2, 3}` works fine.

**Q: Can I use camelCase in Python?**
A: It will work — Python doesn't enforce naming — but PEP 8 recommends `snake_case` for variables and functions. CamelCase is reserved for class names (`PascalCase`). Following PEP 8 is a strong community norm.

---

## ✅ Key Takeaways

1. **Dictionary comprehensions** are the concise, Pythonic way to build dicts: `{k: v for k, v in iterable}`
2. Assignments in Python create **references**, not copies — use `copy.copy()` or `copy.deepcopy()` when you need independence
3. **Shallow copy** is sufficient for flat structures; **deep copy** is needed for nested objects
4. Follow **PEP 8 naming**: `snake_case` for variables/functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants
5. Use `_` for **intentionally unused** variables — it signals intent and silences linter warnings
6. Use **standard import aliases** (`pd`, `np`, `plt`) — don't invent your own
7. A **Pandas Series** is a 1D labeled array; a **DataFrame** is a 2D table of Series
8. Prefer `.loc[]` and `.iloc[]` for explicit label/position-based indexing
9. Pandas operations are **vectorized** — avoid `for` loops for element-wise operations

---

## 🔗 Resources & References

- [PEP 8 — Python Style Guide](https://peps.python.org/pep-0008/)
- [Python `copy` Module Docs](https://docs.python.org/3/library/copy.html)
- [Pandas Getting Started](https://pandas.pydata.org/docs/getting_started/index.html)
- [Pandas Series Documentation](https://pandas.pydata.org/docs/reference/api/pandas.Series.html)
- [Pandas DataFrame Documentation](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)
- [10 Minutes to Pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [Google Colab](https://colab.research.google.com/) — The IDE used in this bootcamp
