# 📋 AI Bootcamp — Week 3, Thursday

**Date:** Thursday, 12 March 2026
**Topic:** Regression Metrics — R², SST, SSR, SSE, MAE & Polynomial Regression

**Summary:** This session went deep into **regression evaluation metrics** — the tools used to measure how well a regression model actually fits the data. The session built intuition for the **SST / SSR / SSE decomposition**, derived **R²** from first principles, introduced **Adjusted R²** and its importance in multi-feature models, and covered **MAE** and **RMSE** with a comparison of when to use each. The session concluded with hands-on work on **Polynomial Regression** applied to the same salary dataset, comparing metrics across different polynomial degrees.

---

## 🎯 Learning Objectives

- Understand the **variance decomposition identity**: SST = SSR + SSE
- Compute **SST**, **SSR**, and **SSE** from scratch using NumPy
- Derive and interpret **R²** (Coefficient of Determination)
- Understand why **Adjusted R²** is needed for multi-feature models
- Calculate **MAE**, **MSE**, and **RMSE** and know when to use each
- Apply **Polynomial Regression** and evaluate it using regression metrics
- Understand why comparing metrics across polynomial degrees helps identify the right model complexity

---

## 📖 Key Concepts & Definitions

| Term | Definition |
|------|------------|
| **SST** (Sum of Squares Total) | Total variance in the target `y`. Measures how far actual values deviate from the mean. Not related to the model. |
| **SSR** (Sum of Squares Regression) | Variance the model **explains**. How far predicted values deviate from the mean. |
| **SSE** (Sum of Squares Error / Residual) | Variance the model **fails to explain**. Squared residuals summed. OLS minimizes this. |
| **R²** (Coefficient of Determination) | Fraction of total variance explained by the model. Range: ≤ 1 (higher = better). |
| **Adjusted R²** | R² penalized for adding features. Use when comparing models with different feature counts. |
| **MAE** (Mean Absolute Error) | Average absolute difference between actual and predicted. In the same units as the target. |
| **MSE** (Mean Squared Error) | Average of squared errors. Penalizes large errors heavily. Units are squared. |
| **RMSE** (Root Mean Squared Error) | Square root of MSE. Back in original units; more interpretable than MSE. |
| **Polynomial Regression** | Linear regression applied to polynomial-transformed features. Allows curve-fitting. |
| **PolynomialFeatures** | scikit-learn transformer that expands `X` into degree-n polynomial feature matrix. |
| **Overfitting** | A model that fits training data too closely (e.g., degree 9+ polynomial), but generalizes poorly. |

---

## 📝 Detailed Notes

---

## 1. The Fundamental Identity: SST = SSR + SSE

Before computing any metric, this identity must be understood:

```
SST  =  SSR  +  SSE
Total = Explained + Unexplained
```

Think of it as a pie chart:
- **SST** → the whole pie (total variation in `y`)
- **SSR** → the slice your model explains
- **SSE** → the leftover slice (your model missed this)

Each term formula:

```python
y_mean = np.mean(y)

SST = np.sum((y - y_mean) ** 2)           # actual vs mean
SSR = np.sum((y_pred - y_mean) ** 2)      # predicted vs mean
SSE = np.sum((y - y_pred) ** 2)           # actual vs predicted (residuals²)
```

You can verify the identity:

```python
print(np.isclose(SST, SSR + SSE))  # Should be True
```

> ⚠️ **Important:** SST is a property of your **data**, not your model. It doesn't change no matter which model you use. Your model only controls SSR and SSE.

---

## 2. SST — Sum of Squares Total

**Formula:** `SST = Σ(yᵢ - ȳ)²`

- Measures the total spread/variability in the target around its mean
- The "worst case" baseline: if you had no model and just predicted the mean every time, SST is the total error you'd make (with squared penalties)
- This is purely a property of the data — it doesn't change across models

**Visualization intuition:** Vertical lines from each actual data point down to the horizontal mean line. SST = sum of squares of those line lengths.

---

## 3. SSR — Sum of Squares Regression (Explained Variation)

**Formula:** `SSR = Σ(ŷᵢ - ȳ)²`

- Measures how much variation the model captures by pulling predicted values away from the mean
- If the regression line sits flat at the mean → SSR = 0 (model explains nothing)
- If the regression line passes through every data point → SSR = SST (model explains everything)

> 📌 **Did You Know?** SSR is called "regression" because it captures variation due to the regression line itself — the variation explained *by fitting* the relationship.

---

## 4. SSE — Sum of Squares Error (Residual Variation)

**Formula:** `SSE = Σ(yᵢ - ŷᵢ)²`

- Measures the variation the model fails to explain — the squared residuals
- SSE = 0 → perfect model (every prediction is exact)
- SSE = SST → useless model (no better than always predicting the mean)

> ⚠️ **Critical:** This is exactly what **Ordinary Least Squares (OLS)** minimizes! The "least squares" in OLS refers directly to minimizing SSE. When you call `LinearRegression().fit(X, y)`, scikit-learn is solving the optimization problem that finds the coefficients which make SSE as small as possible.

---

## 5. R² — Coefficient of Determination

**Formula (two equivalent forms):**

```python
R2 = SSR / SST         # "How much did the model explain?"
R2 = 1 - (SSE / SST)  # "How much error is left compared to total?"
```

**Interpretation table:**

| R² Value | Meaning |
|----------|---------|
| **1.0** | Perfect — explains 100% of variance |
| **0.9+** | Excellent |
| **0.5** | Mediocre — only 50% explained |
| **0.0** | Useless — no better than predicting the mean |
| **< 0** | Worse than the mean (possible on test data with bad models) |

**Code — compute and verify:**

```python
R2_manual = SSR / SST
R2_sklearn = r2_score(y, y_pred)

print(R2_manual)   # should match
print(R2_sklearn)
```

**Key limitations of R²:**
- R² always **increases or stays the same** as you add more features — even useless noise features. This is why you cannot use R² alone for multi-feature comparison.
- A high R² does **not** prove the model is correct. Residual patterns could still indicate problems.
- R² can be negative on test data if the model is terrible — this is mathematically valid.

> 💡 **Pro Tip:** Use R² as a first pass, then always inspect residual plots. Two models with the same R² can behave very differently.

---

## 6. Adjusted R²

**The problem:** Adding a useless feature to a model will always either maintain or increase R². This makes R² misleading when comparing models with different numbers of features.

**The fix — Adjusted R²:**

```python
Adjusted_R2 = 1 - (1 - R2) * (n - 1) / (n - p - 1)
```

Where:
- `n` = number of samples
- `p` = number of features (predictors)

**Key property:** Adjusted R² penalizes for adding features. If you add a noise feature that doesn't help, Adjusted R² will drop even though R² stays flat or increases.

**Practical rule:** Always use Adjusted R² when comparing models with **different numbers of features**. For a single-feature model on the same dataset, R² and Adjusted R² tell the same story.

> 💡 **Pro Tip:** In practice, scikit-learn does not provide Adjusted R² directly. You need to compute it manually or use `statsmodels`, which includes it in its regression summary output.

---

## 7. MAE — Mean Absolute Error

**Formula:** `MAE = (1/n) Σ|yᵢ - ŷᵢ|`

```python
absolute_errors = np.abs(y - y_pred)
MAE = np.mean(absolute_errors)

# Verify:
MAE_sklearn = mean_absolute_error(y, y_pred)
```

**Interpretation:**
- MAE is in **the same units as the target** — very interpretable
- If predicting salary in $1000s and MAE = 3.5 → predictions are off by $3,500 on average
- Treats all errors equally, regardless of magnitude

**When to use MAE:**
- When outliers are present and you don't want them to dominate the metric
- When you need an interpretable, human-friendly error measure
- When every unit of error matters equally

---

## 8. MSE and RMSE

**MSE:**

```python
MSE = np.mean((y - y_pred) ** 2)
# or:
MSE = mean_squared_error(y, y_pred)
```

- Units are **squared** (hard to interpret directly)
- **Sensitive to outliers** — squaring amplifies large errors heavily
- MSE is what OLS minimizes during training

**RMSE:**

```python
RMSE = np.sqrt(MSE)
```

- Back in the original units — comparable to MAE
- RMSE ≥ MAE always (because of squaring)
- If RMSE >> MAE, large outlier errors are present

**Comparison table:**

| Property | MAE | MSE | RMSE |
|----------|-----|-----|------|
| **Units** | Same as target | Squared units | Same as target |
| **Outlier sensitivity** | Robust | High | High |
| **Differentiable at 0?** | No | Yes | Yes |
| **Interpretable?** | ✅ Yes | ❌ Hard | ✅ Yes |
| **When to prefer** | Outliers present | Gradient-based training | Balanced reporting |

> ⚠️ **Important:** Never compare RMSE across two different datasets or targets — it only makes sense within the same problem. RMSE is always ≥ MAE; the closer they are, the more uniform the errors.

---

## 9. Polynomial Regression — Applying Metrics in Practice

**Why polynomial regression?**

Linear regression fits only a straight line. When the relationship between `X` and `y` is curved (non-linear), a linear model underperforms. Polynomial regression allows curved fits by transforming features.

**How it works:**

`PolynomialFeatures` transforms `X` into higher-degree versions before passing to `LinearRegression`:

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

degree = 2
poly = PolynomialFeatures(degree=degree)
X_poly = poly.fit_transform(X)   # X becomes [1, X, X²]

model = LinearRegression()
model.fit(X_poly, y)
y_pred = model.predict(X_poly)
```

For degree 2, the model learns:
```
ŷ = b₀ + b₁·X + b₂·X²
```

For degree 3:
```
ŷ = b₀ + b₁·X + b₂·X² + b₃·X³
```

> ⚠️ Important: Polynomial regression is still technically **linear regression** — it's linear in its coefficients. The polynomial transformation happens to the **features**, not the model.

---

## 10. Comparing Degrees — Model Complexity vs. Metrics

The session showed why you must check metrics across different degrees:

```python
for d in range(1, 6):
    poly = PolynomialFeatures(d)
    X_poly = poly.fit_transform(X)
    model = LinearRegression().fit(X_poly, y)
    y_pred = model.predict(X_poly)

    print(d, r2_score(y, y_pred), mean_absolute_error(y, y_pred))
```

**What you observe:**
- R² increases as degree goes up (more flexibility)
- MAE decreases as degree goes up (lower training error)
- **But this doesn't mean higher degree is always better** — this is training set performance

> ⚠️ **Overfitting warning:** A degree-9 polynomial on 10 data points will pass through every single point perfectly (R² = 1.0, SSE = 0), but will wildly oscillate between points and generalize terribly to new data. The test set is what exposes this.

**Instructor's rule of thumb:** Stick to degree 1 (linear) as the default unless you have clear evidence that residuals show a strong curve. Model simplicity is a virtue. Even if R² is slightly lower with degree 1, the model is more robust, interpretable, and generalizable.

> 💡 **Going Deeper:** This is the **bias-variance tradeoff**. Low-degree models have high bias (too simple), high-degree models have high variance (too sensitive to training data noise). The goal is the sweet spot.

---

## 💻 Technical Deep-Dive / Code & Tools

### Full Metrics Workflow (from scratch + sklearn verification)

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

# Dataset
X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reshape(-1, 1)
y = np.array([30, 35, 45, 50, 55, 58, 65, 72, 80, 90])

# Fit model (linear for now)
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)

# Metrics from scratch
y_mean = np.mean(y)
SST = np.sum((y - y_mean) ** 2)
SSR = np.sum((y_pred - y_mean) ** 2)
SSE = np.sum((y - y_pred) ** 2)
R2  = SSR / SST
MAE = np.mean(np.abs(y - y_pred))
MSE = np.mean((y - y_pred) ** 2)
RMSE = np.sqrt(MSE)

print(f"SST  = {SST:.2f}")
print(f"SSR  = {SSR:.2f}")
print(f"SSE  = {SSE:.2f}")
print(f"R²   = {R2:.4f}")
print(f"MAE  = {MAE:.4f}")
print(f"RMSE = {RMSE:.4f}")

# Verify identity
print(np.isclose(SST, SSR + SSE))   # True
```

### Adjusted R²

```python
def adjusted_r2(r2, n, p):
    return 1 - (1 - r2) * (n - 1) / (n - p - 1)

n = len(y)
p = 1  # one feature
print(adjusted_r2(R2, n, p))
```

### Polynomial Regression Pipeline

```python
degree = 2
poly = PolynomialFeatures(degree)
X_poly = poly.fit_transform(X)

model = LinearRegression()
model.fit(X_poly, y)
y_pred_poly = model.predict(X_poly)

print(r2_score(y, y_pred_poly))
print(mean_absolute_error(y, y_pred_poly))
```

### Degree Comparison Loop

```python
for d in range(1, 6):
    pf = PolynomialFeatures(d)
    Xp = pf.fit_transform(X)
    m  = LinearRegression().fit(Xp, y)
    yp = m.predict(Xp)
    r2  = r2_score(y, yp)
    mae = mean_absolute_error(y, yp)
    sse = np.sum((y - yp) ** 2)
    print(f"degree={d}  R²={r2:.4f}  MAE={mae:.4f}  SSE={sse:.4f}")
```

### Core Imports

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
```

---

## ❓ Q&A / Discussion Highlights

**Q (Ronak):** If a high-degree polynomial is doing poorly, will providing more training data make it better?

**A (Kumar):** Not necessarily — it all depends on the pattern in the data. More data does not automatically improve a high-degree polynomial model; if the true relationship is simple (linear or quadratic), forcing a high-degree fit can still overfit. We generally stick to degree 1 to keep model complexity low and interpretability high.

**Q (Ronak):** Won't less data work better for lower-degree models?

**A (Kumar):** We cannot generalize that way either. The data requirements depend on the pattern and problem, not just the degree.

**Q (Eswar):** Is the test data the best reference for comparing models after applying polynomial transformations?

**A (Kumar):** Correct. The test data you kept aside acts as the reference for honest evaluation. How far have we deviated from it tells you how good the model actually is.

---

## ✅ Key Takeaways

- SST = SSR + SSE is the fundamental identity. SST is fixed by the data; your model only controls SSR and SSE.
- R² = SSR / SST — it tells you what fraction of total variance the model explains.
- R² always increases as you add features or raise polynomial degree. Use Adjusted R² when comparing different model sizes.
- MAE is the most interpretable error metric — in the same units as the target, robust to outliers.
- RMSE penalizes large errors more. If RMSE >> MAE, large outlier errors exist.
- Polynomial regression transforms features before fitting a linear model. It still uses `LinearRegression`.
- Higher degree does not mean better generalization. Always evaluate on test data.
- Prefer simpler models (degree 1) unless residual analysis shows a clear non-linear pattern.

---

## 📌 Action Items & Homework

- Compute SST, SSR, SSE, R², and MAE for a **polynomial regression** model (degree 2) using the salary dataset from class
- Use the `assignment.py` starter file in `week-3/thursday/`
- Try running the degree comparison loop (degrees 1–5) and observe how R² and MAE change
- Note: trainer said he will give more specific homework in the **next session (Friday/next Tuesday)**

---

## 🔗 Resources & References

- **Notebook:** `Regression Metrics - R Squared, SSR, MAE Explained.ipynb`
- **Starter homework file:** `week-3/thursday/assignment.py`
- **scikit-learn docs:** [`r2_score`](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html), [`mean_absolute_error`](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.mean_absolute_error.html), [`PolynomialFeatures`](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PolynomialFeatures.html)
