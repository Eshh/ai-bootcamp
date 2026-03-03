# 📋 AI Bootcamp — Week 2, Tuesday

**Date:** Tuesday, 3 March 2026
**Topic:** NumPy Fundamentals & Advanced Pandas Operations

**Summary:** This session built upon the Pandas foundations from Week 1 by diving into **NumPy** — the numerical computing backbone of Python's data science ecosystem — and then advancing Pandas skills with filtering, querying, column creation, and real-world CSV analysis. The session also reviewed the file metadata exercise from the previous week.

---

## 🎯 Learning Objectives

- Understand **NumPy's role** as the foundation beneath Pandas, scikit-learn, and the entire Python data stack
- Create and manipulate **1D and 2D NumPy arrays** with precise control over shape and data types
- Apply NumPy's **array shape rules** — all rows in a 2D array must have equal length
- Generate **random values** using NumPy's random module
- Perform **advanced Pandas filtering** across multiple columns
- Create **new columns** derived from existing data using conditional logic
- Read and analyze **real-world CSV datasets** using the full Pandas workflow

---

## 📖 Key Concepts & Definitions

| Term | Definition |
|------|-----------|
| **NumPy** | Numerical Python — the foundational library for numerical computing. Provides the `ndarray` (N-dimensional array) object. |
| **ndarray** | NumPy's core data structure — a fixed-size, homogeneous (all elements same type) multidimensional array. |
| **Shape** | A tuple describing the dimensions of an array. E.g., `(3, 4)` means 3 rows × 4 columns. |
| **dtype** | The data type of elements in a NumPy array. All elements share the same dtype (e.g., `int64`, `float64`). |
| **Vectorized Operations** | Operations that act on entire arrays at once, without explicit Python loops — orders of magnitude faster. |
| **Broadcasting** | NumPy's mechanism for performing arithmetic between arrays of different shapes. |
| **Boolean Indexing** | Using a boolean array/Series to filter rows — the core of Pandas filtering. |

---

## 📝 Detailed Notes

---

## 1. NumPy — The Foundation of Scientific Python

NumPy is the **bedrock** of Python's entire data science and machine learning ecosystem. Pandas, scikit-learn, TensorFlow, and PyTorch all build on top of NumPy arrays. Understanding NumPy is essential before going deeper into ML.

```python
import numpy as np    # Always use 'np' alias — this is universal
```

> 📌 **Did You Know?** NumPy arrays are stored in **contiguous blocks of memory** (unlike Python lists, which are arrays of pointers). This is why NumPy operations are 10–100x faster than equivalent Python loops.

### Why NumPy Over Python Lists?

| Feature | Python List | NumPy Array |
|---------|------------|-------------|
| **Type** | Can hold mixed types | Homogeneous (all elements same type) |
| **Speed** | Slow (Python loops) | Fast (C-optimized vectorized ops) |
| **Memory** | More memory (stores type info per element) | Less memory (single dtype for all) |
| **Operations** | No built-in math operations | Full suite of math, linear algebra, stats |
| **Broadcasting** | Not supported | Automatic shape matching |
| **Use Case** | General-purpose | Numerical/scientific computing |

---

## 2. Creating NumPy Arrays

### From Python Lists — 1D Arrays

```python
import numpy as np

# From a list
arr_1d = np.array([1, 2, 3, 4, 5])
print(arr_1d)          # [1 2 3 4 5]
print(type(arr_1d))    # <class 'numpy.ndarray'>
print(arr_1d.dtype)    # int64 (inferred from the data)
print(arr_1d.shape)    # (5,) — 1D array with 5 elements
```

### 2D Arrays — Matrices

A 2D array is created by passing a **list of lists**. Each inner list becomes a row.

```python
# 2D array (matrix)
arr_2d = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
print(arr_2d.shape)    # (2, 3) — 2 rows, 3 columns
print(arr_2d.ndim)     # 2 — number of dimensions
print(arr_2d.size)     # 6 — total number of elements
```

> ⚠️ **Critical Rule — Shape Consistency:** Every row in a 2D array **must have the same number of elements**. If you omit an element (e.g., `[[1, 2, 3], [4, 5]]`), NumPy will **not** create a proper 2D array — the shape will be lost and you'll get an array of Python lists instead. This was explicitly discussed in the session.

```python
# ❌ BAD — Inconsistent row lengths
broken = np.array([[1, 2, 3], [4, 5]])
print(broken.shape)   # (2,) — NOT (2, 3)! Shape is gone.
print(broken.dtype)    # object — NumPy falls back to storing Python objects

# ✅ GOOD — Consistent row lengths
correct = np.array([[1, 2, 3], [4, 5, 6]])
print(correct.shape)   # (2, 3) — proper 2D array
```

> 💡 **Pro Tip:** If you get a `dtype` of `object` on a numeric array, it's almost always because your rows have inconsistent lengths. Check your data!

### 3D Arrays

```python
# 3D array (e.g., batch of images, multiple matrices)
arr_3d = np.array([
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
])
print(arr_3d.shape)    # (2, 2, 2) — 2 matrices of 2×2
print(arr_3d.ndim)     # 3
```

---

## 3. NumPy Data Types (dtype)

NumPy arrays are **homogeneous** — every element has the same type. The `dtype` is inferred from your data, but you can control it explicitly.

```python
# Default dtype inference
int_arr = np.array([1, 2, 3])
print(int_arr.dtype)      # int64 — integers default to int64

float_arr = np.array([1.0, 2.0, 3.0])
print(float_arr.dtype)    # float64 — floats default to float64

# If you mix ints and floats, NumPy "upcasts" to float
mixed = np.array([1, 2, 3.0])
print(mixed.dtype)        # float64 — all values promoted to float
print(mixed)              # [1. 2. 3.] — note the dots!
```

> ⚠️ **Key Insight (from session):** By default, NumPy takes `float64`. If you explicitly provide integers, it will be `int64`. But any single float in the array causes all values to be promoted to `float64`.

### Specifying dtype Explicitly

```python
# Force a specific type
arr = np.array([1, 2, 3], dtype=np.float32)
print(arr.dtype)    # float32

# Common dtypes
np.int32       # 32-bit integer
np.int64       # 64-bit integer (default for ints)
np.float32     # 32-bit float (common in ML for GPU efficiency)
np.float64     # 64-bit float (default for floats)
np.bool_       # Boolean
np.complex128  # Complex numbers
```

> 📌 **Did You Know?** In machine learning, you'll often use `float32` instead of `float64` to save memory and speed up GPU computations. TensorFlow and PyTorch default to `float32`.

---

## 4. Array Creation Functions

NumPy provides specialized functions to create arrays without manually listing values:

```python
# Arrays of zeros
zeros_1d = np.zeros(5)             # [0. 0. 0. 0. 0.] — float64 by default
zeros_2d = np.zeros((3, 4))        # 3×4 matrix of zeros

# Arrays of ones
ones = np.ones((2, 3))             # 2×3 matrix of ones

# Arrays filled with a specific value
filled = np.full((2, 3), 42)       # 2×3 matrix filled with 42

# Identity matrix
eye = np.eye(3)                    # 3×3 identity matrix

# Range of values
range_arr = np.arange(0, 10, 2)    # [0, 2, 4, 6, 8] — like range() but returns array
linspace = np.linspace(0, 1, 5)    # [0. 0.25 0.5 0.75 1.] — 5 evenly spaced values
```

> 💡 **Pro Tip:** `np.zeros()` and `np.ones()` take a **tuple** for the shape, not separate arguments. Use `np.zeros((3, 4))`, not `np.zeros(3, 4)`.

---

## 5. NumPy Random Values

NumPy's random module is essential for generating test data, simulations, and initializing ML model weights.

```python
# Modern approach (NumPy 1.17+): Use the Generator API
rng = np.random.default_rng()

# Generate 5 random floats between 0 and 1
random_floats = rng.random(5)
print(random_floats)    # e.g., [0.374 0.951 0.732 0.598 0.156]

# Random integers
random_ints = rng.integers(low=1, high=100, size=5)
print(random_ints)      # e.g., [42 87 13 56 91]

# Random 2D array
random_matrix = rng.random((3, 4))    # 3×4 matrix of random floats

# Normal distribution (mean=0, std=1)
normal_vals = rng.standard_normal(1000)
```

### Legacy Approach (Still Common in Older Code)

```python
# You'll see this in older tutorials and codebases
np.random.rand(5)           # 5 random floats [0, 1)
np.random.randint(1, 10, 5) # 5 random ints from 1 to 9
np.random.randn(3, 3)       # 3×3 matrix, standard normal
np.random.seed(42)          # Set seed for reproducibility
```

> 💡 **Best Practice:** Use the modern `default_rng()` Generator API for new code. It's faster, has better statistical properties, and supports independent random streams for parallelism. The legacy `np.random.rand()` functions use a global state that can cause subtle bugs.

### Reproducibility with Seeds

```python
# Reproducible results — critical for ML experiments
rng = np.random.default_rng(seed=42)
print(rng.random(3))    # Always: [0.773... 0.438... 0.858...]
```

---

## 6. Essential Array Operations

### Arithmetic Operations (Vectorized)

```python
a = np.array([1, 2, 3, 4, 5])

# Element-wise operations — no loops needed!
a + 10           # [11, 12, 13, 14, 15]
a * 2            # [ 2,  4,  6,  8, 10]
a ** 2           # [ 1,  4,  9, 16, 25]
np.sqrt(a)       # [1.  1.41  1.73  2.  2.24]

# Operations between arrays
b = np.array([10, 20, 30, 40, 50])
a + b            # [11, 22, 33, 44, 55]
a * b            # [10, 40, 90, 160, 250]
```

### Aggregation Functions

```python
arr = np.array([10, 20, 30, 40, 50])

np.sum(arr)       # 150  (or arr.sum())
np.mean(arr)      # 30.0
np.median(arr)    # 30.0
np.std(arr)       # 14.14...
np.min(arr)       # 10
np.max(arr)       # 50
np.argmin(arr)    # 0 — index of minimum
np.argmax(arr)    # 4 — index of maximum
```

### 2D Array Aggregation with Axis

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])

np.sum(matrix)            # 21 — sum of ALL elements
np.sum(matrix, axis=0)    # [5, 7, 9] — sum DOWN columns
np.sum(matrix, axis=1)    # [6, 15] — sum ACROSS rows
```

> 📌 **Did You Know?** `axis=0` means "collapse rows" (operate down each column), and `axis=1` means "collapse columns" (operate across each row). Think of it as: the axis you specify is the one that **disappears**.

### Reshaping Arrays

```python
arr = np.arange(12)       # [0, 1, 2, ..., 11]
matrix = arr.reshape(3, 4)   # 3 rows × 4 columns
matrix = arr.reshape(4, -1)  # -1 means "figure it out" → 4×3

arr.flatten()              # Back to 1D: [0, 1, 2, ..., 11]
arr.ravel()                # Same as flatten but returns a view (more efficient)
```

### Indexing and Slicing

```python
arr = np.array([10, 20, 30, 40, 50])

# Basic indexing (same as Python lists)
arr[0]         # 10
arr[-1]        # 50
arr[1:4]       # [20, 30, 40]

# 2D indexing
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

matrix[0, 2]       # 3 — row 0, column 2
matrix[1, :]       # [4, 5, 6] — entire row 1
matrix[:, 1]       # [2, 5, 8] — entire column 1
matrix[0:2, 1:3]   # [[2, 3], [5, 6]] — submatrix

# Boolean indexing
arr[arr > 25]      # [30, 40, 50] — filter by condition
```

---

## 7. NumPy vs Pandas — When to Use Which

| Scenario | Use NumPy | Use Pandas |
|----------|----------|-----------|
| Pure numerical computation | ✅ | |
| Linear algebra / matrix math | ✅ | |
| ML model inputs/outputs | ✅ | |
| Tabular data with column names | | ✅ |
| Mixed data types (str + int + float) | | ✅ |
| Data cleaning / exploration | | ✅ |
| Reading CSV/Excel files | | ✅ |
| Time series analysis | | ✅ |

> 💡 **Key Insight:** Pandas is built **on top of** NumPy. Every Pandas Series and DataFrame stores its data internally as NumPy arrays. When you access `.values` on a Series, you get the underlying NumPy array.

---

## 8. Advanced Pandas — Filtering & Querying

Building on the Week 1 Pandas introduction, this session covered more advanced data selection techniques using real CSV data.

### Single-Column Filtering

```python
import pandas as pd

df = pd.read_csv("housing_data.csv")

# Basic filter — returns a Boolean Series internally
expensive = df[df["price"] > 500000]

# Filter with string matching
vizag_homes = df[df["city"] == "Vizag"]

# Using .query() for cleaner syntax (like SQL WHERE)
expensive = df.query("price > 500000")
vizag = df.query("city == 'Vizag'")
```

### Multi-Column Filtering

```python
# AND condition: use & (not 'and')
filtered = df[(df["price"] > 300000) & (df["bedrooms"] >= 3)]

# OR condition: use | (not 'or')
filtered = df[(df["city"] == "Vizag") | (df["city"] == "Hyderabad")]

# NOT condition: use ~
not_vizag = df[~(df["city"] == "Vizag")]

# Combine multiple with .query() — more readable
result = df.query("price > 300000 and bedrooms >= 3 and city == 'Vizag'")
```

> ⚠️ **Common Pitfall:** You **must** use `&`, `|`, `~` operators (not Python's `and`, `or`, `not`) in Pandas filtering. You also **must** wrap each condition in parentheses. Forgetting parentheses is one of the most common Pandas errors.

### The `.isin()` Method

```python
# Filter for multiple values in one column
cities = ["Vizag", "Hyderabad", "Bangalore"]
result = df[df["city"].isin(cities)]

# Equivalent to:
result = df[(df["city"] == "Vizag") | (df["city"] == "Hyderabad") | (df["city"] == "Bangalore")]
# But .isin() is much cleaner!
```

### Filtering on All Columns (Session Exercise)

The session emphasized applying filters on **every column** to practice. Here's a systematic approach:

```python
# Numeric columns — use comparison operators
df[df["price"] > 500000]
df[df["sqft"] >= 1500]
df[df["bedrooms"] == 3]

# String columns — use string methods
df[df["location"].str.contains("Beach")]
df[df["type"].str.startswith("Villa")]

# Categorical — use isin()
df[df["facing"].isin(["East", "North"])]
```

---

## 9. Creating New Columns from Existing Data

One of the most common Pandas operations is **deriving new columns** from existing ones. This was a key exercise in the session: create 5 new columns based on existing data.

### Simple Computed Columns

```python
# Math operation on existing columns
df["price_per_sqft"] = df["price"] / df["sqft"]

# String concatenation
df["full_address"] = df["city"] + ", " + df["state"]
```

### Conditional Columns — `np.where()`

```python
import numpy as np

# Binary classification: like an if-else for entire columns
df["is_expensive"] = np.where(df["price"] > 500000, "Expensive", "Affordable")
```

### Multi-Category Columns — `pd.cut()` and `np.select()`

```python
# Bin continuous values into categories
df["size_category"] = pd.cut(
    df["sqft"],
    bins=[0, 800, 1500, 3000, float("inf")],
    labels=["Small", "Medium", "Large", "Mansion"]
)

# Or using np.select() for complex multiple conditions
conditions = [
    df["bedrooms"] == 1,
    df["bedrooms"] == 2,
    df["bedrooms"] == 3,
    df["bedrooms"] >= 4,
]
choices = ["Single", "Double", "Triple", "4+ BHK"]
df["bedroom_type"] = np.select(conditions, choices, default="Unknown")
```

### Using `.apply()` for Complex Logic

```python
# When logic is too complex for vectorized operations
def classify_property(row):
    if row["sqft"] > 2000 and row["bedrooms"] >= 3:
        return "Premium"
    elif row["sqft"] > 1000:
        return "Standard"
    else:
        return "Compact"

df["property_class"] = df.apply(classify_property, axis=1)
```

> ⚠️ **Performance Reminder:** `.apply(axis=1)` is slow because it runs a Python loop row by row. Use vectorized alternatives (`np.where()`, `np.select()`, `pd.cut()`) whenever possible — they are 10–100x faster on large datasets.

### Session Example — Creating 5 New Columns

Based on the housing dataset discussed in class:

```python
# 1. Bedroom type classification
df["bedroom_type"] = np.select(
    [df["bedrooms"] == 1, df["bedrooms"] == 2, df["bedrooms"] == 3, df["bedrooms"] >= 4],
    ["Single", "Double", "Triple", "4+ BHK"],
    default="Unknown"
)

# 2. Size category based on square footage
df["size_category"] = pd.cut(
    df["sqft"],
    bins=[0, 800, 1500, 3000, float("inf")],
    labels=["Small", "Medium", "Large", "Mansion"]
)

# 3. Price per square foot
df["price_per_sqft"] = round(df["price"] / df["sqft"], 2)

# 4. Price tier
df["price_tier"] = pd.cut(
    df["price"],
    bins=[0, 300000, 600000, 1000000, float("inf")],
    labels=["Budget", "Mid-Range", "Premium", "Luxury"]
)

# 5. Facing direction category (East-facing premium flag)
df["is_east_facing"] = df["facing"] == "East"
```

---

## 10. Pandas `describe()` — Statistical Summary

```python
# For numeric columns — gives count, mean, std, min, 25%, 50%, 75%, max
df.describe()

# Include ALL columns (even non-numeric)
df.describe(include="all")

# Specific column
df["price"].describe()

# Percentiles customization
df.describe(percentiles=[.10, .25, .50, .75, .90])
```

> 💡 **Pro Tip:** `describe()` is your best friend for quick sanity checks. Unreasonable min/max values, a large gap between mean and median (skewness), or unexpected counts (indicating missing data) — all visible at a glance.

---

## ❓ Q&A Highlights

**Q: What happens if a value is missing in a 2D NumPy array (e.g., one row has fewer elements)?**
A: NumPy will **not** create a proper 2D array. The shape will be lost — instead of a structured matrix, you'll get an array of Python list objects with `dtype=object`. All rows **must** have the same number of elements for a valid 2D array. This is fundamentally different from Pandas, which can handle missing values with `NaN`.

**Q: What is the default dtype in NumPy?**
A: By default, integers become `int64` and floats become `float64`. If you mix ints and floats in the same array, NumPy upcasts everything to `float64`. This automatic type promotion ensures no data is lost.

**Q: Can we use `np.random.rand()` directly to generate random values?**
A: Yes — `np.random.rand(5)` generates 5 random floats between 0 and 1. However, the modern recommended approach is to use `np.random.default_rng()` which provides a Generator object with better statistical properties and independent streams.

---

## ✅ Key Takeaways

1. **NumPy is the foundation** — Pandas, scikit-learn, and deep learning frameworks all build on NumPy arrays
2. NumPy arrays are **homogeneous** and **fixed-shape** — all elements must be the same type, and all rows must have equal length
3. Default dtypes: `int64` for integers, `float64` for floats. Mixing types causes **upcasting** to the more general type
4. Use the **modern `default_rng()` API** for random number generation — it's faster and safer than the legacy `np.random` functions
5. For Pandas filtering, use **`&`, `|`, `~`** operators (not `and`, `or`, `not`) and **always wrap conditions in parentheses**
6. Create new columns efficiently using **vectorized operations** (`np.where()`, `np.select()`, `pd.cut()`) — avoid `.apply()` when possible
7. The **Split-Apply-Combine** pattern (`groupby`) remains the most powerful tool for data aggregation
8. Always run the **5-Step Data Inspection Routine** when loading new data: `shape` → `head` → `info` → `describe` → `isnull().sum()`

---

## 🔗 Resources & References

- [NumPy Official Documentation](https://numpy.org/doc/stable/)
- [NumPy Quickstart Tutorial](https://numpy.org/doc/stable/user/quickstart.html)
- [NumPy for Absolute Beginners](https://numpy.org/doc/stable/user/absolute_beginners.html)
- [Random Generator API](https://numpy.org/doc/stable/reference/random/generator.html)
- [Pandas Boolean Indexing](https://pandas.pydata.org/docs/user_guide/indexing.html#boolean-indexing)
- [Pandas `cut()` and `qcut()`](https://pandas.pydata.org/docs/reference/api/pandas.cut.html)
- [NumPy vs Pandas Comparison](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_r.html)
