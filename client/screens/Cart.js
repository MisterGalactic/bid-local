import React, { useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import { List, ListItem, Icon } from "native-base";
import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';

const windowWidth = Dimensions.get('window').width;

export default function Cart({ navigation, hideSide }) {

  const fadeAnim = useRef(new Animated.Value(300)).current

  useEffect(() => {
    if (hideSide) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }
      ).start();
    }
  }, [hideSide]);

  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView style={styles.container}>
        <View style={styles.homeContent}>

        </View>
      </ScrollView>
      <Tabbar navigation={navigation} canGoBack={false}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  homeContent: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    fontFamily: 'Roboto_medium',
  },
  sidebarItem: {
    borderBottomColor: 'white'
  },
  sidebarIcon: {
    color: 'gray',
    marginRight: 10,
  },
  navIcon: {
    position: "absolute",
    color: '#A9A9A9',
    left: "93%",
    fontSize: 20,
  },
  sidebarText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: "500",
  },
});
