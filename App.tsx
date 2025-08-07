import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/screen/start';
import ChooseLanguage from './src/screen/chooseLanguage';
import Home from './src/screen/home';
import SelectPrescription from './src/screen/selectPrescription';
import ChooseRelationship from './src/screen/selectRelationship';
import BillAccount from './src/screen/billAccount';
import Bill from './src/screen/bill';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="SelectPrescription" component={SelectPrescription} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseRelationship" component={ChooseRelationship} options={{ headerShown: false }} />
        <Stack.Screen name="BillAccount" component={BillAccount} options={{ headerShown: false }} />
        <Stack.Screen name="Bill" component={Bill} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
