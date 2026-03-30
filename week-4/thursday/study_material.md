# 📋 Session Overview
- **Date**: Week 4, Thursday
- **Theme**: Polynomial Regression, Model Evaluation, and Feature Selection
- **Summary**: This session focused on practically choosing between Linear and Polynomial Regression based on feature distributions. The instructor covered evaluating model performance using Train/Test R² comparisons and introduced manual feature selection to improve model accuracy. 

# 🎯 Learning Objectives
- Understand when to apply Polynomial Regression based on data curvature.
- Evaluate model generalizability by comparing training and testing R² scores.
- Perform basic feature selection to refine model inputs.

# 📖 Key Concepts & Definitions
| Concept | Definition |
|---------|------------|
| **Polynomial Regression** | An extension of linear regression that models the relationship between the independent variable x and the dependent variable y as an nth degree polynomial. Useful for non-linear, curved data patterns. |
| **Model Generalization** | How well a model performs on unseen test data compared to the training data. |
| **Feature Selection** | The process of selecting a subset of relevant, highly correlated features (variables) for use in model construction. |
| **Regularization (Preview)** | A technique used to prevent overfitting by adding a penalty term to the model's loss function. (To be covered next session). |

# 📝 Detailed Notes

## Choosing the Right Regression Model
When deciding between Linear and Polynomial Regression, the most critical step is to visualize the data. 
- If the feature pattern (scatterplot of feature vs target) follows a roughly straight line, **Linear Regression** is appropriate.
- If the feature pattern is curved or non-linear, **Polynomial Regression** will likely capture the relationship much better.
> 💡 **Pro Tip**: Always start with visual EDA (Exploratory Data Analysis). Don't arbitrarily apply higher-degree polynomials, as this can lead to severe overfitting. 

## Misconceptions about Polynomial Transformation
During the session, a question was raised: *Does applying a polynomial transformation increase the dataset, causing us to lose accuracy but cover more data?*
- **Correction**: No, polynomial regression does not "increase the dataset" in terms of new observations. Instead, it adds new *features* (like x², x³) derived from the original features. This actually allows the model to map *more accurately* to the training data, though it risks overfitting if the degree is too high.

## Evaluating Model Performance (Train vs. Test R²)
To ensure a model isn't overfitting, you must compare the **R² score on the training set** against the **R² score on the testing set**.
- Example discussed: A training R² of 0.75 (75%) and a testing R² of 0.66 (66%).
- **Instructor's Assessment**: This is a decent model. The drop-off is only about 9-15%, which indicates the model is generalizing reasonably well to unseen data.
- **Red Flag**: If training R² is 0.95 and testing R² is 0.40, the model is heavily overfitted.

## Feature Selection Strategies
Not all features are useful. Including features with low correlation or low predictive power can add noise to the model.
- **Actionable Strategy**: Isolate the top predictors. For example, rank features by their correlation coefficient with the target variable, pick the top 4, and build a model using only those. By isolating features, you can often achieve cleaner, more stable, and sometimes more accurate results.

# 💻 Technical Deep-Dive / Code & Tools
While no direct code was shared in the transcript, the workflow for creating/comparing models is as follows:

```python
# Assuming X_train, X_test, y_train, y_test are already defined

# 1. Standard Linear Regression
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

lr_model = LinearRegression()
lr_model.fit(X_train, y_train)

# Check R-squared
print("LR Train R2:", r2_score(y_train, lr_model.predict(X_train)))
print("LR Test R2:", r2_score(y_test, lr_model.predict(X_test)))

# 2. Polynomial Regression (Degree 2)
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)

pr_model = LinearRegression()
pr_model.fit(X_train_poly, y_train)

print("Poly Train R2:", r2_score(y_train, pr_model.predict(X_train_poly)))
print("Poly Test R2:", r2_score(y_test, pr_model.predict(X_test_poly)))
```

# ❓ Q&A / Discussion Highlights
- **Q**: How do we know if the R² is close enough to actual test data?
- **A**: You explicitly compute the R² for both training and testing datasets. A small gap (e.g., 75% vs 66%) means it's generalizing well. If the gap is huge, you need to simplify the model or drop noisy features.

# ✅ Key Takeaways
- Look at the shape of your data: Straight lines = Linear Regression; Curves = Polynomial Regression.
- A drop in R² from Train to Test is normal; a 15% drop is considered acceptable/decent.
- Dropping uncorrelated features can simplify your model and sometimes improve performance.
- Next session will focus on local Python environments and Regularization.

# 📌 Action Items & Homework
- **Setup**: Have your laptops ready for local Python environment setup next session.
- **Assignment**: Build one Linear Regression model and one Polynomial Regression model for the next session. Aim for the highest R² possible. (See `assignment.py`)
