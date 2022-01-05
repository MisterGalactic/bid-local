import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Tabbar({ navigation }) {
  return (
    <View style={styles.tabbar}>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Home')}}>
        <Icon name="shopping-bag" size={35} />
        <Text style={styles.mytext}>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Discover')}}>
        <Icon name="explore" size={35} />
        <Text style={styles.mytext}>Discover</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('LogoButton')}}>
        <Text style={styles.mytext}>Button</Text>
        <Image
          source={require('../assets/circle_icon.png')}
          style={styles.logoPic}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Cart')}}>
        <Icon name="shopping-cart" size={35} />
        <Text style={styles.mytext}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Account')}}>
        <Icon name="account-circle" size={35} />
        <Text style={styles.mytext}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#fff',
    height: 80,
    borderTopWidth: 2,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5
  },
  mytext: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 2,
    color: 'rgb(50,50,50)',
  },
  logoPic: {
    position: 'absolute',
    bottom: '35%',
    width: 70,
    height: 70,
    resizeMode: 'cover',
  }
});
