import React, { useState, useEffect, Component } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { Item, Input, Label, Button } from 'native-base';

export default function CreditPopup(props) {
  const { show, title, animationType, closePopup, haveOutsideTouch } = props;

  const [initialEmail, setInitialEmail] = useState('');
  const [initialMobile, setInitialMobile] = useState('');
  const [count, setCount] = useState(1);

  // const [title, setTitle] = useState('');
  // const [animationType, setAnimationType] = useState('slide');
  // const [haveOutsideTouch, setHaveOutsideTouch] = useState(false);
  const [data, setData] = useState([]);


  function onTrigger () {
    setCount( count + 1 )
    props.parentCallback(count);
  }

  function renderContent () {
    return (
      <View behavior="padding" style={styles.container}>
        {/* <Item floatingLabel style={styles.labelContainer}>
          <Label style={styles.label}>{'   '}Email</Label>
          <Input
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(text) => { setInitialEmail(text)}}
            value={initialEmail}
            style={{ color: 'black', fontFamily: 'Roboto_medium' }}
          />
        </Item>
        <Item floatingLabel style={styles.labelContainer}>
          <Label style={styles.label}>{'   '}Mobile Number</Label>
          <Input
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(text) => { setInitialMobile(text)}}
            value={initialMobile}
            style={{ color: 'black', fontFamily: 'Roboto_medium' }}
          />
        </Item> */}
        <View>
          <Text
            style={{
              fontFamily: 'Roboto_medium',
              fontSize: 20,
              color: 'black',
              textAlign: 'center',
              marginBottom: 15,
            }}
          >
            Please top up.
          </Text>
          <Button
            rounded
            onPress={
              () => closePopup(setInitialEmail(null),setInitialMobile(null),onTrigger())
            }
            style={styles.button}
          >
            <Text
              style={{
                fontFamily: 'Roboto_medium',
                fontSize: 20,
                color: 'white',
              }}
            >
              Top Up
            </Text>
          </Button>
        </View>
      </View>
    )
  }

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={show}
      onRequestClose={() => { }}
    >
      <View style={{ flex: 1, backgroundColor: '#000000AA' }}>
        <Pressable
          onPress={() => {
            if (!haveOutsideTouch) return;
            closePopup()
          }}
          style={{ flex: 1 }}>
        </Pressable>

        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={
            Platform.select({
                ios: () => 220,
                android: () => 220
            })()}
          style={{
            bottom: 0,
            position: 'absolute',
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            // height: Dimensions.get('window').height * 0.4,
            maxHeight: Dimensions.get('window').height * 0.4,
            paddingTop: 30,
          }}>
          <Text style={{
            position: 'absolute',
            alignSelf: 'center',
            color: '#182E44',
            fontSize: 20,
            fontWeight: '500',
            margin: 15,
          }}>{title}</Text>
          {
          renderContent()
          }
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );

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
    backgroundColor: 'gray',
    fontFamily: 'Roboto_medium',
    marginBottom: 20
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
