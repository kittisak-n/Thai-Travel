import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './home/RootHomeStack';
import MapScreen from './map/RootMapStack';
import SettingScreen from './setting/RootSettingStack';
import HistoryScreen from './history/RootHistoryStack';

const Tab = createBottomTabNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const NavigationPage = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          height: 55,
          borderRadius: 8,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/home.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                Home
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/map.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                Map
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/history.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                History
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.item}>
              <Image
                source={require('./../../assets/icons/settings.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#009387' : '#949494',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? '#009387' : '#949494',
                }}>
                Setting
              </Text>
            </View>
          ),
          cardStyleInterpolator: forFade,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 55,
  },
  shadow: {
    shadowColor: '#009387',
    shadowOffset: {
      width: 2,
      height: 30,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 15,
  },
  item: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavigationPage;
