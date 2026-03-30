# 📋 AI Bootcamp — Week 4, Thursday

**Date:** Thursday, 19 March 2026
**Topic:** Polynomial vs Linear Regression & Model Evaluation

**Summary:** This session focused on practically evaluating and comparing **Linear Regression** and **Polynomial Regression** models using the Boston Housing dataset. The instructor guided students through creating a simple baseline model, interpreting the initial scatter plots to identify non-linear relationships, and ultimately deploying Polynomial Regression to account for curved behavior. Key topics included analyzing **Train and Test R² scores** to ensure the model wasn't evaluating falsely, interpreting residual plots, and practically avoiding the dangers of excessive model complexity by sticking to standard `degree=2` or `degree=3` transformations.

---

## 🎯 Learning Objectives

- Identify when a simple straight line (Linear Regression) is insufficient by interpreting **scatter plots** and **residual plots**.
- Understand the mechanics of **Polynomial Regression** and what transforming a feature space actually means statistically.
- Analyze **R² Scores** correctly on both Training and Testing datasets to spot underfitting and overfitting.
- Implement Polynomial Regression using `sklearn.preprocessing.PolynomialFeatures`.
- Recognize how adding higher degree combinations inflates the dataset and impacts training efficiency.

---

## 📖 Key Concepts & Definitions

| Term | Definition |
|------|-----------|
| **Polynomial Regression** | A form of regression where the relationship between the independent variable x and the dependent variable y is modeled as an nth degree polynomial in x. |
| **Polynomial Features** | Generating a new feature matrix consisting of all polynomial combinations of the features with degree less than or equal to the specified degree. |
| **Residual Plot** | A scatter plot showing the residuals (errors) on the y-axis and predicted values on the x-axis. A core metric to detect whether a straight line is indeed the appropriate model choice. |
| **Degree (in Polynomials)** | The highest exponent used in a polynomial function. E.g., `ax² + bx + c` is a polynomial of degree 2. |

---

## 📝 Detailed Notes

---

## 1. When Linear Regression Fails

The instructor started by asking students to visualize the highly correlated columns (such as `lstat` vs `medv`). 

If you view the scatter plot for `lstat` and `medv` (Median Value), it does not perfectly follow a straight linear decline. Instead, the data slightly curves (like a shallow 'U' or logarithmic curve). 

When you apply a simple **Linear Regression** model to this curved relationship:
- It forces a stiff, straight line through a bent distribution.
- The **R²** stays moderately low (around ~0.50 - 0.54) because the strict linearity cannot capture the curvature.
- The **Residual Plot** will display a distinct pattern (like an arch), which violates the core linear regression assumption that residuals should appear completely random around zero.

---

## 2. Introducing Polynomial Regression

Since the relationship is not straight, we must adapt the model to be "curved". This is done via **Polynomial Regression**.

**Misconception:** Polynomial regression is not an entirely new algorithm! 
It is just a mathematical transformation trick applied *before* Standard Linear Regression.

Instead of predicting `y` from `x`, we predict `y` from `x`, `x²`, `x³`, etc. We physically add these new transformed columns (features) to our dataset. Because the algorithm now has access to these non-linear transformations, the final equation becomes capable of drawing a curve.

> 💡 **Pro Tip:** Polynomial Regression is still classified statistically as a "linear model." Even though the curve it draws on the graph is bent, the model parameters (weights/coefficients) are mathematically linear. You are literally just doing linear regression on a larger, modified dataset.

---

## 3. How to Execute Polynomial Regression

To create polynomial regression in Python, you use `sklearn.preprocessing.PolynomialFeatures`.

1. **Transform Your Data:** Pass your `X_train` into the polynomial transformer.
2. **Train Linear Regression:** Pass the transformed `X_train_poly` into the standard `LinearRegression.fit()` function.
3. **Predict and Score:** Transform the test data (`X_test_poly`) before predicting its target values.

**Comparing Degree 1 to Degree 2:**
By stepping up to `degree=2`, the model generates a nice, gentle curve through the data points.
- The **Train R²** metric increases measurably (from e.g., ~0.54 to ~0.64).
- The **Test R²** metric also increases, confirming that the model did not simply memorize the training set, but genuinely captured the underlying curved phenomenon better.

> ⚠️ **Critical Rule:** You must always fit your `PolynomialFeatures` object ONLY on the Training set. Only `transform()` the test set. If you `fit_transform` the test set, you leak target variance to the test metrics, invalidating your performance results.

---

## 4. The Dangers of Going Too Far

During the session, the instructor reinforced the topic of **Model Complexity**. 

If we use `degree=2` and it improves our score, should we use `degree=5` or `degree=10` to get an even better score? 

**Absolutely not.**
When you increase the polynomial degree:
- The model's curve becomes highly erratic, weaving up and down violently to perfectly hit every single data point in the training set.
- **Train R²** approaches `0.99`.
- **Test R²** will instantly drop—often plunging heavily into negative numbers (e.g., `-100.0`). 

This is the exact definition of **Overfitting**. The model curve memorized the noise, but missed the true signal, rendering it completely useless in a production environment. For real world data, anything beyond `degree=2` or `degree=3` is extremely rare and statistically perilous.

---

## 💻 Technical Deep-Dive / Code & Tools

### End to End Polynomial Evaluation

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

# Sample Setup
X = df[['lstat']]
y = df['medv']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ----- 1. Simple Linear Model (Degree 1) -----
lin_reg = LinearRegression()
lin_reg.fit(X_train, y_train)

# Ensure to test both Train R² and Test R²
print("Linear Regression Train R²:", r2_score(y_train, lin_reg.predict(X_train)))
print("Linear Regression Test R²:", r2_score(y_test, lin_reg.predict(X_test)))


# ----- 2. Polynomial Model (Degree 2) -----
# Initialize Transformer
poly = PolynomialFeatures(degree=2, include_bias=False)

# Transform Data
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test) # NEVER fit the test data!

# Train Model on Transformed Data
poly_reg = LinearRegression()
poly_reg.fit(X_train_poly, y_train)

print("Polynomial (Degree 2) Train R²:", r2_score(y_train, poly_reg.predict(X_train_poly)))
print("Polynomial (Degree 2) Test R²:", r2_score(y_test, poly_reg.predict(X_test_poly)))
```

---

## ❓ Q&A Highlights

- **Q:** *Why is my R² score negative when I test a high degree polynomial model?*
  - **A:** This means the model essentially failed drastically. A negative R² indicates that your model is performing worse than if you had simply predicted the mean value of the data point for every single instance. It highlights catastrophic failure caused strictly by overfitting.

---

## ✅ Key Takeaways

- Polynomial regression handles curves within data by adding new mathematical combination columns (features).
- You are ultimately still executing a standard Linear Regression model, but on transformed data.
- Small degrees (2 or 3) are enough to create a safe curve.
- Higher degrees (like 10 or 15) instantly lead to overfitting, evidenced by a high Training R² and a plunging (or strongly negative) Test R².

---

## 📌 Action Items & Homework

- **Homework Assigned:** Complete the `assignment.py` script provided this week.
- You must create a Linear Regression model evaluating the `rm` and `lstat` columns.
- After evaluating its Train/Test R², construct a Polynomial model evaluating the same features and compare the output.
- Print your R² comparison and share your observation on which model performs better for those features.
