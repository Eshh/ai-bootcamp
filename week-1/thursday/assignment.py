import pandas as pd

mock_csv_path = "mock_sales_data.csv"
    

    
# --- Operation A: Reading Data ---
print("A. READING DATA")
df = pd.read_csv(mock_csv_path)
print("\n1. DataFrame Info:")
df.info()
print("\n2. First 5 Rows:")
print(df.head())
    
    
# --- Operation B: Filtering Data ---
print("\nB. FILTERING DATA\n")
print("1. High Value Sales (Total_Revenue > $1000):")
high_revenue_df = df[df['Total_Revenue'] > 1000]
print(f"(Found {len(high_revenue_df)} transactions over $1000)")
    
    
# --- Operation C: Sorting ---
print("\nC. SORTING DATA\n")
print("1. Top 5 transactions by Total Revenue:")
sorted_df = df.sort_values(by="Total_Revenue", ascending=False)
print(sorted_df.head())
    
   
print(df)
