import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LottieView
          source={require('./../assets/lottie/flying-tree.json')}
          style={styles.logo}
          autoPlay
        />
        <Image
          source={require('./../assets/images/ThaiTravel.png')}
          style={{
            position: 'absolute',
            bottom: 150,
            width: 310,
            height: 70,
            tintColor: '#ffffff',
          }}
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          color: '#00000050',
        }}>
        Version 1.0.0
      </Text>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.8;

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
    position: 'absolute',
    marginTop: -10,
    width: height_logo,
    height: height_logo,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 50,
    position: 'absolute',
    bottom: 150,
    color: '#000000',
  },
});

export default SplashScreen;
