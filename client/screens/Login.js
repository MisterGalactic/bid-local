import React, { useState, useEffect } from 'react';
import BottomPopup from '../components/BottomPopup';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Item, Input, Label, Button } from 'native-base';
import { SIGN_IN } from '../queries/login';
import { useMutation } from '@apollo/client';

import { useLocalizationContext } from '../context/LocalizationContext'
import i18n from 'i18n-js';

export default function Login({ navigation, route }) {
  const { address, setAddress, translations, appLanguage, setAppLanguage } = useLocalizationContext()

  const [initialEmail, setInitialEmail] = useState('');
  const [childData, setChild] = useState(1);
  const { token } = route.params;
  const [signIn, { data, error }] = useMutation(SIGN_IN);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  let clickedSubmit = false;

  useEffect(() => {
    console.log('error: ', error);
    if (data && data.sign_in) {
      console.log(data);
      token.current = data.sign_in.token;
      navigation.navigate('Home');
    }
  }, [data, error]);

  useEffect(() => {
    setIsLoading(false);
    console.log(`clickedSubmit`,clickedSubmit)
  }, []);

  function handleCallback(fromChild) {
    clickedSubmit = true
    setChild(fromChild+1)
    console.log ('clickedSubmit',clickedSubmit)
    console.log(`fromChild`, fromChild)
    console.log(`childData`, childData)
    if (childData>2) {
      setTimeout(() => Alert.alert(`You have submitted too many requests. Please try again later. Requests: ${childData}`), 600);
    } else {
      setTimeout(() => Alert.alert(`Please wait for 5 to 10 minutes. The password reset form will be sent directly to your email.`), 600);
    }
  }

  function login() {
    signIn({ variables: { email: initialEmail, password: password } });
  }

  function close() {
    setIsShow(false)
  }

  function register() {
    navigation.navigate('Register');
  }


  if (isLoading) {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/login-background-keyboard.jpg')}
      />
    );
  } else {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/login-background-keyboard.jpg')}
      >
        <View style={styles.logo}>
          <Image
            style={styles.logoPic}
            source={require('../assets/logoLogin.png')}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.title}>{i18n.t('signIn')}</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Item floatingLabel style={styles.labelContainer}>
            <Label style={styles.label}>{'   '}{i18n.t('email')}</Label>
            <Input
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={(text) => setInitialEmail(text)}
              value={initialEmail}
              style={{ color: 'black', fontFamily: 'Roboto_medium' }}
            />
          </Item>
          <Item floatingLabel style={styles.labelContainer}>
            <Label style={styles.label}>{'   '}{i18n.t('password')}</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize='none'
              onChangeText={(text) => setPassword(text)}
              value ={password}
              style={{ color: 'black', fontFamily: 'Roboto_medium' }}/>
          </Item>
          <View>
            <Button rounded onPress={login} style={styles.button}>
              <Text
                style={{
                  fontFamily: 'Roboto_medium',
                  fontSize: 20,
                  color: 'white',
                }}
              >
                {i18n.t('login')}
              </Text>
            </Button>
          </View>
          <TouchableOpacity style={styles.register} onPress={register}>
            <Text style={styles.register}>{i18n.t('notSignUp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.register}
            onPress={() => {
              setIsShow(!isShow);
            }}
          >
            <Text style={styles.register}>{i18n.t('forgotPassword')}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <BottomPopup
          show={isShow}
          title={`Password Reset`}
          animationType={"fade"}
          closePopup={close}
          haveOutsideTouch={true}
          parentCallback={handleCallback}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  headers: {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding: 10,
    marginBottom: 10,
    height: 60,
  },
  button: {
    justifyContent: 'center',
    padding: 16,
    alignSelf: 'center',
    width: '40%',
    marginTop: 30,
    backgroundColor: 'gray',
    fontFamily: 'Roboto_medium',
  },
  logo: {
    marginBottom: '5%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoPic: {
    width: '100%',
    resizeMode: 'cover',
  },
  label: {
    fontFamily: 'Roboto_medium',
    color: 'black',
  },
  labelContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto_medium',
    fontSize: 30,
    color: 'black',
    marginBottom: '5%',
  },
  register: {
    marginTop: '5%',
    alignItems: 'center',
    color: 'gray',
    fontFamily: 'Roboto_medium',
    fontFamily: 'Roboto_medium',
  },
});

