export interface DayInfo {
    day: string;
    slug: string;
    title: string;
    subtitle: string;
    topics: string[];
    contentPath: string;
    /** Concise narration summary for voice playback (no examples, key concepts + critical gotchas). */
    summary?: string;
}

export interface WeekInfo {
    week: number;
    slug: string;
    title: string;
    description: string;
    days: DayInfo[];
}

export const curriculum: WeekInfo[] = [
    {
        week: 1,
        slug: "week-1",
        title: "Python Foundations",
        description: "Core Python concepts, data structures, control flow, and introduction to Pandas",
        days: [
            {
                day: "Tuesday",
                slug: "tuesday",
                title: "Python Fundamentals",
                subtitle: "Variables, Types, Strings, Math, Data Structures & Loops",
                topics: [
                    "Variables & Dynamic Typing",
                    "Strings & f-Strings",
                    "Math Module",
                    "Lists, Tuples, Dicts, Sets",
                    "List Comprehensions",
                    "For & While Loops",
                ],
                contentPath: "/content/week-1/tuesday/study_material.html",
                summary: `This session covered Python fundamentals. Python is dynamically typed — types are inferred from values, not declared. You can assign multiple variables at once using tuple unpacking, and swap variables without a temporary variable.

Python has three string formatting methods: f-strings, dot-format, and percent formatting. Always use f-strings in modern Python — they're the fastest and most readable.

The math module provides constants like pi and e, and functions like sqrt, ceil, floor, and factorial. Important: math.pi is a constant, not a function — no parentheses. Use the double-star operator instead of math.pow for integer powers, since math.pow always returns a float.

Python has four core data structures. Lists are ordered and mutable. Tuples are ordered and immutable — use them for fixed data like coordinates. Dictionaries store key-value pairs — keys must be hashable, so lists cannot be keys. Sets are unordered with unique elements — membership testing is O(1), much faster than lists. Critical: empty curly braces create a dictionary, not a set — use set() for an empty set.

List comprehensions provide a concise way to create lists and are faster than traditional for loops. For loops iterate over iterables — use enumerate instead of range(len()) for index access. While loops run until a condition is false. Python loops have an else clause that runs only if no break was hit.

Finally, magic comments like the shebang line and encoding declaration affect how Python interprets source files, though they're rarely needed in modern Python 3.`,
            },
            {
                day: "Thursday",
                slug: "thursday",
                title: "Python Intermediate & Pandas",
                subtitle: "Dictionary Comprehension, Copying, Naming Conventions, Pandas",
                topics: [
                    "Dictionary Comprehension",
                    "Shallow vs. Deep Copy",
                    "PEP 8 Naming Conventions",
                    "Import Aliases & Namespaces",
                    "Pandas Series",
                    "Pandas DataFrames",
                ],
                contentPath: "/content/week-1/thursday/study_material.html",
                summary: `This session covered intermediate Python and introduced Pandas. Dictionary comprehensions let you build dictionaries in a single expression, similar to list comprehensions but for key-value pairs. You can filter, transform, and even swap keys and values — but be careful: swapping only works cleanly when all values are unique and hashable.

Object copying is critical in Python. Assignment with equals creates a reference, not a copy — both variables point to the same object. Shallow copy creates a new top-level object but nested objects are still shared. Deep copy from the copy module creates a fully independent clone. Use deep copy when working with nested structures where you need total independence, but note it's more expensive.

PEP 8 naming conventions: use snake_case for variables and functions, PascalCase for classes, and UPPER_SNAKE_CASE for constants. The underscore is used as a throwaway variable for values you don't need.

For imports, always use standard aliases: pd for pandas, np for numpy, plt for matplotlib. Avoid star imports. Python resolves names using the LEGB rule: Local, Enclosing, Global, Built-in.

Pandas Series is a one-dimensional labeled array — like a supercharged list with an index. Pandas DataFrame is a two-dimensional table — the central object for data work. Critical: always prefer dot-loc and dot-iloc over raw bracket indexing. Loc uses labels and is inclusive on both ends. Iloc uses positions and is exclusive on the end — this difference catches many beginners. Pandas operations are vectorized — avoid Python for loops for element-wise operations. The standard data workflow is Load, Inspect, Clean, Transform, Analyze, Export.`,
            },
        ],
    },
    {
        week: 2,
        slug: "week-2",
        title: "NumPy & Advanced Pandas",
        description: "NumPy arrays, data types, random generation, advanced Pandas filtering, column creation, and real-world CSV analysis",
        days: [
            {
                day: "Tuesday",
                slug: "tuesday",
                title: "NumPy Fundamentals & Advanced Pandas",
                subtitle: "Arrays, Data Types, Random Generation, Filtering, Column Creation",
                topics: [
                    "NumPy Arrays (1D, 2D, 3D)",
                    "Data Types & Upcasting",
                    "Array Creation Functions",
                    "Random Value Generation",
                    "Vectorized Operations & Aggregation",
                    "Advanced Pandas Filtering",
                    "Creating New Columns",
                ],
                contentPath: "/content/week-2/tuesday/study_material.html",
                summary: `This session introduced NumPy — the numerical computing backbone of Python's data science ecosystem. NumPy provides the ndarray, a fixed-size homogeneous multidimensional array stored in contiguous memory, making it 10 to 100 times faster than Python lists for numerical work. Pandas, scikit-learn, TensorFlow, and PyTorch all build on top of NumPy.

NumPy arrays are homogeneous — every element must be the same type. The default dtype is int64 for integers and float64 for floats. Critical gotcha: if you mix even one float into an integer array, NumPy upcasts everything to float64. Another critical rule: every row in a 2D array must have the same length. If rows are inconsistent, the shape is lost and NumPy falls back to dtype object — a common source of silent bugs.

For random number generation, use the modern default_rng Generator API instead of the legacy np.random functions. It's faster, has better statistical properties, and supports independent streams. Always set a seed for reproducibility in ML experiments.

On the Pandas side, this session covered advanced filtering. You must use ampersand, pipe, and tilde operators — not Python's and, or, not — and always wrap conditions in parentheses. The isin method is much cleaner than chaining multiple OR conditions. For creating new columns, prefer vectorized operations like np.where for binary conditions, np.select for multiple conditions, and pd.cut for binning continuous values. Avoid apply with axis equals one whenever possible — it runs a slow Python loop under the hood.`,
            },
        ],
    },
];
