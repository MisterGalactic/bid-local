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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';
import Timer from '../components/Timer';
import { GET_CATEGORIES, GET_ITEMS } from '../queries/home';
import { useQuery, useLazyQuery } from '@apollo/client';
import bidSubscription from '../queries/subscription';

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  bidSubscription();
  const categories = useQuery(GET_CATEGORIES);
  const [currentCategory, setCurrentCategory] = useState('ALL');
  const [refresh, setRefresh] = useState(false);
  const [getItems, items] = useLazyQuery(GET_ITEMS, {
    fetchPolicy: 'cache-and-network',
  });

  const onRefresh = useCallback(() => {
    setRefresh(true);
    getItems();
    setRefresh(false);
  }, []);

  useEffect(() => {
    if (categories.data) {
      getItems();
    }
  }, [categories]);

  if (categories.loading)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
        <Image style={{height: '70%', width: '100%'}} source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  if (categories.error) {
    return <Text>Error: </Text>;
  }

  function categoryTest() {
    const temp = items.data.get_items.slice();
    temp.sort((a, b) => b.auctionEnd - a.auctionEnd);
    const output = [];
    for (const component of temp) {
      if (
        (currentCategory === 'ALL' ||
        (component.category && component.category.name === currentCategory))
        &&component.auctionEnd
      ) {
        output.push(
          <TouchableWithoutFeedback
            key={component.id}
            onPress={() => {
              navigation.navigate('Item', { id: component.id });
            }}
          >
            <View style={styles.itemView}>
              <ImageBackground
                style={styles.itemImage}
                resizeMode="cover"
                source={component.picUrl1 ? { uri: component.picUrl1 } : require('../assets/splash.png')}
              >
                {
                  component.auctionStart > new Date(Date.now()) ?
                  <Text style={styles.itemNotStart}>Pending</Text>
                  :
                  <Timer
                    style={component.auctionStart > new Date(Date.now()) ? styles.itemNotStart : (component.auctionEnd < new Date(Date.now()) ? styles.itemFinished : styles.itemStarted)}
                    start={component.auctionStart}
                    deadline={component.auctionEnd}
                  />
                }
              </ImageBackground>
            <Text style={styles.itemPrice}>${component.minimumBid}</Text>
            <Text style={styles.itemTitle}>{component.name}</Text>
          </View>
        </TouchableWithoutFeedback>
        )
      }
    }
    if (!output.length) {
      return <Text style={styles.error}>No items found</Text>;
    }
    return output;
  }


  return (
    <>
      <Navbar navigation={navigation} canGoBack={false} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <ImageBackground source={require('../assets/login-background-keyboard.jpg')} style={styles.homeContent}>
          <DropDownPicker
            dropDownMaxHeight={1500}
            items={[{ name: 'ALL' }, ...categories.data.get_categories].map(
              (cat) => ({
                label: cat.name.charAt(0) + cat.name.slice(1).toLowerCase(),
                value: cat.name,
              }),
            )}
            defaultValue={'ALL'}
            containerStyle={{
              height: 40,
              width: 150,
              marginBottom: 20,
            }}
            style={{
              backgroundColor: null,
              borderWidth: 1,
              borderColor: 'black',
              fontFamily: 'Roboto_medium',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            arrowColor="gray"
            arrowSize={20}
            labelStyle={{
              fontSize: 22,
              color: 'gray',
              fontFamily: 'Roboto_medium',
            }}
            dropDownStyle={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderTopWidth: 1,
              borderColor: 'black',
            }}
            onChangeItem={(cat) => setCurrentCategory(cat.value)}
          />
          <View style={styles.homeItems}>
            {items.data ? categoryTest() : null}
          </View>
        </ImageBackground>
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
  categoryTitle: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: 'Roboto_medium',
  },
  homeContent: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    fontFamily: 'Roboto_medium',
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
  itemStarted: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#57D657',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemNotStart: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#0C637F88',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemFinished: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#BB50EF',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemTitle: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Roboto_medium',
  },

  itemPrice: {
    fontSize: 20,
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
});
