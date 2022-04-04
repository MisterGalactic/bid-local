import React, { useState, createContext, useEffect } from 'react'
import { zh, en, translations, DEFAULT_LANGUAGE } from '../i18n/translations';
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Localization from 'expo-localization';
// import * as RNLocalize from 'react-native-localize';

import i18n from 'i18n-js';


const APP_LANGUAGE = 'appLanguage';

const LocalizationContext = React.createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});
const { Provider } = LocalizationContext

const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale)

  i18n.fallbacks = true;
  i18n.translations = { zh, en };
  i18n.locale = locale;

  // const [result, setResult] = useState('')

  const storageSet = async(key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch(error) {
      console.log(error);
    }
}

  const storageGet = async(key) => {
    const keys = await AsyncStorage.getAllKeys()
    const values = await AsyncStorage.multiGet(keys)
    // console.log("logginvalyes", values)
    const array = values
    const search = array.filter(values => values[0] === key)
    setResult(search[0][1])
    return search[0][1]

    // try {
    //      await AsyncStorage.getItem(key)
    //      .then((value) => {
    //       if (value !== null) {
    //         console.log('name is ', value);
    //         // return value;
    //       }
    //     });
    //   } catch(error) {
    //     console.log(error);
    //   }
  }

  function logCurrentStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1]
        }
        console.log('CURRENT STORAGE: ', myStorage);
      })
    });
  }

  const [address, setAddress] = useState('over')

  const setAndStoreAddress = (newAddress) => {
    setAddress(newAddress)
    AsyncStorage.setItem('storedAddress', newAddress);
  }

  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = (language) => {
    // logCurrentStorage()
    console.log("setLanguage to", language)
    // translations.setLanguage(language);
    setLocale(language)
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    console.log("initializeAppLanguage")
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    setLanguage(currentLanguage);
  };

  useEffect(() => {
    logCurrentStorage()

    initializeAppLanguage()
    // setLanguage("zh")

    // const storedAddress = storageGet('storedAddress')

    // if (result === '') {
    //   console.log("storedAddress not found")
    // }

    // if (result && storedAddress) {
    //   console.log("the result is", result)
    //   setAddress(result)
    //   logCurrentStorage()
    // }

  }, [])

  // useEffect(() => {

  //   const storedAddress = storageGet('storedAddress')

  //   if (result === '') {
  //     console.log("storedAddress not found")
  //   }

  //   if (result && storedAddress) {
  //     console.log("the result is", result)
  //     setAddress(result)
  //     logCurrentStorage()
  //   }

  // }, [result])


  return (
    <Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,

        address,
        setAddress: setAndStoreAddress
      }}>
      {children}
    </Provider>
  )
}

export const useLocalizationContext = () => React.useContext(LocalizationContext)
export default LocalizationProvider
