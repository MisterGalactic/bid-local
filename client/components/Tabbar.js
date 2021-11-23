import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Tabbar({ navigation }) {
  return (
    <View style={styles.tabbar}>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Home')}}>
        <Icon name="shopping-bag" size={25} />
        <Text style={styles.mytext}>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Icon name="explore" size={25} />
        <Text style={styles.mytext}>Discover</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Icon name="launch" size={25} />
        <Text style={styles.mytext}>Button</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Icon name="shopping-cart" size={25} />
        <Text style={styles.mytext}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('UserInfo')}}>
        <Icon name="account-circle" size={25} />
        <Text style={styles.mytext}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#fff',
    height: 60,
    borderTopWidth: 2,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mytext: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 2,
    color: 'rgb(50,50,50)',
  },
});
