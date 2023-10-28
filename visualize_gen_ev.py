import pandas as pd
import matplotlib.pyplot as plt
def count_attributes(data, columns):
    counts = {col: {} for col in columns}
    for col in columns:
        counts[col] = {val: len(data[data[col] == val]) for val in data[col].unique()}
    return counts
df = pd.read_csv('ev.csv')
columns = df.columns.tolist()
results = count_attributes(df, columns)
i=0
for col, counts in results.items():
    labels = counts.keys()
    sizes = counts.values()
    plt.figure(figsize=(8, 8))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%')
    plt.title(f'Counts for {col}')
    plt.axis('equal')
    plt.savefig(f'./public/ai_gen_img/{i}')
    i+=1
    # plt.show()
