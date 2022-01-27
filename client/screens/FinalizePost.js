import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableHighlight,
  RefreshControl,
  KeyboardAvoidingView
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import { GET_POST_BY_ID, GET_USER_INFO } from '../queries/post';

import HTMLView from "react-native-htmlview";

const ImageList = ({ item, index }) => {
  return (
    <ImageBackground
      key={index}
      style={styles.itemImage}
      resizeMode="contain"
      source={item}
    />
  );
};

export default function FinalizePost({ navigation, route }) {
  const windowWidth = Dimensions.get('window').width;
  const [images, setImages] = useState([]);
  const [typeError, setTypeError] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [start, setStart] = useState(new Date(Date.now()));

  const user = useQuery(GET_USER_INFO);

  const [getPost, { loading, error, data }] = useLazyQuery(GET_POST_BY_ID, {
  fetchPolicy: 'cache-and-network',
  variables: {
    id: route.params.id,
  }
  });

  useEffect(() => {
    if (!data) {
      getPost()
    }
  }, [data])

  useEffect(() => {
    if (data) {
      if (data.get_post_by_Id.picUrl3 !== '') {
        setImages([
          { uri: data.get_post_by_Id.picUrl1 },
          { uri: data.get_post_by_Id.picUrl2 },
          { uri: data.get_post_by_Id.picUrl3 }
        ]);
      } else if (data.get_post_by_Id.picUrl2 !== '') {
        setImages([
          { uri: data.get_post_by_Id.picUrl1 },
          { uri: data.get_post_by_Id.picUrl2 }
        ]);
      } else {
        setImages( data.get_post_by_Id.picUrl1 === '' ? [{ uri: 'http://placeimg.com/640/480/any' }] : [{ uri: data.get_post_by_Id.picUrl1 }] );
      }
    }
  }, [data]);

  const handleRefresh = useCallback(() => {
    setRefresh(true);
    getPost( {variables: {id: route.params.id}} );
    setRefresh(false);
  }, []);

  if (loading) return (
    <SafeAreaView style={styles.loadingContainer}>
      <Text style={styles.loading}>Loading...</Text>
      <Image style={{height: '70%', width: '100%'}} source={require('../assets/ecommerce.gif')} />
    </SafeAreaView>
  );
  if (error) return <Text>Error: {error}</Text>;
  if (data) {
    return (
      <>
        <Navbar navigation={navigation} canGoBack={true} targetScreen={'DiscoverPost'}/>
        <ImageBackground source={require('../assets/login-background-keyboard.jpg')} style={{zIndex: -1, height: '100%', width: '100%', position: 'absolute', top:0, left:0}}/>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        >
          <Carousel
            containerCustomStyle={{
              backgroundColor: 'white',
              // paddingVertical: 10,
              paddingVertical: 0
            }}
            layout={'default'}
            data={images}
            sliderWidth={windowWidth}
            // itemWidth={windowWidth - windowWidth / 6}
            itemWidth={windowWidth}
            renderItem={ImageList}
          />
          <View style={styles.postInfo}>
            <View style={{padding: 15}}>
              <Text style={styles.postTitle}>{data.get_post_by_Id.name}</Text>
              {/* <Text style={styles.postPrice}>${data.get_post_by_Id.minimumBid}</Text>
              <View style={styles.time}>
                <Text style={{ color: 'white', fontSize: 16 }}>{data.get_post_by_Id.auctionStart > new Date(Date.now()) ? `Starts in:` : `Time Left:`}</Text>
                <Timer style={{ color: 'white', fontSize: 25 }} start={data.get_post_by_Id.auctionStart} deadline={data.get_post_by_Id.auctionEnd}/>
              </View>
              {typeError ? (
                <Text style={{ color: 'red', fontSize: 25 }}>{typeError}</Text>
              ) : null} */}

              <Text style={{ fontSize: 18, fontWeight: '350', paddingBottom: 10 }}>
               Published: {new Date( Number(data.get_post_by_Id.auctionStart) ).toDateString()}
              </Text>
              <HTMLView value={data.get_post_by_Id.description} stylesheet={styles} />
              {/* <Text style={{ fontSize: 16 }}>
                {data.get_post_by_Id.description}
              </Text> */}
              {/* <View style={styles.userInfo}>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>Seller Info</Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>Name: </Text>
                  {data.get_post_by_Id.user.firstName}{' '}
                  {data.get_post_by_Id.user.lastName}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>Email: </Text>
                  {data.get_post_by_Id.user.email}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>Tel: </Text>
                  {data.get_post_by_Id.user.phoneNumber}
                </Text>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </>
    );
  }

  return null
}

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "Cochin",
    fontSize: 20
  },
  p: {
    fontSize: 20,
  },
  /*******************************/
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  itemImage: {
    width: '100%',
    height: 300,
    backgroundColor: 'black',
  },
  postInfo: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  postTitle: {
    fontSize: 25,
    fontWeight: '600',
  },
  postPrice: {
    fontSize: 20,
    color: '#666666',
  },
  time: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#A9A9A9',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    minHeight: 70,
  },
  bidView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  bidBorder: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    flexDirection: 'row',
  },
  bidInput: {
    flex: 1,
    fontSize: 25,
    padding: 10,
  },
  bidCurrency: {
    fontSize: 25,
    padding: 10,
  },
  bidButton: {
    justifyContent: 'center',
    backgroundColor: 'gray',
    padding: 10,
  },
  userInfo: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
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
});
