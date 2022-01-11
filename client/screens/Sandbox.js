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
  Platform
} from 'react-native';
import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';
import FeatureCard from '../components/FeatureCard';

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
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    console.log(date)
  });

  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView style={styles.container}>
        <Text>Date:{JSON.stringify(date)}</Text>
        <Text>GetDay:{(date).getDay()}</Text>
        <Text>GetMonth:{(date).getMonth()}</Text>
        <Text>GetYear:{(date).getYear()}</Text>
        <Text>Mode:{mode}</Text>
        <Text>Show:{show}</Text>
        <View>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          {show && (
            <>
              <DateTimePicker
                minimumDate={Date.now()}
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
              <DateTimePicker
                minimumDate={Date.now()}
                testID="dateTimePicker"
                value={date}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            </>
          )}
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
    alignItems: 'center',
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
});
