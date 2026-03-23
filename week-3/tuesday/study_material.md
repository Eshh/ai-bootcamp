# 📋 AI Bootcamp — Week 3, Tuesday

**Date:** Tuesday, 10 March 2026
**Topic:** Linear Regression Fundamentals & Simple Linear Regression

**Summary:** This session introduced **Linear Regression** as the foundational supervised learning algorithm for predicting continuous values. The discussion built intuition using a simple house-pricing example, then connected that intuition to the formal **Ordinary Least Squares (OLS)** idea of fitting the best straight line. The session also reviewed the **Boston Housing** dataset, the importance of **EDA and train-test split**, and how to interpret **R squared**, **residual plots**, and a basic **simple linear regression** model using both manual math and `sklearn`.

---

## 🎯 Learning Objectives

- Understand what **Linear Regression** is and when to use it
- Distinguish **continuous prediction** problems from classification problems
- Interpret the linear regression equation in terms of **slope** and **intercept**
- Understand how **Ordinary Least Squares (OLS)** finds the best-fit line
- Explain why we do **EDA before modelling**
- Use a **train-test split** to evaluate generalization on unseen data
- Build **Simple Linear Regression** manually and with `sklearn`
- Interpret **R²**, residuals, and what a "good fit" means in practice

---

## 📖 Key Concepts & Definitions

| Term | Definition |
|------|-----------|
| **Linear Regression** | A supervised learning algorithm used to predict a **continuous target** by fitting a straight line (or hyperplane) to data. |
| **Target Variable** | The value we want to predict. In this session, the target is house price (`medv`). |
| **Feature** | An input variable used to make predictions, such as `lstat`, `rm`, or `tax`. |
| **Simple Linear Regression** | Linear regression with **one feature** and one target. |
| **Multiple Linear Regression** | Linear regression with **multiple features** predicting one target. |
| **Intercept (`w₀`)** | The predicted value of `y` when the input feature is 0. |
| **Slope / Coefficient (`w₁`)** | The amount the prediction changes for a 1-unit increase in the feature. |
| **OLS (Ordinary Least Squares)** | The method used to choose the best-fit line by minimizing the sum of squared residuals. |
| **Residual** | The difference between the actual value and the predicted value: `actual - predicted`. |
| **R² Score** | The proportion of variance in the target explained by the model. Higher usually means a better fit. |
| **Train-Test Split** | Separating data into training and testing sets to evaluate model performance on unseen examples. |

---

## 📝 Detailed Notes

---

## 1. What Is Linear Regression?

Linear Regression is the most fundamental supervised learning algorithm for predicting a **continuous value**.

Examples:
- Predicting **house price**
- Predicting **sales revenue**
- Predicting **temperature**
- Predicting **customer lifetime value**

The instructor opened with an intuitive example:

- If a **2-bedroom** house costs **1 crore**
- And everything else remains the same
- Then a **3-bedroom** house might be estimated at **1.5 crore**

This is not a full linear regression model yet, but it captures the core idea:
- as one feature increases, the target changes in a roughly proportional way

> 📌 **Did You Know?** Linear Regression is called "linear" because the model is **linear in its coefficients**, not because every real-world relationship is perfectly straight.

---

## 2. The Linear Regression Equation

For simple linear regression, the model is:

```python
y_hat = w0 + w1 * X
```

Where:
- `w0` = **intercept**
- `w1` = **slope**
- `X` = input feature
- `y_hat` = predicted target

Interpretation:
- The **intercept** is where the line starts when `X = 0`
- The **slope** tells us how much the prediction changes when `X` increases by 1

Example interpretation:

```python
medv = 34.55 + (-0.95) * lstat
```

This means:
- when `lstat` increases by 1 unit, predicted `medv` decreases by about `0.95`

> 💡 **Pro Tip:** The sign of the coefficient matters. A **positive slope** means the target goes up as the feature increases. A **negative slope** means the target goes down.

---

## 3. How OLS Finds the Best-Fit Line

The goal of linear regression is not to draw any random straight line. It chooses the line that minimizes prediction error using **Ordinary Least Squares (OLS)**.

OLS minimizes:

```python
sum((y_actual - y_predicted) ** 2)
```

Why square the errors?
- Negative and positive errors should not cancel out
- Larger mistakes should be penalized more heavily
- Squaring gives a smooth mathematical objective for optimization

For simple linear regression, the formulas are:

```python
w1 = sum((Xi - X_mean) * (yi - y_mean)) / sum((Xi - X_mean) ** 2)
w0 = y_mean - w1 * X_mean
```

This is exactly the "slope + intercept" logic Kumar referred to in the session when connecting school-level math to regression modelling.

---

## 4. The Dataset: Boston Housing

The notebook uses the **Boston Housing** dataset:

- **506 rows**
- **13 features**
- **Target:** `medv` = median home value in `$1000s`

Some important features:

| Feature | Meaning |
|---------|---------|
| `rm` | Average number of rooms per dwelling |
| `lstat` | Percentage of lower-status population |
| `ptratio` | Pupil-teacher ratio |
| `tax` | Property-tax rate |
| `nox` | Nitric oxide concentration |
| `medv` | Median home value (target) |

Important findings from the notebook:
- `rm` has a strong **positive** correlation with `medv`
- `lstat` has a strong **negative** correlation with `medv`
- `rad` and `tax` are highly correlated with each other, suggesting **multicollinearity**

> ⚠️ **Important Note:** The Boston Housing dataset is still widely used in tutorials, but it is considered outdated and has ethical/statistical issues. It is fine for learning mechanics, but for serious production work you should prefer better-curated modern datasets.

---

## 5. Why EDA Comes Before Modelling

The notebook correctly spends time on **Exploratory Data Analysis (EDA)** before training the model.

EDA helps us answer:
- Is the target skewed?
- Are there outliers?
- Which features relate strongly to the target?
- Are there highly correlated features that may cause instability?
- Is the relationship linear or curved?

Notebook EDA steps:
- Histogram and boxplot of `medv`
- Distribution plots for all features
- Correlation heatmap
- Scatter plots of key features vs target

Important session-relevant findings:
- `medv` is **right-skewed**
- `lstat` and `medv` show a strong but somewhat curved relationship
- `rm` and `medv` show a positive trend
- `rad` and `tax` are strongly correlated with each other

> 📌 **Did You Know?** A strong correlation does not guarantee a perfect linear model. Scatter plots matter because they reveal whether the relationship is straight, curved, noisy, or driven by outliers.

---

## 6. Train-Test Split and Generalization

Before modelling, the data is split into:
- **Training set:** used to learn the relationship
- **Test set:** used to check performance on unseen data

Typical split in the notebook:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

Why this matters:
- A model can look good on training data just by memorizing it
- Real evaluation comes from how well it performs on **new data**

> ⚠️ **Critical Rule:** Never use the test set during training, feature engineering decisions, or scaler fitting. That causes **data leakage** and gives over-optimistic results.

---

## 7. Simple Linear Regression from Scratch

The session focused only up to **Simple Linear Regression**.

The notebook uses `lstat` as the single feature because it has a strong relationship with `medv`.

### Manual OLS with NumPy

```python
X_simple_train = X_train['lstat'].values
y_simple_train = y_train.values

X_mean = X_simple_train.mean()
y_mean = y_simple_train.mean()

numerator = np.sum((X_simple_train - X_mean) * (y_simple_train - y_mean))
denominator = np.sum((X_simple_train - X_mean) ** 2)
w1 = numerator / denominator

w0 = y_mean - w1 * X_mean
```

This manual version is valuable because it proves that regression is not "magic". Under the hood, `sklearn` is doing the same mathematical job much more efficiently and safely.

### Using `sklearn`

```python
from sklearn.linear_model import LinearRegression

lr_simple = LinearRegression()
lr_simple.fit(X_simple_train.reshape(-1, 1), y_simple_train)

print(lr_simple.intercept_)
print(lr_simple.coef_[0])
```

The notebook checks that the manual OLS result and the `sklearn` result match.

> 💡 **Pro Tip:** For one feature, `sklearn` still expects a 2D input shape. That is why we use `.reshape(-1, 1)`.

---

## 8. Understanding R² Intuitively

The session introduced **R²** as "percentage of variance explainability", which is a good beginner-friendly intuition.

A more precise version:
- `R²` measures how much of the target's variation is explained by the model compared with a simple baseline

General interpretation:
- `R² = 1` means a perfect fit
- `R² = 0` means no improvement over predicting the mean
- Higher `R²` usually means a better fit, though context matters

Kumar's intuition in the session was:
- when the fitted line passes through the data more appropriately
- error decreases
- and `R²` increases

That intuition is directionally correct.

> ⚠️ **Important Correction:** A high `R²` does **not** automatically mean the model is truly good. You still need to check residuals, train-vs-test gap, domain relevance, and whether assumptions are being violated.

The notebook's simple linear regression example produces train and test `R²` values that are fairly close. That is generally a good sign:
- the model is not severely overfitting
- but the absolute score is still modest, meaning one feature alone is not enough for strong prediction

---

## 9. Residual Plots and Model Fit

Residuals are:

```python
residual = actual - predicted
```

Residual plots help answer:
- Is the model systematically missing some pattern?
- Are the errors random?
- Is the relationship actually non-linear?

Notebook example:

```python
residuals = y_simple_test - y_pred_simple

plt.scatter(y_pred_simple, residuals)
plt.axhline(y=0, color='red', linestyle='--')
```

What we want:
- residuals scattered randomly around 0
- no obvious curve, funnel, or structure

If we see a curved pattern:
- the straight-line assumption may be too simple
- this motivates later techniques like **polynomial regression**

This connects directly to Kumar's comment that the residual plot should be examined carefully.

---

## 10. Metrics Mentioned but Deferred

The instructor mentioned these metrics and said they would be covered in more detail later:

- **R²**
- **RMSE**
- **MAE**

Quick intuition:

| Metric | What It Tells You |
|--------|-------------------|
| **R²** | How much variance is explained |
| **MAE** | Average absolute error |
| **RMSE** | Square-rooted average squared error, penalizes large mistakes more heavily |

> 💡 **Best Practice:** Use multiple metrics together. A model should not be judged by `R²` alone.

---

## 11. Assignment: Scatterplot Based on Heatmap

Homework:
- Check the heatmap or correlation matrix
- Find the columns where correlation is **greater than 0.7**
- Draw scatter plots for those column pairs

Examples from the session:
- `nox` vs `indus`
- `tax` vs `rad`

Simple code pattern:

```python
plt.scatter(df['tax'], df['rad'])
plt.xlabel('tax')
plt.ylabel('rad')
plt.title('tax vs rad')
plt.show()
```

If you want to first print the high-correlation pairs, you can do:

```python
corr = df.corr()

for col1 in corr.columns:
    for col2 in corr.columns:
        if col1 != col2 and corr.loc[col1, col2] > 0.7:
            print(col1, col2, corr.loc[col1, col2])
```

This homework is useful because the heatmap gives the number, but the scatter plot shows the actual relationship.

---

## 💻 Technical Deep-Dive / Code & Tools

### Core Imports

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
```

### Helper Evaluation Pattern

```python
def evaluate_model(model, X_tr, X_te, y_tr, y_te):
    model.fit(X_tr, y_tr)
    y_pred_train = model.predict(X_tr)
    y_pred_test = model.predict(X_te)

    train_r2 = r2_score(y_tr, y_pred_train)
    test_r2 = r2_score(y_te, y_pred_test)
    rmse = np.sqrt(mean_squared_error(y_te, y_pred_test))
    mae = mean_absolute_error(y_te, y_pred_test)

    return train_r2, test_r2, rmse, mae
```

### Simple Linear Regression End-to-End

```python
X_simple = df[['lstat']]
y = df['medv']

X_train, X_test, y_train, y_test = train_test_split(
    X_simple, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("Intercept:", model.intercept_)
print("Slope:", model.coef_[0])
print("R²:", r2_score(y_test, y_pred))
```

---

## ❓ Q&A Highlights

- **Q:** Should we go beyond simple linear regression in this session?
  - **A:** No. The instructor explicitly asked learners to stop at **simple linear regression** for now and not move into multiple linear regression yet.

- **Q:** What should students focus on before the next session?
  - **A:** Review the slides and notebook up to simple linear regression, and build the requested scatter plots for highly correlated feature pairs.

---

## ✅ Key Takeaways

- Linear Regression is the baseline supervised algorithm for predicting continuous values.
- Simple Linear Regression models one feature and one target using a straight line.
- OLS finds the best-fit line by minimizing squared residuals.
- EDA is essential before modelling because it reveals skew, outliers, correlation, and non-linearity.
- Train-test split is necessary to measure generalization honestly.
- `R²` is useful, but it should be read alongside residual plots and error metrics.
- Residual patterns often reveal when a straight line is too simple.
- Strong feature-feature correlations can signal multicollinearity.

---

## 📌 Action Items & Homework

- Review the material only up to **Simple Linear Regression**
- Run the Boston Housing notebook and look at the **regression line** and **residual plot**
- Complete the homework: create scatter plots for the heatmap pairs where correlation is **greater than 0.7**
- Use `assignment.py` as a simple starter file for the homework
- Bring your notebook for discussion in the next session

---

## 🔗 Resources & References

- **Notebook:** `Linear Regression - Complete Guide with All Techniques.ipynb`
- **Slides/PDF:** `Linear Regression - Complete Guide.pdf`
- **Starter homework file:** `assignment.py`
- **Dataset used in notebook:** `BostonHousing.csv`
