
# Week 3 - Thursday Assignment
# Topic: Regression Metrics for Polynomial Regression
# Task: Compute SST, SSR, SSE, R², and MAE for a polynomial regression model

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score, mean_absolute_error

# --------------------------------------------------
# 1. Load / create data
# --------------------------------------------------
# Use the same salary dataset from class
X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reshape(-1, 1)
y = np.array([30, 35, 45, 50, 55, 58, 65, 72, 80, 90])

# --------------------------------------------------
# 2. Fit a polynomial regression model (degree = 2)
# --------------------------------------------------
# TODO: change the degree and see how metrics change
degree = 2

poly = PolynomialFeatures(degree=degree)
X_poly = poly.fit_transform(X)

model = LinearRegression()
model.fit(X_poly, y)
y_pred = model.predict(X_poly)

# --------------------------------------------------
# 3. Compute regression metrics from scratch
# --------------------------------------------------
y_mean = np.mean(y)

SST = np.sum((y - y_mean) ** 2)
SSR = np.sum((y_pred - y_mean) ** 2)
SSE = np.sum((y - y_pred) ** 2)

R2 = SSR / SST
MAE = np.mean(np.abs(y - y_pred))

print(f"Degree          : {degree}")
print(f"SST             : {SST:.4f}")
print(f"SSR             : {SSR:.4f}")
print(f"SSE             : {SSE:.4f}")
print(f"SSR + SSE       : {SSR + SSE:.4f}  (should equal SST)")
print(f"R²              : {R2:.4f}")
print(f"R² (sklearn)    : {r2_score(y, y_pred):.4f}")
print(f"MAE             : {MAE:.4f}")

# --------------------------------------------------
# 4. Plot actual vs predicted
# --------------------------------------------------
plt.scatter(X, y, color='blue', label='Actual')
plt.plot(X, y_pred, color='red', label=f'Predicted (degree={degree})')
plt.xlabel('Experience (years)')
plt.ylabel('Salary ($1000s)')
plt.title(f'Polynomial Regression (degree={degree})\nR²={R2:.4f}, MAE={MAE:.4f}')
plt.legend()
plt.tight_layout()
plt.show()

# --------------------------------------------------
# 5. Compare metrics across different degrees
# --------------------------------------------------
print("\n--- Metrics for different polynomial degrees ---")
print(f"{'Degree':<8} {'R²':<10} {'MAE':<10} {'SSE':<12}")
print("-" * 42)

for d in range(1, 6):
    pf = PolynomialFeatures(d)
    Xp = pf.fit_transform(X)
    m = LinearRegression().fit(Xp, y)
    yp = m.predict(Xp)

    r2 = r2_score(y, yp)
    mae = mean_absolute_error(y, yp)
    sse = np.sum((y - yp) ** 2)

    print(f"{d:<8} {r2:<10.4f} {mae:<10.4f} {sse:<12.4f}")
