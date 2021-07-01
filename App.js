import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import RootStackAuth from './screens/auth/RootStackScreen';
import RootStacksPage from './screens/pages/RootStacksScreen';
import SplashScreen from './screens/SplashScreen';
import DisconnectScreen from './screens/DisconnectScreen';

function App() {
  const initialLoginState = {
    isConnected: false,
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const backgroundColor = '';

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isConnected: action.isConnected,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        dispatch({type: 'REGISTER'});
      },
    }),
    [],
  );

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setTimeout(async () => {
        let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: 'RETRIEVE_TOKEN',
          token: userToken,
          isConnected: state.isConnected,
        });
      }, 1000);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: loginState.userToken !== null ? '#ffffff' : '#009387',
      }}>
      <StatusBar
        backgroundColor={loginState.userToken !== null ? '#ffffff' : '#009387'}
        barStyle="light-content"
      />
      {loginState.isLoading && !loginState.isConnected ? (
        <SplashScreen />
      ) : !loginState.isLoading && !loginState.isConnected ? (
        <Text>Disconnected</Text>
      ) : (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            {loginState.userToken !== null ? (
              <RootStacksPage />
            ) : (
              <RootStackAuth />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      )}
    </View>
  );
}

export default App;
