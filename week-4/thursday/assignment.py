import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score

# ==========================================================
# HOMEWORK: Linear Regression vs Polynomial Regression
# ==========================================================
# Task: Build one Linear Regression model and one Polynomial 
# Regression model for the next session. Try to achieve a 
# higher R-squared score.
# ==========================================================

# 1. Load the dataset (using BostonHousing)
df = pd.read_csv('../tuesday/BostonHousing.csv')

# 2. Select features and target
# Hint: Pick the top 2-4 features that correlate most with 'medv'
# Right now it uses 'lstat' and 'rm', you can adjust this!
X = df[['lstat', 'rm']] 
y = df['medv']

# 3. Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ==========================================================
# PART 1: Linear Regression Model
# ==========================================================
print("--- Linear Regression ---")
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)

lr_train_pred = lr_model.predict(X_train)
lr_test_pred = lr_model.predict(X_test)

print(f"Training R-squared: {r2_score(y_train, lr_train_pred):.4f}")
print(f"Testing R-squared:  {r2_score(y_test, lr_test_pred):.4f}")

# ==========================================================
# PART 2: Polynomial Regression Model
# ==========================================================
print("\n--- Polynomial Regression ---")
# Hint: Change the degree to 3 or 4, but watch out for overfitting!
poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)

pr_model = LinearRegression()
pr_model.fit(X_train_poly, y_train)

pr_train_pred = pr_model.predict(X_train_poly)
pr_test_pred = pr_model.predict(X_test_poly)

print(f"Training R-squared: {r2_score(y_train, pr_train_pred):.4f}")
print(f"Testing R-squared:  {r2_score(y_test, pr_test_pred):.4f}")
