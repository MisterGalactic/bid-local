import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Item, Input, Label, Button } from 'native-base';
import { SIGN_UP } from '../queries/register';
import { useMutation } from '@apollo/client';

import { useLocalizationContext } from '../context/LocalizationContext'
import i18n from 'i18n-js';

export default function Register({ navigation }) {
  const { address, setAddress, translations, appLanguage, setAppLanguage } = useLocalizationContext()

  const [registerEmail, setRegisterEmail] = useState('');
  // const [registerFirstName, setRegisterFirstName] = useState('');
  // const [registerLastName, setRegisterLastName] = useState('');
  // const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
  // const [registerFirstLineAddress, setRegisterFirstLineAddress] = useState('');
  // const [registersecondLineAddress, setRegisterSecondLineAddress] = useState(
  //   '',
  // );
  // const [registerCity, setRegisterCity] = useState('');
  // const [registerPostcode, setRegisterPostcode] = useState('');
  // const [registerCountry, setRegisterCountry] = useState('');

  // const { token } = route.params;
  const [signUp, { data, error }] = useMutation(SIGN_UP);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('error: ', error);
    if (data && data.sign_up) {
      navigation.navigate('Login');
    }
  }, [data, error]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function backToLogin() {
    navigation.navigate('Login');
  }

  function register() {
    signUp({
      variables: {
        user: {
          email: registerEmail,
          password: 'pass',
        },
        // firstName: firstName,
        // lastName: lastName,

        // phoneNumber: phoneNumber,
        // firstLineAddress: firstLineAddress,
        // secondLineAddress: secondLineAddress,
        // city: city,
        // postcode: postcode,
        // country: country,
      },
    })
  }

  if (isLoading) {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/register.jpg')}
      />
    );
  } else {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/register.jpg')}
      >
        <View style={styles.logo}>
          <Image
            style={styles.logoPic}
            source={require('../assets/logoLogin.png')}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.title}>{i18n.t('register')}</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Item floatingLabel style={styles.labelContainer}>
            <Label style={styles.label}>{'   '}{i18n.t('email')}</Label>
            <Input
              onChangeText={(text) => setRegisterEmail(text)}
              value={registerEmail}
              style={{ color: 'black', fontFamily: 'Roboto_medium' }}
            />
          </Item>
          <Item floatingLabel last style={styles.labelContainer}>
            <Label style={styles.label}>{i18n.t('password')}</Label>
            <Input style={{ color: 'black', fontFamily: 'Roboto_medium' }} />
          </Item>
          <View>
            <Button rounded onPress={register} style={styles.button}>
              <Text
                style={{
                  fontFamily: 'Roboto_medium',
                  fontSize: 20,
                  color: 'white',
                }}
              >
                {i18n.t('register')}
              </Text>
            </Button>
          </View>
          <TouchableOpacity style={styles.register} onPress={backToLogin}>
            <Text style={styles.register}>{i18n.t('backToLogin')}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
