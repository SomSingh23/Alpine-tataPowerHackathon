import pandas as pd
def your_data_mining_function(param1):
        df = pd.read_csv('ev.csv')
        columns = ['ChargePreference', 'UserType', 'EV_Model', 'BatteryCapacity', 'DailyDrivingDistance', 'PreferredChargingTime', 'PaymentMethod', 'Bank', 'State']

        # Define categories as dictionaries
        charge_preferences = {i: 0 for i in df['ChargePreference']}
        user_types = {i: 0 for i in df['UserType']}
        ev_model = {i: 0 for i in df['EV_Model']}
        Battery_Capacity = {i: 0 for i in df['BatteryCapacity']}
        Daily_Driving_Distance = {i: 0 for i in df['DailyDrivingDistance']}
        Preferred_Charging_Time = {i: 0 for i in df['PreferredChargingTime']}
        Payment_Method = {i: 0 for i in df['PaymentMethod']}
        bank = {i: 0 for i in df['Bank']}
        state = {i: 0 for i in df['State']}

        # List to store results for all users
        results = []

        # Iterate through each user's data
        for i in range(1, 6):
            user_data = df[df['UserID'] == i]
            for preference in user_data['ChargePreference']:
                if preference in charge_preferences:
                    charge_preferences[preference] += 1
            for usertype in user_data['UserType']:
                if usertype in user_types:
                    user_types[usertype] += 1
            for evmodel in user_data['EV_Model']:
                if evmodel in ev_model:
                    ev_model[evmodel] += 1
            for battercapacity in user_data['BatteryCapacity']:
                if battercapacity in Battery_Capacity:
                    Battery_Capacity[battercapacity] += 1
            for dailydist in user_data['DailyDrivingDistance']:
                if dailydist in Daily_Driving_Distance:
                    Daily_Driving_Distance[dailydist] += 1
            for preftime in user_data['PreferredChargingTime']:
                if preftime in Preferred_Charging_Time:
                    Preferred_Charging_Time[preftime] += 1
            for paymethod in user_data['PaymentMethod']:
                if paymethod in Payment_Method:
                    Payment_Method[paymethod] += 1
            for bnk in user_data['Bank']:
                if bnk in bank:
                    bank[bnk] += 1
            for st in user_data['State']:
                if st in state:
                    state[st] += 1

            # Store the results for the current user in a dictionary
            user_results = {
                'UserID': i,
                'ChargePreferences': charge_preferences.copy(),
                'UserType': user_types.copy(),
                'EV_Model': ev_model.copy(),
                'BatteryCapacity': Battery_Capacity.copy(),
                'DailyDrivingDistance': Daily_Driving_Distance.copy(),
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
        # print(behaviours)
        # print(param1)
        filtered_data = [item for item in behaviours if item['UserID'] == int(param1)]
        # Check if any item matches the condition
        if filtered_data:
            return filtered_data[0]  # Return the first matching item
        return ["NO DATA"]
data = your_data_mining_function(1)
print(data)