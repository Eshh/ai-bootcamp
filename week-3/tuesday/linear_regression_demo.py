import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression


df = pd.read_csv("BostonHousing.csv")

X = df[["lstat"]]
y = df["medv"]

model = LinearRegression()
model.fit(X, y)

print("Intercept:", model.intercept_)
print("Slope:", model.coef_[0])

x_line = pd.DataFrame({"lstat": range(int(X["lstat"].min()), int(X["lstat"].max()) + 1)})
y_line = model.predict(x_line)

plt.scatter(X, y)
plt.plot(x_line, y_line, color="red")
plt.xlabel("lstat")
plt.ylabel("medv")
plt.title("Linear Regression Line")
plt.show()
