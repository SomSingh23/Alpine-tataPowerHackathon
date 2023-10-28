import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load your dataset
data = pd.read_csv('ev.csv')

# Create the count plot
plt.figure(figsize=(12, 6))
sns.countplot(data=data, x='Bank', hue='PaymentMethod')
plt.title('Count Plot of Bank by PaymentMethod')
plt.xlabel('Bank')
plt.ylabel('PaymentMethod')
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
plt.legend(title='CostEff')
plt.savefig(f'././public/ai_gen_img/cost1')
# plt.show()

plt.figure(figsize=(12, 6))
sns.countplot(data=data, x='UserType', hue='PaymentMethod')
plt.title('Count Plot of Bank by PaymentMethod')
plt.xlabel('UserType')
plt.ylabel('PaymentMethod')
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
plt.legend(title='CostEff')
plt.savefig(f'./public/ai_gen_img/cost2')
# plt.show()

# A=["The most popular payment method is 'Mobilepayment' with a total count of 2,408 transactions. Among the given payment methods ('Mobilepayment,' 'Creditcard,' and 'Monthlybill'), 'Mobilepayment' has the highest transaction count. The bank 'ICICIBank' is the most frequently used among the provided options, with a total count of 1,308 transactions. It has the highest transaction count among 'Citibank,' 'HSBC,' 'ICICIBank,' and 'StateBankofIndia.' Business Idea: The company can tie up or collaborate with less frequently used banks and give offer for using those bank payment methods Add offers on mobile payment to increase more sales of tata power as a company","Business users mostly prefer Mobile Payment and less likely to prefer Credit Card for charging payment Individual users mostly prefer Credit Card and less likely to prefer Mobile Payment for charging payment Home Charging users mostly prefer Monthly bill and less likely to prefer Credit Card for charging payment So overall Credit Card is least preferred for charging payment"]
