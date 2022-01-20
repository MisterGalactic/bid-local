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
import Timer from '../components/Timer';
import { GET_CATEGORIES, GET_ITEMS } from '../queries/home';
import { useQuery, useLazyQuery } from '@apollo/client';
import bidSubscription from '../queries/subscription';

const windowWidth = Dimensions.get('window').width;

export default function ViewAll({ navigation, route }) {
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
      setCurrentCategory(`${route.params.name}`),
      console.log(route)
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
    temp.sort((a, b) => b.auctionStart - a.auctionStart );
    const output = [];
    for (const component of temp) {
      if (
        (currentCategory === 'ALL' ||
        (component.category && component.category.name === currentCategory))
      ) {
        output.push(
          <TouchableWithoutFeedback
            key={component.id}
            onPress={() => {
              navigation.navigate('Item', { id: component.id });
            }}
          >
            <View style={styles.itemView}>
              <Image
                source={require('../assets/ecommerce.gif')}
                style={{position: 'absolute', height: (windowWidth - 45) / 2, width: '100%', top: 0,flex: 1, resizeMode: "cover"}}
              />
              <ImageBackground
                style={styles.itemImage}
                resizeMode="cover"
                source={component.picUrl1 ? { uri: component.picUrl1 } : require('../assets/splash.png')}
              >
                {
                  component.auctionStart > new Date(Date.now()) ?
                  <Text style={styles.itemNotStart}>Scheduled</Text>
                  :
                  <Timer
                    style={component.auctionStart > new Date(Date.now()) ? styles.itemNotStart : (component.auctionEnd < new Date(Date.now()) ? styles.itemFinished : styles.itemStarted)}
                    start={component.auctionStart}
                    deadline={component.auctionEnd}
                  />
                }
              </ImageBackground>
            <Text style={styles.itemPrice}>${component.minimumBid}</Text>
            {component.subname ? <Text style={styles.itemTitle}>{component.subname}</Text> : null}
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
      <Navbar navigation={navigation} canGoBack={true} />
      <ImageBackground source={require('../assets/login-background-keyboard.jpg')} style={{zIndex: -1, height: '100%', width: '100%', position: 'absolute', top:0, left:0}}/>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={styles.homeContent}>
          {/* <DropDownPicker
            dropDownMaxHeight={1500}
            items={[{ name: 'ALL' }, ...categories.data.get_categories].map(
              (cat) => ({
                label: cat.name.charAt(0) + cat.name.slice(1).toLowerCase(),
                value: cat.name,
              }),
            )}
            defaultValue={`${route.params.name}`}
            containerStyle={{
              height: 40,
              width: 150,
              marginBottom: 20,
            }}
            style={{
              backgroundColor: null,
              // borderWidth: 1,
              // borderColor: 'black',
              fontFamily: 'Roboto_medium',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            arrowColor="gray"
            arrowSize={19}
            labelStyle={{
              fontSize: 22,
              color: 'gray',
              fontFamily: 'Roboto_medium',
            }}
            dropDownStyle={{
              backgroundColor: 'white',
              // borderWidth: 1,
              // borderTopWidth: 1,
              // borderColor: 'black',
            }}
            onChangeItem={(cat) => setCurrentCategory(cat.value)}
          /> */}
          <Text style={styles.sectionHeader}>{route.params.name} ({route.params.count})</Text>
          <View style={styles.homeItems}>
            {items.data ? categoryTest() : null}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    fontFamily: 'Roboto_medium',
  },
  categoryTitle: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: 'Roboto_medium',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  homeContent: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    fontFamily: 'Roboto_medium',
    backgroundColor: 'transparent'
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
    marginBottom: 25,
    fontFamily: 'Roboto_medium',
  },
  itemImage: {
    width: '100%',
    height: (windowWidth - 45) / 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontFamily: 'Roboto_medium',

    marginBottom: '5%',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  itemStarted: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#28A745',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemNotStart: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#17A2B8',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemFinished: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#DC3545',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemTitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '100',
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
