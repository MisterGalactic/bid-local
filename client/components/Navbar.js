import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Header, Button, Left, Right, Body, Icon } from "native-base";
import { StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Text } from 'react-native';
import SideBar from './SideBar';

export default function Navbar({navigation, canGoBack, targetScreen}) {
  const [hideSide, setHideSide] = useState(true);

  return (
    <>
    <Header style={{height: 35, backgroundColor: '#ffffff'}}>
    <StatusBar backgroundColor='#ffffff'/>
      <Left style={{flex: 1}}>
        {canGoBack
          ?
          <Button transparent onPress={targetScreen ? ()=>{navigation.navigate('Discover'),setTimeout(() => navigation.navigate(targetScreen), 300)} : ()=>{navigation.goBack()} }>
            {/* <ImageBackground source={require('../assets/arrow.png')} style={styles.arrow} resizeMode='contain'/> */}
            <Icon type="MaterialCommunityIcons" name="less-than" style={styles.navIcon}/>
          </Button>
          :
          null
        }
      </Left>
      <Body style={styles.logoContainer}>
        <ImageBackground source={require('../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
      </Body>
      <Right style={{flex: 1}}>
        {/* <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Sandbox')}}>
          <Icon type="MaterialCommunityIcons" name="radioactive" style={styles.navIcon}/>
        </TouchableOpacity> */}
        {/* <Button transparent onPress={() => {setHideSide(hide => !hide)}}>
          <ImageBackground source={require('../assets/burger.png')} style={styles.burger} resizeMode='contain'/>
        </Button> */}
      </Right>
    </Header>
    <SideBar navigation={navigation} hideSide={hideSide} setHideSide={setHideSide}/>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    height: 40,
    width: 30,
    backgroundColor: 'red'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '3%',
  },
  logo: {
    height: 30,
    width: 170
  },
  burger: {
    height: 40,
    width: 45,
  },
  navIcon: {
    // position: "absolute",
    height: 30,
    width: 30,
    color: '#383838',
    fontSize: 24,
    marginLeft: 10,
    borderRadius: 30/2,
    borderWidth: 1.5,
    borderColor: '#383838',
    marginBottom: '10%',
  },
});
