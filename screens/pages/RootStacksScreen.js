import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PinScreen from './PinScreen';
import NavigationPage from './NavigationScreen';
const Stack = createStackNavigator();

const RootStacksScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="NavigationPage"
        component={NavigationPage}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootStacksScreen;
