import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';

import {useTheme} from 'react-native-paper';
import {AuthContext} from './../../components/context';

import Users from './../../models/users';
import LoadingOverlay from './../../components/LoadingOverlay';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isLoading: false,
  });

  const {colors} = useTheme();

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const setLoading = state => {
    setData({
      ...data,
      isLoading: state,
    });
  };

  const loginHandle = (userName, password) => {
    setLoading(true);
    setTimeout(() => {
      const foundUser = Users.filter(item => {
        return userName == item.username && password == item.password;
      });

      if (data.username.length == 0 || data.password.length == 0) {
        Alert.alert(
          'Wrong Input!',
          'Username or password field cannot be empty.',
          [{text: 'Okay'}],
        );
        setLoading(false);
        return;
      }

      if (foundUser.length == 0) {
        Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          {text: 'Okay'},
        ]);
        setLoading(false);
        return;
      }
      signIn(foundUser);
    }, 3000);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <LoadingOverlay loading={data.isLoading} />
      <View style={styles.header}>
        <LottieView
          source={require('./../../assets/lottie/flying-tree.json')}
          style={{top: -20}}
          autoPlay
        />
        <Image
          source={require('./../../assets/images/ThaiTravel.png')}
          style={{
            position: 'absolute',
            width: 200,
            bottom: 50,
            height: 50,
            tintColor: '#ffffff',
          }}
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <View
          style={{
            borderBottomWidth: 1,
            marginTop: 45,
            borderColor: '#00000050',
            width: '80%',
          }}>
          <View style={styles.action}>
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
              }}>
              <FontAwesome name="envelope" color="#00938790" size={18} />
            </View>
            <TextInput
              placeholder="Email or Phone"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#00000050',
            marginTop: 15,
            width: '80%',
          }}>
          <View style={styles.action}>
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
              }}>
              <FontAwesome name="lock" color="#00938790" size={20} />
            </View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />

            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <View
                  style={{
                    width: 40,
                    height: 30,
                    alignItems: 'center',
                  }}>
                  <Feather name="eye-off" color="grey" size={18} />
                </View>
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 30,
                    alignItems: 'center',
                  }}>
                  <Feather name="eye" color="grey" size={18} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '80%', flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity style={{position: 'absolute', right: 0}}>
            <Text style={{color: '#009387'}}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            loginHandle(data.username, data.password);
          }}
          style={[
            styles.signIn,
            {
              backgroundColor: '#009387',
              borderColor: '#009387',
              borderWidth: 1,
              marginTop: 40,
            },
          ]}>
          <Text style={styles.textSign}>Sign In</Text>
        </TouchableOpacity>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <Text style={{fontSize: 16}}>Don't have an account ?</Text>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: '#009387'}}> Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            marginTop: 15,
            marginBottom: 15,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#00938770'}} />
          <View>
            <Text
              style={{
                width: 150,
                fontSize: 12,
                textAlign: 'center',
              }}>
              Or connected using
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#00938770'}} />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={[styles.itemFacebook]}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: '#fff',
              }}
              source={require('./../../assets/icons/facebook.png')}
            />
          </View>
          <View style={[styles.itemGoogle]}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: '#fff',
              }}
              source={require('./../../assets/icons/google.png')}
            />
          </View>
          <View style={[styles.itemPhone]}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: '#fff',
              }}
              source={require('./../../assets/icons/smartphone.png')}
            />
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    height: 30,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  signIn: {
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemFacebook: {
    backgroundColor: '#0F90F3',
    width: 38,
    height: 38,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  itemGoogle: {
    backgroundColor: '#FF1744',
    width: 38,
    height: 38,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  itemPhone: {
    backgroundColor: '#009387',
    width: 38,
    height: 38,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
