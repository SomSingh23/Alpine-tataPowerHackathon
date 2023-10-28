# SpatialMapping
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = pd.read_csv('ev.csv')

plt.figure(figsize=(12, 6))
sns.countplot(data=data, x='UserType', hue='State')
plt.title('Count Plot UserType and State')
plt.xlabel('UserType')
plt.ylabel('State')
plt.xticks(rotation=45)
plt.legend(title='UservsState')
plt.savefig('./public/ai_gen_img/map')

