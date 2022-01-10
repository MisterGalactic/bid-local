import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function Tabbar({ navigation }) {
  const [leftMargin, setLeftMargin] = useState(0);
  const route = useRoute();

  useEffect(() => {
    if (route.name === 'Discover') {
      setLeftMargin(0.2)
    } else if (route.name === 'UserWonItems') {
      setLeftMargin(0.6)
    } else if (route.name === 'Account') {
      setLeftMargin(0.8)
    }
  });

  return (
    <>
      <View style={{position: 'relative', backgroundColor: 'red', width: '20%', zIndex: 1, bottom: -5, height: 3, marginLeft: windowWidth*leftMargin,}}/>
      <View style={styles.tabbar}>
        <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Home')}}>
          <Icon color={'gray'} name="shopping-bag" size={35} />
          <Text style={styles.mytext}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Discover')}}>
          <Icon color={'gray'} name="explore" size={35} />
          <Text style={styles.mytext}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('LogoButton')}}>
          <Text style={styles.mytext}>Button</Text>
          <Image
            source={require('../assets/circle_icon.png')}
            style={styles.logoPic}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('UserWonItems')}}>
          <Icon color={'gray'} name="shopping-cart" size={35} />
          <Text style={styles.mytext}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Account')}}>
          <Icon color={'gray'} name="account-circle" size={35} />
          <Text style={styles.mytext}>Account</Text>
        </TouchableOpacity>
      </View>
    </>
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
