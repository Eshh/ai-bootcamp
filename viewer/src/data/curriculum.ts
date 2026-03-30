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
            {
                day: "Thursday",
                slug: "thursday",
                title: "Introduction to Data Science & Machine Learning",
                subtitle: "ML Workflow, Supervised vs Unsupervised vs Reinforcement Learning",
                topics: [
                    "Data Science vs AI/ML",
                    "Rule-Based vs Machine Learning",
                    "Supervised Learning (Classification & Regression)",
                    "Unsupervised Learning (Clustering & Association)",
                    "The Machine Learning Workflow",
                ],
                contentPath: "/content/week-2/thursday/study_material.html",
                summary: `This session introduced Data Science and Machine Learning, covering the full AI ecosystem hierarchy: AI contains Machine Learning, which contains Deep Learning. Data Science sits at the intersection of Statistics, Programming, and Domain Expertise. Predictive Analytics is the practical application at the ML and DS intersection.

Data falls into three types: Structured data fits neatly into rows and columns — spreadsheets, SQL, CSV. Unstructured data has no fixed schema — text, images, audio. About 80 percent of enterprise data is unstructured, which is why Deep Learning and NLP are so valuable. Semi-structured data like JSON and XML sits in between.

The core paradigm shift: in rule-based systems, humans manually write rules — this is limited by human capacity and carries human bias. In machine learning, the machine automatically learns rules from data and expected outputs.

Machine Learning has three types. Supervised learning uses labeled data with a known target — Regression for continuous targets like house prices, Classification for categorical targets like spam detection. Critical gotcha: Logistic Regression is a classification algorithm despite its name. Unsupervised learning works with unlabeled data to find hidden structure — Clustering groups similar data, Association Rules find co-occurrence patterns like Netflix recommendations, Dimensionality Reduction compresses features. Reinforcement learning learns through trial and error with reward and penalty feedback loops — used in robotics and game AI.

The ML Workflow is iterative: Business Understanding, Data Collection, Exploratory Data Analysis, Data Preparation, Modelling, Evaluation, Deployment, and Monitoring. Data preparation takes 60 to 80 percent of total effort. Model drift is a critical production concern — models decay as real-world distributions change and must be monitored and retrained. Never evaluate a model on training data — always split into separate train and test sets.`,
            },
        ],
    },
    {
        week: 3,
        slug: "week-3",
        title: "Linear Regression Foundations",
        description: "Linear regression basics, OLS intuition, simple linear regression, regression metrics (R², SSR, MAE), and polynomial regression",
        days: [
            {
                day: "Tuesday",
                slug: "tuesday",
                title: "Linear Regression Fundamentals",
                subtitle: "OLS, Simple Linear Regression, R², Residuals, Boston Housing",
                topics: [
                    "What Linear Regression Predicts",
                    "Slope, Intercept, and the Linear Equation",
                    "Ordinary Least Squares (OLS)",
                    "Boston Housing Dataset",
                    "EDA Before Modelling",
                    "Train-Test Split",
                    "Simple Linear Regression",
                    "R² and Residual Plots",
                ],
                contentPath: "/content/week-3/tuesday/study_material.html",
                summary: `This session introduced linear regression as the baseline supervised learning algorithm for predicting continuous values such as house price, sales, or temperature. The key idea is simple: fit a line that links one or more input features to a numeric target. In simple linear regression, that line is written as intercept plus slope times the feature. The slope shows how much the prediction changes for a one-unit increase in the feature, and the intercept is the predicted value when the feature is zero.

The session connected this intuition to Ordinary Least Squares, or OLS, which chooses the best-fit line by minimizing squared residuals. Residuals are the differences between actual and predicted values. We also reviewed why exploratory data analysis comes before modelling: distributions, scatter plots, and correlation heatmaps reveal skew, outliers, non-linearity, and multicollinearity. The Boston Housing dataset was used as the working example, especially the relationship between lstat and medv.

Students also saw why train-test split matters for honest evaluation. R squared was introduced as the proportion of variance explained by the model, but the important gotcha is that R squared alone is not enough. Residual plots matter because visible patterns often mean a straight-line model is too simple. The homework focused on scatter plots for strongly correlated feature pairs and reviewing only up to simple linear regression.`,
            },
            {
                day: "Thursday",
                slug: "thursday",
                title: "Regression Metrics & Polynomial Regression",
                subtitle: "SST, SSR, SSE, R², Adjusted R², MAE, RMSE — from scratch and with sklearn",
                topics: [
                    "SST, SSR, SSE Decomposition",
                    "R² — Coefficient of Determination",
                    "Adjusted R²",
                    "MAE — Mean Absolute Error",
                    "MSE and RMSE",
                    "Polynomial Regression with PolynomialFeatures",
                    "Comparing Metrics Across Polynomial Degrees",
                    "Overfitting and the Bias-Variance Tradeoff",
                ],
                contentPath: "/content/week-3/thursday/study_material.html",
                summary: `This session went deep into regression evaluation metrics — the tools used to measure how well a model actually fits the data. The foundation is the variance decomposition identity: SST equals SSR plus SSE. SST is the total variance in the target and is fixed by the data. SSR is the variance the model explains. SSE is the variance the model misses — and this is exactly what Ordinary Least Squares minimizes.

R squared equals SSR divided by SST, meaning it measures the fraction of total variance the model explains. A critical gotcha: R squared always increases or stays the same when you add more features or raise the polynomial degree, even for useless noise variables. This is why Adjusted R squared exists — it penalizes for adding features that don't genuinely improve the model.

Mean Absolute Error, or MAE, is the most interpretable metric: it is in the same units as the target and robust to outliers. RMSE penalizes large errors more heavily because squaring amplifies them. When RMSE is much larger than MAE, large outlier errors are pulling the score up.

Polynomial regression extends linear regression by transforming features into higher-degree versions before fitting. The model is still linear in its coefficients. Higher degree means a more flexible curve and lower training error, but also higher risk of overfitting to training data. The instructor's rule of thumb: default to degree one unless residual plots clearly show a non-linear pattern. Always evaluate on test data, not just training metrics.`,
            },
        ],
    },
    {
        week: 4,
        slug: "week-4",
        title: "Model Evaluation & Tuning",
        description: "Evaluating model generalizability, feature selection, and choosing between Linear and Polynomial Regression.",
        days: [
            {
                day: "Tuesday",
                slug: "tuesday",
                title: "Model Complexity & Data Representation",
                subtitle: "Polynomial complexity, Representative Data, and the role of Test Data",
                topics: [
                    "Model Complexity vs Model Performance",
                    "The importance of Representative Data",
                    "Evaluating deviation with Test Data",
                    "Scatter plots for correlated features"
                ],
                contentPath: "/content/week-4/tuesday/study_material.html",
                summary: `This session critically examined the relationship between model complexity and data. The instructor emphasized that we should default to simple models — specifically, degree 1 Linear Regression — even if a higher-degree polynomial yields a slightly better R-squared score on the training data. Complex models are highly prone to overfitting.

A crucial concept introduced was "Representative Data". Having a massive volume of data doesn't help if that data doesn't represent the real world. Using the analogy of a cat-and-dog classifier failing when it encounters a tiger in production, the instructor explained that your training set must contain examples of the diverse scenarios your model will eventually face.

Finally, the session reinforced that the test dataset is our ultimate anchor. It shows us exactly how far our model's logic has deviated from reality, serving as a critical check against overfitting before a model goes into production.`,
            },
            {
                day: "Thursday",
                slug: "thursday",
                title: "Polynomial Regression & Feature Selection",
                subtitle: "Visualizing relationships, Comparing R², and isolating top features",
                topics: [
                    "Choosing Linear vs Polynomial",
                    "Train vs Test R² comparison",
                    "Feature Selection strategies"
                ],
                contentPath: "/content/week-4/thursday/study_material.html",
                summary: `This session focused on selecting the right regression model based on data patterns. If a feature's scatterplot shows a curve, Polynomial Regression is a better choice than a straight Linear Regression line. A critical misconception was corrected: polynomial regression doesn't add new observations, it creates new derived features to better capture non-linear relationships.

Model evaluation was also a key topic. You must always compare the training R-squared score against the testing R-squared score to check for overfitting. A model with a training score of 75 percent and a testing score of 66 percent is considered decent, as the drop-off is minimal. If the testing score is significantly lower, the model is overfitted.

Finally, the session emphasized feature selection. Dropping features with low correlation and isolating the top predictors can simplify your model and often improve accuracy. The workflow of building, testing, and refining models iteratively is the core of effective machine learning.`,
            },
        ],
    },
];

