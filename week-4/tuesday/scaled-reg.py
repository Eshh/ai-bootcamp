import pandas as pd

from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

df = pd.read_csv("BostonHousing.csv")
print(df.head())
standard_scaler = StandardScaler()

trained_df = pd.DataFrame(standard_scaler.fit_transform(df))
print(trained_df.head())

# Split
independent_df = df.drop('medv', axis=1)
dependent_df = df['medv']
X_train, X_test, y_train, y_test = train_test_split(independent_df, dependent_df, test_size=0.2, random_state=42)

# Train
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
print("R^2 Score (Test):", model.score(X_test, y_test))
print("R^2 Score (Train):", model.score(X_train, y_train))
