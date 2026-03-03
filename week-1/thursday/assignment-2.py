import os
import pandas as pd
from datetime import datetime

files = [
    "assignment-2.py",
    "assignment.py"
]

series_list = []

for file in files:

    file_name = os.path.basename(file)

    created_ts = os.path.getctime(file)
    created_time = datetime.fromtimestamp(created_ts)

    file_series = pd.Series({
        "file_name": file_name,
        "created_time": created_time
    })

    series_list.append(file_series)

final_df = pd.DataFrame(series_list)

print(type(final_df))
print(final_df)