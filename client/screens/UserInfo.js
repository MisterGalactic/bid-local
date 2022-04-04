import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Navbar from '../components/Navbar';
import { GET_USER_INFO, UPDATE_USER, UPDATE_ADDRESS } from '../queries/userInfo';
import { useQuery, useMutation } from '@apollo/client';

import { useLocalizationContext } from '../context/LocalizationContext'
import i18n from 'i18n-js';

export default function UserInfo({ navigation, route }) {
  const { translations, appLanguage, setAppLanguage } = useLocalizationContext()

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    firstLineAddress: '',
    secondLineAddress: '',
    city: '',
    postcode: '',
    country: '',
    id: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState('');
  const [changeUser, changed] = useMutation(UPDATE_USER);
  const [changeUserAddress, changedAddress] = useMutation(UPDATE_ADDRESS);
  const user = useQuery(GET_USER_INFO);

  useEffect(()=>{
    console.log('address: ', address);
    console.log('user: ', user?.data?.get_user_info);
  }, [address]);

  useEffect(() => {
    if (user.data) {
      setEmail(
        user.data.get_user_info.email
          ? user.data.get_user_info.email
          : '',
      );
      setPhoneNumber(
        user.data.get_user_info.phoneNumber
          ? user.data.get_user_info.phoneNumber
          : '',
      );
      setFirstName(
        user.data.get_user_info.firstName
          ? user.data.get_user_info.firstName
          : 'not set',
      );
      setLastName(
        user.data.get_user_info.lastName
          ? user.data.get_user_info.lastName
          : 'name',
      );
      setId(
        user.data.get_user_info.id
          ? user.data.get_user_info.id
          : '',
      );
      setAddress(
        user.data.get_user_info.address
          ? {
              firstLineAddress:
                user.data.get_user_info.address.firstLineAddress,
              secondLineAddress:
                user.data.get_user_info.address.secondLineAddress,
              city: user.data.get_user_info.address.city,
              postcode: user.data.get_user_info.address.postcode,
              country: user.data.get_user_info.address.country,
              id: user.data.get_user_info.address.id
            }
          : {
              firstLineAddress: '',
              secondLineAddress: '',
              city: '',
              postcode: '',
              country: '',
              id: ''
            },
      );
      return;
    }
  }, [user]);

  useEffect(() => {
    if (changed.data) {
      setPhoneNumber(changed.data.update_user.phoneNumber);
      setEmail(changed.data.update_user.email);
      setFirstName(changed.data.update_user.firstName);
      setLastName(changed.data.update_user.lastName);
      setId(changed.data.update_user.id);
      return;
    }
  }, [changed]);

  useEffect(() => {
    if (changedAddress.data) {
      setAddress({
        firstLineAddress: changedAddress.data.update_address.firstLineAddress,
        secondLineAddress: changedAddress.data.update_address.secondLineAddress,
        city: changedAddress.data.update_address.city,
        postcode: changedAddress.data.update_address.postcode,
        country: changedAddress.data.update_address.country,
        id: changedAddress.data.update_address.id
      });
      return;
    }
  }, [changedAddress]);


  function toggle() {
    if (editMode) {
      const queryVariables = {
        user: {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          id: id,
          password: '$2b$10$4/OQTEhm2DI2a67Y06e.x.qloIXjQt825ckWU6GZKprV5.eqURDMi'
        },
      };
      changeUser({ variables: queryVariables });
      console.log({ variables: queryVariables })


      const queryAddressVariables = {
        AddressId: user?.data.get_user_info?.address?.id,
        address: address
      };
      changeUserAddress({ variables: queryAddressVariables })
      console.log({ variables: queryAddressVariables })


      // changeUserAddress({ variables: {
      //   AddressId: user?.data.get_user_info?.address?.id,
      //   address: address
      // } })
      // console.log({ variables: {
      //   AddressId: user?.data.get_user_info?.address?.id,
      //   address: address
      // } })


    }

    setEditMode(!editMode);
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image style={{top: '12%', alignSelf: 'center', height: '35%', width: '35%'}} source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <Navbar navigation={navigation} canGoBack={true} />
        <ScrollView style={styles.container}>
          <Text style={styles.headers}>{i18n.t('email')}:</Text>
          {editMode ? (
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => {setEmail(text)}}
              value={email}
            />
          ) : (
            <Text style={styles.displayText}>{email}</Text>
          )}
          <Text style={styles.headers}>{i18n.t('firstName')}:</Text>
          {editMode ? (
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => {setFirstName(text)}}
              value={firstName}
            />
          ) : (
            <Text style={styles.displayText}>{firstName}</Text>
          )}
          <Text style={styles.headers}>{i18n.t('lastName')}:</Text>
          {editMode ? (
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => {setLastName(text)}}
              value={lastName}
            />
          ) : (
            <Text style={styles.displayText}>{lastName}</Text>
          )}
          <Text style={styles.headers}>{i18n.t('phoneNumber')}:</Text>
          {editMode ? (
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
            />
          ) : (
            <Text style={styles.displayText}>{phoneNumber}</Text>
          )}
          <Text style={styles.headers}>{i18n.t('address1')}:</Text>
          {editMode ? (
            <>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, firstLineAddress: text }))}
                value={address.firstLineAddress}
              />
              <Text style={styles.headers}>{i18n.t('address2')}:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, secondLineAddress: text }))}
                value={address.secondLineAddress}
              />
              <Text style={styles.headers}>{i18n.t('city')}:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, city: text }))}
                value={address.city}
              />
              <Text style={styles.headers}>{i18n.t('postcode')}:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, postcode: text}))}
                value={address.postcode}
              />
              <Text style={styles.headers}>{i18n.t('country')}:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, country: text }))}
                value={address.country}
              />
            </>
          ) : (
            <>
              <Text style={styles.displayText}>{address.firstLineAddress}</Text>
              {address.secondLineAddress
                ?
                <>
                  <Text style={styles.headers}>{i18n.t('address2')}:</Text>
                  <Text style={styles.displayText}>
                    {address.secondLineAddress}
                  </Text>
                </>
                : null
              }
              <Text style={styles.headers}>{i18n.t('city')}:</Text>
              <Text style={styles.displayText}>{address.city}</Text>
              <Text style={styles.headers}>{i18n.t('postcode')}:</Text>
              <Text style={styles.displayText}>{address.postcode}</Text>
              <Text style={styles.headers}>{i18n.t('country')}:</Text>
              <Text style={styles.displayText}>{address.country}</Text>
            </>
          )}
          {editMode ? (
            <Button
              title= {i18n.t('savePress')}
              onPress={toggle}
              color="#EF476F"
            />
          ) : (
            <Button
              title= {i18n.t('editPress')}
              onPress={toggle}
              color="#0C637F"
            />
          )}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headers: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  displayText: {
    width: '100%',
    padding: 11,
    marginBottom: 10,
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  Button: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    width: '50%',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  loading: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: 'gray',
    marginTop: '60%',
    textAlign: 'center',
    marginBottom: '-40%',
    zIndex: 1,
  },
});
