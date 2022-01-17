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
import FeatureCard from '../components/FeatureCard';
import FeaturedCard from '../components/FeaturedCard';
import NativeCard from '../components/NativeCard';
import SlideCard from '../components/SlideCard';
import { GET_CATEGORIES, GET_ITEMS } from '../queries/home';
import { useQuery, useLazyQuery } from '@apollo/client';
import bidSubscription from '../queries/subscription';

const windowWidth = Dimensions.get('window').width;

export default function Discover({ navigation }) {
  bidSubscription();
  const filterCat = 'FEATURED'
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
      console.log(`number of categories`,categories.data.get_categories.length);
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

  function handleCallback(fromChild) {
    navigation.navigate('Item', { id: fromChild })
  }

  // const dataTest = () => {
  //   const temp = items.data.get_items.slice();
  //   temp.sort((a, b) => b.auctionEnd - a.auctionEnd);
  //   const output = [];
  //   for (const component of temp) {
  //     if (
  //       (currentCategory === 'ALL' ||
  //       (component.category && component.category.name === currentCategory))
  //       &&component.auctionEnd
  //     ) {
  //       output.push(
  //         {
  //           key: `${component.id}`,
  //           text: `${component.name}`,
  //           uri: `${component.picUrl1}`,
  //         }
  //       )
  //     }
  //   }
  //   if (!output.length) {
  //     return <Text style={styles.error}>No items found</Text>;
  //   }
  //   console.log(`dataoutputting`, output)
  //   return output;
  // }

  const dataTest = (cat) => {
    const demp = items.data.get_items.slice().filter( x => cat === x.category.name);
    demp.sort((a, b) => b.auctionEnd - a.auctionEnd);
    // console.log(`demp`,demp)
    const output = [];
    for (const component of demp) {
      if (
        (currentCategory === 'ALL' ||
        (component.category && component.category.name === currentCategory))
        &&component.auctionEnd
      ) {
        output.push(
          {
            key: `${component.id}`,
            text: `${component.name}`,
            subtext: `${component.subname}`,
            desc: `${component.description}`,
            category: `${component.category.name}`,
            color: `${component.color}`,
            uri: `${component.picUrl1}`,
          }
        )
      }
    }
    // console.log(`dataoutputting`, demp)
    return output;
  }

  // function categoryTest(firstCat) {
  //   const demp = dataTest(firstCat);
  //   const temp = items.data.get_items.slice();
  //   temp.sort((a, b) => b.auctionEnd - a.auctionEnd);
  //   const output = [];
  //   for (const component of temp) {
  //     if (
  //       (currentCategory === 'ALL' ||
  //       (component.category && component.category.name === currentCategory))
  //       &&component.auctionEnd
  //     ) {
  //       output.push(
  //         {
  //           title: firstCat,
  //           horizontal: true,
  //           data: demp
  //         }
  //       //   <TouchableWithoutFeedback
  //       //     key={component.id}
  //       //     onPress={() => {
  //       //       navigation.navigate('Item', { id: component.id });
  //       //     }}
  //       //   >
  //       //     <ImageBackground style={styles.itemHide}/>
  //       //     <View style={styles.compView}>
  //       //       <NativeCard item={items} compName={component.name} compCat={component.category} compUri={component.picUrl1}/>
  //       //     </View>
  //       //     {/* <View style={styles.itemView}>
  //       //       <ImageBackground
  //       //         style={styles.itemImage}
  //       //         resizeMode="cover"
  //       //         source={component.picUrl1 ? { uri: component.picUrl1 } : require('../assets/splash.png')}
  //       //       >
  //       //         <Timer
  //       //           style={styles.itemTime}
  //       //           deadline={component.auctionEnd}/>
  //       //       </ImageBackground>
  //       //       <Text style={styles.itemTitle}>{component.name}</Text>
  //       //       <Text style={styles.itemPrice}>{component.minimumBid}€</Text>
  //       //     </View> */}
  //       // </TouchableWithoutFeedback>
  //       )
  //     }
  //   }
  //   if (!output.length) {
  //     return <Text style={styles.error}>No items found</Text>;
  //   }
  //   // console.log(`sectionoutputting`, output)
  //   return output;
  // }

  function categoryTest(customCat) {
    const temp = items.data.get_items.slice();
    const catArray = categories.data.get_categories;
    temp.sort((a, b) => b.auctionEnd - a.auctionEnd);
    const output = [];
    if (customCat) {
      const name = customCat
      output.push(
        {
          title: `${name} (${temp.filter( x => name === x.category.name).length})`,
          horizontal: true,
          data: dataTest(name),
          sectionCat: name,
          number: temp.filter( x => name === x.category.name).length
        }
      )
    } else {
      for (const currCat of catArray) {
        const name = currCat.name
        output.push(
          {
            title: `${name} (${temp.filter( x => name === x.category.name).length})`,
            horizontal: true,
            data: dataTest(name),
            sectionCat: name,
            number: temp.filter( x => name === x.category.name).length
          }
        )
      }
    }
        //   <TouchableWithoutFeedback
        //     key={component.id}
        //     onPress={() => {
        //       navigation.navigate('Item', { id: component.id });
        //     }}
        //   >
        //     <ImageBackground style={styles.itemHide}/>
        //     <View style={styles.compView}>
        //       <NativeCard item={items} compName={component.name} compCat={component.category} compUri={component.picUrl1}/>
        //     </View>
        //     {/* <View style={styles.itemView}>
        //       <ImageBackground
        //         style={styles.itemImage}
        //         resizeMode="cover"
        //         source={component.picUrl1 ? { uri: component.picUrl1 } : require('../assets/splash.png')}
        //       >
        //         <Timer
        //           style={styles.itemTime}
        //           deadline={component.auctionEnd}/>
        //       </ImageBackground>
        //       <Text style={styles.itemTitle}>{component.name}</Text>
        //       <Text style={styles.itemPrice}>{component.minimumBid}€</Text>
        //     </View> */}
        // </TouchableWithoutFeedback>
    return output;
  }

  const ListItem = ({ item }) => {
    return (
      <View>
        <TouchableWithoutFeedback
          key={item.key}
          onPress={() => {
            navigation.navigate('Item', { id: item.key });
          }}
        >
          <ImageBackground style={styles.itemHide}/>
          <View style={styles.compView}>
            <NativeCard item={item}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  // const ListFeatureItem = ({ item }) => {
  //   return (
  //     <View>
  //       <TouchableWithoutFeedback
  //         key={item.key}
  //         onPress={() => {
  //           navigation.navigate('Item', { id: item.key });
  //         }}
  //       >
  //         <ImageBackground style={styles.itemHide}/>
  //         <View style={styles.featureView}>
  //           <FeatureCard item={item}/>
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </View>
  //   );
  // };

  return (
    <>
      <Navbar navigation={navigation} canGoBack={false} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <ImageBackground source={require('../assets/login-background-keyboard.jpg')} style={styles.container}>
          <StatusBar style="dark " />
          <SafeAreaView style={{ flex: 1 }}>
            {/* <DropDownPicker
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
                marginTop: 20,
                marginLeft: 20,
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
            /> */}
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 0 }}
              stickySectionHeadersEnabled={false}
              sections={ items.data ? categoryTest('FEATURED') : null }
              renderSectionHeader={({ section }) => (
                <>
                  {section.number>0 ? (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                  ) : null}
                  {section.horizontal ? (
                    <FeaturedCard
                    data={section.data}
                    parentCallback={handleCallback}
                    />
                    // <SlideCard
                    //   data={section.data}
                    //   parentCallback={handleCallback}
                    // />
                    // <FlatList
                    //   horizontal
                    //   data={section.data}
                    //   renderItem={({ item }) => <ListFeatureItem item={item} />}
                    //   showsHorizontalScrollIndicator={false}
                    // />
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
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 0 }}
              stickySectionHeadersEnabled={false}
              sections={ items.data ? categoryTest() : null }
              renderSectionHeader={({ section }) => (
                <>
                  {section.number>0 && section.sectionCat !== filterCat ? (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                  ) : null}
                  {section.horizontal && section.sectionCat !== filterCat ? (
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
    width: (windowWidth - 45) / 1.3,
    marginBottom: 15,
    fontFamily: 'Roboto_medium',
  },
  compView: {
    width: (windowWidth - 30) / 1.3,
    // width: (windowWidth - 30) / 2,
    // marginBottom: 15,
    fontFamily: 'Roboto_medium',
  },
  featureView: {
    width: windowWidth - 20,
    // width: (windowWidth - 30) / 2,
    // marginBottom: 15,
    fontFamily: 'Roboto_medium',
  },
  itemImage: {
    width: '100%',
    height: (windowWidth - 45) / 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontFamily: 'Roboto_medium',
  },
  itemHide: {
    width: '100%',
    // borderWidth: 1,
    // backgroundColor: 'rgba(255, 0, 0, 0.2)',
    position: 'absolute',
    zIndex: 9,
    height: '100%',
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
