import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Item, Input, Label, Button } from 'native-base';
import { GET_USER_BY_EMAIL } from '../queries/login';
import { useLazyQuery } from '@apollo/client';

export default function Login({ navigation, route }) {
  const [initialEmail, setInitialEmail] = useState('');
  const { email, id } = route.params;
  const [getID, { data }] = useLazyQuery(GET_USER_BY_EMAIL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && data.get_user_by_email) {
      id.current = data.get_user_by_email.id;
      email.current = data.get_user_by_email.email;
      navigation.navigate('Home');
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function login() {
    getID({ variables: { email: initialEmail } });
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
            source={require('../assets/logo.png')}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={styles.container}>
          <Item floatingLabel style={styles.labelContainer}>
            <Label style={styles.label}>Email</Label>
            <Input
              onChangeText={(text) => setInitialEmail(text)}
              value={initialEmail}
              style={{ color: 'white', fontFamily: 'Roboto_medium' }}
            />
          </Item>
          <Item floatingLabel last style={styles.labelContainer}>
            <Label style={styles.label}>Password</Label>
            <Input style={{ color: 'white', fontFamily: 'Roboto_medium' }} />
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
                Login
              </Text>
            </Button>
          </View>
        </View>
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
    backgroundColor: '#118AB2',
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
    width: '50%',
    resizeMode: 'contain',
  },
  label: {
    fontFamily: 'Roboto_medium',
    color: 'white',
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
    color: 'white',
    marginBottom: '5%',
  },
});
