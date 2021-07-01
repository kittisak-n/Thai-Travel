import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function RootStackScreen() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{cardStyleInterpolator: forFade}}
      />
    </Stack.Navigator>
  );
}

export default RootStackScreen;
