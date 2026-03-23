import pandas as pd
import matplotlib.pyplot as plt


df = pd.read_csv("BostonHousing.csv")

corr = df.corr(numeric_only=True)

print(corr)

for i in range(len(corr.columns)):
    for j in range(i + 1, len(corr.columns)):
        if corr.iloc[i, j] > 0.7:
            col1 = corr.columns[i]
            col2 = corr.columns[j]

            print(col1, col2, corr.iloc[i, j])

            plt.figure(figsize=(6, 4))
            plt.scatter(df[col1], df[col2])
            plt.xlabel(col1)
            plt.ylabel(col2)
            plt.title(col1 + " vs " + col2)
            plt.show()
