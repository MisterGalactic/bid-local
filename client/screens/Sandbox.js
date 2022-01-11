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
        <Text>Date:{JSON.stringify(date)}</Text>
        <Text>GetReadable:{(date).toLocaleDateString()}</Text>
        <Text>GetDay:{(date).getDate()}</Text>
        <Text>GetMonth:{(date).getMonth()}</Text>
        <Text>GetYear:{(date).getFullYear()}</Text>
        <Text>Mode:{mode}</Text>
        <Text>Show:{String(show)}</Text>
        <View style={{flexDirection: 'row'}}>
          <Button onPress={showDatepicker} title={(date).toDateString()} />
          <TouchableOpacity onPress={showDatepicker} style={show && (mode==='date') ? styles.confirmView : styles.editView}>
            <Icon type="MaterialCommunityIcons" name={show && (mode==='date') ? "check" : "square-edit-outline"} style={show && (mode==='date') ? styles.confirmIcon : styles.editIcon}/>
          </TouchableOpacity>
          {show && (mode==='date') && (
          <View style={{position: 'absolute', marginLeft: 10, marginTop: 35, borderRadius:10, backgroundColor : "green"}}>
            <Button onPress={showDatepicker} color='white' title='Confirm'/>
            <DateTimePicker
              minimumDate={Date.now()}
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="inline"
              onChange={onChange}
              style={{position: 'absolute', marginTop: 45, width: windowWidth*0.9, borderWidth: 1}}
            />
          </View>
          )}
          <Button onPress={showTimepicker} title={(date).toLocaleTimeString()} />
          <TouchableOpacity onPress={showTimepicker} style={show && (mode==='time') ? styles.confirmView : styles.editView}>
            <Icon type="MaterialCommunityIcons" name={show && (mode==='time') ? "check" : "square-edit-outline"} style={show && (mode==='date') ? styles.confirmIcon : styles.editIcon}/>
          </TouchableOpacity>
          {show && (mode==='time') && (
          <View style={{position: 'absolute', marginLeft: 10, marginTop: 35, borderRadius:10, backgroundColor : "green"}}>
            <Button onPress={showTimepicker} color='white' title='Confirm'/>
            <DateTimePicker
              minimumDate={Date.now()}
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={onChange}
              style={{position: 'absolute', marginTop: 45, width: windowWidth*0.5, borderWidth: 1}}
            />
          </View>
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
