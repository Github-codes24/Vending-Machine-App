import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Start from '../screen/start';
import ChooseLanguage from '../screen/chooseLanguage';
import Home from '../screen/home';
import SelectPrescription from '../screen/selectPrescription';
import BillAccount from '../screen/billAccount';
import MedicineDispatched from '../screen/medicineDispatched';
import CollectMedicine from '../screen/collectMedicine';
import Bill from '../screen/bill';
import SelectRelationship from '../screen/selectRelationship';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Start"
        component={Start}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseLanguage"
        component={ChooseLanguage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectPrescription"
        component={SelectPrescription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectRelationship"
        component={SelectRelationship}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BillAccount"
        component={BillAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MedicineDispatched"
        component={MedicineDispatched}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectMedicine"
        component={CollectMedicine}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bill"
        component={Bill}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
