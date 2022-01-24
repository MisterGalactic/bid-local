import React, { useRef, useEffect, useState, useCallback } from 'react';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  Button,
  Pressable,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Header, Left, Right, Body, Icon } from "native-base";
import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';
import FeatureCard from '../components/FeatureCard';
import Editor from '../components/Editor';

const windowWidth = Dimensions.get('window').width;


export default function Sandbox({ navigation }) {

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView style={styles.container}>

        <Editor/>


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
    alignItems: 'center',
  },
  sidebarItem: {
    borderBottomColor: 'white'
  },
  sidebarIcon: {
    color: 'gray',
    marginRight: 10,
  },
  sidebarText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: "500",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 0,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  editView: {
    height: 25,
    width: 25,
    color: 'white',
    borderRadius: 6,
    backgroundColor: 'blue',
    borderColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editIcon: {
    color: 'white',
    fontSize: 25,
  },
  confirmView: {
    height: 25,
    width: 25,
    color: 'white',
    borderRadius: 6,
    backgroundColor: 'green',
    borderColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmIcon: {
    color: 'white',
    fontSize: 25,
  }
});
