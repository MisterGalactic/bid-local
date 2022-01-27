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
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Header, Left, Right, Body, Icon } from "native-base";
import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';
import FeatureCard from '../components/FeatureCard';
import Editor from '../components/Editor';

import HTMLView from "react-native-htmlview";

const windowWidth = Dimensions.get('window').width;


export default function Sandbox({ navigation }) {
  const [description, setDescription] = React.useState('');
  // const [childData, setChild] = useState(1);

  function handleCallback(text) {
    setDescription(text)
  }


  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView style={styles.container}>

        <HTMLView value={description} stylesheet={styles} />
        <Text style={{ marginTop: 15 }}>Description:{description}</Text>
        <TextInput
          style={styles.textBoxes}
          onChangeText={(text) => setDescription(text)}
        />
        <Editor parentCallback={handleCallback} />


      </ScrollView>
      <Tabbar navigation={navigation} canGoBack={false}/>
    </>
  );
}

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "Cochin",
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
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
