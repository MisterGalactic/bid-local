import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
  FlatList,
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

export default function Discover({ navigation }) {
  bidSubscription();
  const [currentCategory, setCurrentCategory] = useState('ALL');
  const [refresh, setRefresh] = useState(false);
  const categories = useQuery(GET_CATEGORIES);
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
        <Image source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  if (categories.error) {
    return <Text>Error: </Text>;
  }

  function categoryTest() {
    const temp = items.data.get_items.slice();
    temp.sort((a, b) => a.auctionEnd - b.auctionEnd);
    const output = [];
    for (const component of temp) {
      if (
        (currentCategory === 'ALL' ||
        (component.category && component.category.name === currentCategory))
        &&component.auctionEnd>(Date.now())
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
                <Timer
                  style={styles.itemTime}
                  deadline={component.auctionEnd}/>
              </ImageBackground>
            <Text style={styles.itemTitle}>{component.name}</Text>
            <Text style={styles.itemPrice}>{component.minimumBid}€</Text>
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

  const SECTIONS = [
    {
      title: 'Featured',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Item text 1',
          uri: 'https://picsum.photos/id/1/200',
        },
        {
          key: '2',
          text: 'Item text 2',
          uri: 'https://picsum.photos/id/10/200',
        },

        {
          key: '3',
          text: 'Item text 3',
          uri: 'https://picsum.photos/id/1002/200',
        },
        {
          key: '4',
          text: 'Item text 4',
          uri: 'https://picsum.photos/id/1006/200',
        },
        {
          key: '5',
          text: 'Item text 5',
          uri: 'https://picsum.photos/id/1008/200',
        },
      ],
    },
    {
      title: 'Trendy',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Item text 1',
          uri: 'https://picsum.photos/id/1011/200',
        },
        {
          key: '2',
          text: 'Item text 2',
          uri: 'https://picsum.photos/id/1012/200',
        },

        {
          key: '3',
          text: 'Item text 3',
          uri: 'https://picsum.photos/id/1013/200',
        },
        {
          key: '4',
          text: 'Item text 4',
          uri: 'https://picsum.photos/id/1015/200',
        },
        {
          key: '5',
          text: 'Item text 5',
          uri: 'https://picsum.photos/id/1016/200',
        },
      ],
    },
    {
      title: 'Beauty',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Item text 1',
          uri: 'https://picsum.photos/id/1020/200',
        },
        {
          key: '2',
          text: 'Item text 2',
          uri: 'https://picsum.photos/id/1024/200',
        },

        {
          key: '3',
          text: 'Item text 3',
          uri: 'https://picsum.photos/id/1027/200',
        },
        {
          key: '4',
          text: 'Item text 4',
          uri: 'https://picsum.photos/id/1035/200',
        },
        {
          key: '5',
          text: 'Item text 5',
          uri: 'https://picsum.photos/id/1038/200',
        },
      ],
    },
  ];

  const ListItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      <Navbar navigation={navigation} canGoBack={false} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <StatusBar style="light" />
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS}
              renderSectionHeader={({ section }) => (
                <>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                  {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({ item }) => <ListItem item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </>
              )}
              renderItem={({ item, section }) => {
                if (section.horizontal) {
                  return null;
                }
                return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
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
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'grey',
    marginTop: 5,
  },
});
