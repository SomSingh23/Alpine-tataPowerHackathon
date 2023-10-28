# DEMAND PREDICTION AND SERVICE GAP IDENTIFICATION

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load your dataset
data = pd.read_csv('ev.csv')

# Create the count plot
plt.figure(figsize=(12, 6))
sns.countplot(data=data, x='State', hue='ChargePreference')
plt.title('Count Plot of Charge Preference by State')
plt.xlabel('State')
plt.ylabel('Count')
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
plt.legend(title='Charge Preference')
plt.savefig(f'./public/ai_gen_img/dp1')
# plt.show()


# Service Gap: 
# Places where eco friendly is less i.e. WB, Karnataka - 2 reasons possible ek toh yaa to hamare service centre kam h yaa logo mein jo eco friendly waali jaankari nhi h toh campaign chalao, aur service centre kam h toh vahan kholna padega company ko

# Demand Prediction - Delhi aur TN mein eco friendly ki demand high h toh aage bhi hogi.

# Note: Demand high ho sakti h par yeh nhi pta ki vaha pe sufficient charging stations h yaa nhi. Agar nhi h toh lagao fir.
# DEMAND PREDICTION AND SERVICE GAP IDENTIFICATION




# Service Gap: 
# Places where eco friendly is less i.e. WB, Karnataka - 2 reasons possible ek toh yaa to hamare service centre kam h yaa logo mein jo eco friendly waali jaankari nhi h toh campaign chalao, aur service centre kam h toh vahan kholna padega company ko

# Demand Prediction - Delhi aur TN mein eco friendly ki demand high h toh aage bhi hogi.

# Note: Demand high ho sakti h par yeh nhi pta ki vaha pe sufficient charging stations h yaa nhi. Agar nhi h toh lagao fir.
