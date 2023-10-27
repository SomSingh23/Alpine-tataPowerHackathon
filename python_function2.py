import pandas as pd;
from itertools import count
df=pd.read_csv('T4.csv')
# Define charge preference categories
charge_preferences = {
    'Eco-friendly': 0,
    'Slow charge': 0,
    'Fast charge': 0,
}
# charge_preferences = {i:0 for i in df['ChargePreference']}
# charge_preferences
# Ev_Model = {i:0 for i in df['Ev_Model']}
# Define user types
user_types={i:0 for i in df['UserType']}
ev_model={i:0 for i in df['EV_Model']}
Battery_Capacity={i:0 for i in df['BatteryCapacity']}
Daily_Driving_Distance={i:0 for i in df['DailyDrivingDistance']}
Preferred_Charging_Time={i:0 for i in df['PreferredChargingTime']}
Payment_Method={i:0 for i in df['PaymentMethod']}
bank={i:0 for i in df['Bank']}
state={i:0 for i in df['State']}
# Create a list to store results for all users
results = []
# Iterate through each user's data
for i in range(1, 6):
    user_data = df[df['UserID'] == i]
    # Count charge preferences and user types for the current user
    for preference in user_data['ChargePreference']:
        if preference in charge_preferences:
            charge_preferences[preference] += 1
    for usertype in user_data['UserType']:
        if(usertype in user_types):
            user_types[usertype]+=1
    for evmodel in user_data['EV_Model']:
        if(evmodel in ev_model):
            ev_model[evmodel]+=1
    for battercapacity in user_data['BatteryCapacity']:
        if(battercapacity in Battery_Capacity):
            Battery_Capacity[battercapacity]+=1
    for dailydist in user_data['DailyDrivingDistance']:
        if(dailydist in Daily_Driving_Distance):
            Daily_Driving_Distance[dailydist]+=1
    for preftime in user_data['PreferredChargingTime']:
        if(preftime in Preferred_Charging_Time):
            Preferred_Charging_Time[preftime]+=1
    for paymethod in user_data['PaymentMethod']:
        if(paymethod in Payment_Method):
            Payment_Method[paymethod]+=1
    for bnk in user_data['Bank']:
        if(bnk in bank):
            bank[bnk]+=1
    for st in user_data['State']:
        if(st in state):
            state[st]+=1

    # Store the results for the current user in a dictionary
    user_results = {
        'UserID': i,
        'ChargePreferences': charge_preferences.copy(),  # Create a copy to avoid overwriting
        'UserType': user_types.copy(),  # Create a copy of user types
        'EV_Model': ev_model.copy(),
        'BatteryCapacity': Battery_Capacity.copy(),
        'DailyDrivingDistance':Daily_Driving_Distance.copy(),
        'PreferredChargingTime': Preferred_Charging_Time.copy(),
        'PaymentMethod': Payment_Method.copy(),
        'Bank': bank.copy(),
        'State': state.copy(),
    }
    results.append(user_results)

def find_max_label(dictionary):
    return max(dictionary, key=dictionary.get)
behaviours=[]

for user_data in results:
    charge_preferences_max = find_max_label(user_data["ChargePreferences"])
    user_type_max = find_max_label(user_data["UserType"])
    ev_model_max = find_max_label(user_data["EV_Model"])
    Battery_Capacity_max= find_max_label(user_data["BatteryCapacity"])
    Daily_Driving_Distance_max= find_max_label(user_data["DailyDrivingDistance"])
    Preferred_Charging_Time_max= find_max_label(user_data["PreferredChargingTime"])
    Payment_Method_max=find_max_label(user_data["PaymentMethod"])
    bank_max=find_max_label(user_data["Bank"])
    state_max=find_max_label(user_data["State"])
    
    
    behaviour = {
        "UserID": user_data["UserID"],
        "ChargePreferences": charge_preferences_max,
        "UserType": user_type_max,
        "EVModel": ev_model_max,
        'BatteryCapacity': Battery_Capacity_max,
        'DailyDrivingDistance':Daily_Driving_Distance_max,
        'PreferredChargingTime': Preferred_Charging_Time_max,
        'PaymentMethod': Payment_Method_max,
        'Bank': bank_max,
        'State': state_max,
    }
    
    behaviours.append(behaviour)
# behaviours
# import json
# send_json = json.dumps(behaviours, indent=4)

# with open('new_Data1.json', 'w') as json_file:
#     json_file.write(send_json)
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load your dataset into a Pandas DataFrame (replace 'your_dataset.csv' with your actual dataset file)
df = pd.read_csv('T4.csv')

# Select input features and output target
input_features = ['DailyDrivingDistance', 'BatteryCapacity']
output_target = 'ChargePreference'

# Subset the data with the selected columns
data = df[input_features + [output_target]]

# Use LabelEncoder to encode the output target
le = LabelEncoder()
data[output_target] = le.fit_transform(data[output_target])

# Split the data into training and testing sets
X = data[input_features]
y = data[output_target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a decision tree classifier
model = DecisionTreeClassifier()

# Train the model on the training data
model.fit(X_train, y_train)

# Evaluate the model on the testing data
accuracy = model.score(X_test, y_test)
# print("Accuracy:", accuracy)

# prediction = model.predict(new_data)
# decoded_prediction = le.inverse_transform(prediction)
param=2
for i in behaviours:
   if(i['UserID']==int(param)):
       new_data = pd.DataFrame({'DailyDrivingDistance':[i['DailyDrivingDistance']], 'BatteryCapacity': [i['BatteryCapacity']]})
       prediction = model.predict(new_data)
       decoded_prediction = le.inverse_transform(prediction)
       suggested=decoded_prediction
JSONFORMAT={
    "title":"Recommendation for Charging Preference",
    "Answer": f"According to your behaviour, you are suggested to use {suggested} ",
}
#behaviours
print(JSONFORMAT)