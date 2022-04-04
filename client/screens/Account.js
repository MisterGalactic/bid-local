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
import { useLocalizationContext } from '../context/LocalizationContext'
import i18n from 'i18n-js';

const windowWidth = Dimensions.get('window').width;

export default function Cart({ navigation, hideSide }) {
  const { address, setAddress, translations, appLanguage, setAppLanguage } = useLocalizationContext()

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
          <List>
            <ListItem onPress={()=>{navigation.navigate('Home')}}>
              <Icon type="MaterialCommunityIcons" name="home" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('home')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('UserInfo')}}>
              <Icon type="MaterialCommunityIcons" name="account" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('myDetails')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('UserHistory')}}>
              <Icon type="MaterialCommunityIcons" name="history" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('biddingHistory')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('UserWonItems')}}>
              <Icon type="MaterialCommunityIcons" name="crown" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('wonItems')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('UsersItems')}}>
              <Icon type="MaterialCommunityIcons" name="format-list-bulleted-square" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('userItems')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('PaymentScreen')}}>
              <Icon type="MaterialCommunityIcons" name="credit-card-plus-outline" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('buyCredits')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('AddItem')}}>
              <Icon type="MaterialCommunityIcons" name="plus" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('addItems')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('AddPost')}}>
              <Icon type="MaterialCommunityIcons" name="plus" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('addBlog')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('Language')}}>
              <Icon type="MaterialCommunityIcons" name="earth" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('changeLanguage')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('Login')}}>
              <Icon type="MaterialCommunityIcons" name="logout" style={styles.sidebarIcon}/>
              <Text style={styles.sidebarText}>{i18n.t('logout')}</Text>
              <Icon type="MaterialCommunityIcons" name="greater-than" style={styles.navIcon}/>
            </ListItem>
          </List>
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
    color: '#383838',
    fontWeight: "500",
  },
});
