# DEMAND PREDICTION 

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = pd.read_csv('ev.csv')

plt.figure(figsize=(12, 6))
sns.countplot(data=data, x='State', hue='ChargePreference')
plt.title('Count Plot of Charge Preference by State')
plt.xlabel('State')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.legend(title='Charge Preference')
plt.savefig(f'./public/ai_gen_img/dp1')
# plt.show()


# Service Gap: 

plt.figure(figsize=(12, 6))
sns.countplot(data=data, x='State', hue='UserType')
plt.title('Count Plot of UserID by State')
plt.xlabel('State')
plt.ylabel('Count')
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
plt.legend(title='STATE WISE DATA')
plt.savefig(f'./public/ai_gen_img/dp2')


plt.figure(figsize=(12, 6))
sns.countplot(data=data, x='DailyDrivingDistance', hue='PreferredChargingTime')
plt.title('Count Plot of Distance and Chargetime')
plt.xlabel('Daily Distance Driven')
plt.ylabel('Preffred Charge Time')
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
plt.legend(title='DistaneToCharge')
plt.savefig(f'./public/ai_gen_img/dp3')

# People mostly travel long distance during the afternoon period and less likely during the evening
# Short distances are mostly covered during morning and less likely during evening
# And an average distance is travelled mostly in the evening and less likely in the morning

# So, the charging stations near the highways must be most active during the afternoon and in the cities during early morning