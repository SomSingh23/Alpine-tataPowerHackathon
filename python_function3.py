import pandas as pd;
from itertools import count
df=pd.read_csv('ev.csv')
# Define charge preference categories
charge_preferences = {i:0 for i in df['ChargePreference']}
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

user_data = df
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
        'UserID': 'GENERALIZED',
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
user_results
