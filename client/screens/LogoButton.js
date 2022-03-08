import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
  SafeAreaView,
  RefreshControl,
  TextInput
} from 'react-native';
import { Icon, Button } from "native-base";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Tabbar from '../components/Tabbar';
import { GET_USER_INFO } from '../queries/userInfo';
import { useQuery, useMutation } from '@apollo/client';

const windowWidth = Dimensions.get('window').width;

export default function LogoButton({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');
  const [credit, setCredit] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [exist, setExist] = useState(false);
  const user = useQuery(GET_USER_INFO);

  useEffect(() => {
    if (user.data) {
      setEmail(user.data.get_user_info.email);
      setCredit(user.data.get_user_info.credit);
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
      setID(user.data.get_user_info.id);
      console.log(user.data.get_user_info)
      return;
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkURL(`https://api.qrserver.com/v1/create-qr-code/?data=${id}`)
      .then(() => {
        setExist({ exist: true });
      })
      .catch(err => {
        setExist({ exist: false });
      })
    }
  )

  async function checkURL(url) {
    return fetch(url, { method: "HEAD" });
  }

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/login-background-keyboard.jpg')}
    >
      <Image
        style={styles.logoPic}
        source={require('../assets/circle_icon.png')}
      />
      <View style={styles.homeContent}>
        <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: 320, height: 320}}>
          <Image
              style={styles.qrCode}
              source={ exist ? {uri: `https://api.qrserver.com/v1/create-qr-code/?data=${id}`} : require('../assets/ecommerce.gif') }
          />
        </View>
        <Text style={styles.title}>{lastName} {firstName}</Text>
        <Text style={styles.title}>Credit: {credit} HKD</Text>
      </View>
      <Button style={{alignSelf: 'center'}} transparent onPress={()=>{navigation.goBack()}}>
        <Text style={styles.navIcon}>✕</Text>
      </Button>
      {/* <Tabbar navigation={navigation} canGoBack={false}/> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  logoPic: {
    flex: 0,
    width: windowWidth*0.25,
    height: windowWidth*0.25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '13%',
  },
  qrCode: {
    width: '75%',
    resizeMode: 'contain',
    width: 250,
    height: 250,
    zIndex: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto_medium',
    fontSize: 30,
    color: 'orange',
    marginTop: '5%',
    marginBottom: '5%',
  },
  categoryTitle: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: 'Roboto_medium',
  },
  homeContent: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Roboto_medium',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    fontFamily: 'Roboto_medium',
  },
  itemView: {
    width: (windowWidth - 45) / 2,
    marginBottom: 15,
    fontFamily: 'Roboto_medium',
  },
  itemImage: {
    width: '100%',
    height: (windowWidth - 45) / 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontFamily: 'Roboto_medium',
  },
  itemTime: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#0C637F88',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_medium',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Roboto_medium',
  },
  loading: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: '#67A036',
    marginTop: '60%',
    textAlign: 'center',
    marginBottom: '-40%',
    zIndex: 1,
  },
  error: {
    fontFamily: 'Roboto_medium',
    fontSize: 25,
    color: '#67A036',
    textAlign: 'center',
    marginBottom: 1000,
  },
  navIcon: {
    // position: "absolute",
    height: 50,
    width: 50,
    color: '#383838',
    fontSize: 40,
    paddingTop: '1%',
    textAlign: 'center',
    borderRadius: 50/2,
    borderWidth: 1.5,
    borderColor: '#383838',
    marginBottom: '20%'
  },
});
