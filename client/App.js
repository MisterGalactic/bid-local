import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client';
// import { onError } from "@apollo/client/link/error";
import { onError } from "apollo-link-error";
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_SERVER_URI, APOLLO_WEB_SERVER_URI } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebSocketLink } from 'apollo-link-ws';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './routes/HomeStack';

console.log(APOLLO_SERVER_URI, APOLLO_WEB_SERVER_URI)

const getFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const email = useRef('');
  const token = useRef('');
  const [initial, setInitial] = useState('');
  const uri = APOLLO_SERVER_URI;
  const webUri = APOLLO_WEB_SERVER_URI;

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@token', value)
    } catch (e) {
      console.log(e);
    }
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value !== null) {
        token.current = value;
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
    }
  }

  const authLink = setContext((_, { headers }) => {
    const tkn = token.current;
    return {
      headers: {
        ...headers,
        'x-token': tkn,
      }
    }
  });

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (initial === '') {
      console.log('initial token: ',token);
      if (token && token.current!=='') {
        setInitial('Home');
      } else {
        setInitial('Login');
      }
    }
    storeToken(token.current);
  }, [token]);

  const wsLink = new WebSocketLink({
    uri: webUri,
    options: {
      reconnect: true,
    },
  });

  const link = new HttpLink({ uri: uri });

  const showErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log("on error function called");
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    link,
    showErrorLink
  );

  const client = new ApolloClient({
    // link: from([errorLink, link]),
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {fontsLoaded ? (
        initial !== ''
        ?
        <Navigator email={email} token={token} initial={initial}/>
        :
        null
      ) : (
        <AppLoading
          startAsync={getFonts}
          onError={console.warn}
          onFinish={() => {
            setFontsLoaded(true);
          }}
        />
      )}
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: 80,
    paddingTop: 25,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  arrowContainer: {
    height: 40,
    width: '15%',
  },
  arrow: {
    height: 40,
    width: 30,
  },
  logoContainer: {
    width: '70%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navbarLogo: {
    height: 50,
    width: 200,
  },
  burgerContainer: {
    width: '15%',
    height: 50,
  },
});
