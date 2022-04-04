import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useLocalizationContext } from '../context/LocalizationContext'
import Navbar from '../components/Navbar';
import i18n from 'i18n-js';

export default function Language({ navigation }) {
  const { address, setAddress, translations, appLanguage, setAppLanguage } = useLocalizationContext()


  const handleSetLanguage = async language => {
    setAppLanguage(language);
  };

  useEffect(() => {
    console.log("the trans", translations)
  }, [])

  return (
    <>

    <Navbar navigation={navigation} canGoBack={true} />
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <Text style={{marginTop: 20, fontSize: 20, textAlign: 'center'}}>
        {i18n.t('changeLanguage')}
      </Text>
      {/* {translations.getAvailableLanguages().map(item => (
        <View key={item}>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => handleSetLanguage(item)}>
            <Text style={{fontSize: 16}}>{item}</Text>
            {appLanguage === item ? (
              <Text style={{marginLeft: 30}}>√</Text>`
            ) : null}
          </TouchableOpacity>
        </View>
      ))} */}


      {/* <View>
        <TouchableOpacity
          style={{
            paddingVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => console.log('clocked')}>
          <Text style={{fontSize: 16}}>item {address}</Text>
          <Text style={{marginLeft: 30}}>√</Text>
        </TouchableOpacity>
      </View> */}



        <View>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => handleSetLanguage('zh')}>
            <Text style={{fontSize: 16}}>{i18n.t('chinese')}</Text>
            {appLanguage === 'zh' ? (
              <Text style={{marginLeft: 30}}>√</Text>
            ) : null}
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => handleSetLanguage('en')}>
            <Text style={{fontSize: 16}}>{i18n.t('english')}</Text>
            {appLanguage === 'en' ? (
              <Text style={{marginLeft: 30}}>√</Text>
            ) : null}
          </TouchableOpacity>
        </View>

    </View>
    </>
  );
};