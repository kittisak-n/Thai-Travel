import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import {useTheme} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();
  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      setTimeout(() => {
        state.isConnected ? navigation.navigate('SignInScreen') : '';
      }, 3000);
    });
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LottieView
          source={require('./../assets/lottie/flying-tree.json')}
          style={styles.logo}
          autoPlay
        />
        <Text
          style={[
            styles.title,
            {
              margin: 10,
              color: '#ffffff',
            },
          ]}>
          Demo App
        </Text>
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              fontSize: 18,
              color: colors.text,
            },
          ]}>
          Check Internet Connected....
        </Text>
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            color: '#00000050',
          }}>
          Version 1.0.0
        </Text>
      </Animatable.View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
