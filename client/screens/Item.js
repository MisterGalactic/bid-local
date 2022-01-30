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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Carousel from 'react-native-snap-carousel';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import { GET_ITEM_BY_ID, PLACE_A_BID, GET_USER_INFO } from '../queries/item';
import bidSubscription from '../queries/subscription';

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

export default function Item({ navigation, route }) {
  const { data: subData } = bidSubscription();
  const windowWidth = Dimensions.get('window').width;
  const [offerBid, setOfferBid] = useState('');
  const [images, setImages] = useState([]);
  const [typeError, setTypeError] = useState('');
  const [highestBidder, setHighestBidder] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [changeItem] = useMutation(PLACE_A_BID);
  const user = useQuery(GET_USER_INFO);
  const [getItem, { loading, error, data }] = useLazyQuery(GET_ITEM_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: route.params.id,
    }
  });

  useEffect(() => {
    if (subData?.bidPlaced?.id === data?.get_item_by_Id?.id) {
      getItem()
    }
  }, [subData])

  useEffect(() => {
    if (data) {
      if (data.get_item_by_Id.picUrl3 !== '') {
        setImages([
          { uri: data.get_item_by_Id.picUrl1 },
          { uri: data.get_item_by_Id.picUrl2 },
          { uri: data.get_item_by_Id.picUrl3 }
        ]);
      } else if (data.get_item_by_Id.picUrl2 !== '') {
        setImages([
          { uri: data.get_item_by_Id.picUrl1 },
          { uri: data.get_item_by_Id.picUrl2 }
        ]);
      } else {
        setImages( data.get_item_by_Id.picUrl1 === '' ? [{ uri: 'http://placeimg.com/640/480/any' }] : [{ uri: data.get_item_by_Id.picUrl1 }] );
      }

      if (user?.data?.get_user_info?.id === data?.get_item_by_Id?.bidder) {
        setHighestBidder(true);
      } else {
        setHighestBidder(false);
      }
    }
  }, [data]);

  const handleRefresh = useCallback(() => {
    setRefresh(true);
    getItem();
    setRefresh(false);
  }, []);

  const handleCurrency = (input) => {
    setTypeError('');
    if (input) {
      if (input.search(/[^0-9,]/g) === -1) {
        // if string only contains (0123456789,)
        if (input.indexOf(',') !== -1) {
          input = input.slice(0, input.indexOf(',') + 3);
          if (input.search(/(,).*\1/g) === -1) {
            // if string doesn't contains multiple commas
            setOfferBid(input);
          }
        } else {
          setOfferBid(input);
        }
      } else {
        setTypeError('Invalid Character');
      }
    } else {
      setOfferBid(input);
    }
  }

  const handleMakeOffer = () => {
    if ( data.get_item_by_Id.auctionEnd > new Date(Date.now()) ) {
      console.log(`making offer of ${offerBid} for ${data.get_item_by_Id.name}`)
      if (offerBid<=data.get_item_by_Id.minimumBid) {
        setTypeError('Bid is lower than current highest bid.');
        return;
      }
      console.log(`successfully made offer of ${offerBid} for ${data.get_item_by_Id.name}!`)
      changeItem({
        variables: {
          ItemId: route.params.id,
          biddingPrice: parseInt(offerBid),
        }
      });
      setTimeout(() => handleRefresh(), 100)
    } else {
      setTypeError('Bidding time is over!');
    }
  }

  if (loading && !offerBid) return (
    <SafeAreaView style={styles.loadingContainer}>
      <Text style={styles.loading}>Loading...</Text>
      <Image style={{top: '12%', alignSelf: 'center', height: '35%', width: '35%'}} source={require('../assets/ecommerce.gif')} />
    </SafeAreaView>
  );
  if (error) return <Text>Error: {error}</Text>;
  if (data) {
    return (
      <>
        { loading && offerBid ?
          <>
            <SafeAreaView style={{position: 'absolute', zIndex: 1, height: '100%', width: '100%', top:0, left:0, backgroundColor: 'white', opacity: 0.75}}/>
            <Image style={{position: 'absolute', zIndex: 9, top: '29.5%', alignSelf: 'center', height: '35%', width: '35%'}} source={require('../assets/ecommerce.gif')} />
          </>
          : null
        }
        <Navbar navigation={navigation} canGoBack={true} targetScreen={''} item={data} style={{zIndex: 1}}/>
        <ImageBackground source={require('../assets/login-background-keyboard.jpg')} style={{zIndex: -1, height: '100%', width: '100%', position: 'absolute', top:0, left:0}}/>
        <KeyboardAwareScrollView
          extraScrollHeight={20}
          keyboardOpeningTime={0}
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
          <View style={styles.itemInfo}>
            <View style={{padding: 15}}>
              <Text style={styles.itemTitle}>{data.get_item_by_Id.name}</Text>
              <Text style={styles.itemPrice}>${data.get_item_by_Id.minimumBid}</Text>
              {
                user && highestBidder ? (
                  <>
                    <Text>{data.get_item_by_Id.auctionEnd < new Date(Date.now()) ? 'You are the auction winner.' : 'You are the current highest bidder.'}</Text>
                    {/* <Text>you: {user.data.get_user_info.id}</Text>
                    <Text>bidder: {data.get_item_by_Id.bidder}</Text> */}
                  </>
                ) : (
                  <>
                    {data.get_item_by_Id.auctionEnd < new Date(Date.now()) ?
                    <Text>{data.get_item_by_Id.bidder ? 'Auction has ended.' : 'Auction has ended with no winners.' }</Text>
                    :
                    <Text>{data.get_item_by_Id.auctionStart > new Date(Date.now()) ? 'Auction is scheduled.' : (data.get_item_by_Id.bidder ? 'You have been outbid.' : 'No bids have been placed yet.')}</Text>
                    }
                    {/* <Text>you:{user.data.get_user_info.id}</Text>
                    <Text>bidder:{data.get_item_by_Id.bidder}</Text> */}
                  </>
                )
              }
              <View style={styles.time}>
                <Text style={{ color: 'white', fontSize: 16 }}>{data.get_item_by_Id.auctionStart > new Date(Date.now()) ? `Starts in:` : `Time Left:`}</Text>
                <Timer style={{ color: 'white', fontSize: 25 }} start={data.get_item_by_Id.auctionStart} deadline={data.get_item_by_Id.auctionEnd}/>
              </View>
              {
                data.get_item_by_Id.auctionStart > new Date(Date.now()) ? null :
                <View style={styles.bidView}>
                  <View style={styles.bidBorder}>
                    <TextInput
                      style={styles.bidInput}
                      value={offerBid}
                      onChangeText={(text) => handleCurrency(text)}
                      keyboardType="numeric"
                      placeholder={(data.get_item_by_Id.minimumBid+1).toString()}
                    />
                    <Text style={styles.bidCurrency}>$</Text>
                  </View>
                  <TouchableHighlight
                    style={styles.bidButton}
                    onPress={() => {
                      handleMakeOffer();
                    }}
                  >
                    <Text style={{ fontSize: 16, color: 'white' }}>MAKE OFFER</Text>
                  </TouchableHighlight>
                </View>
              }
              {typeError ? (
                <Text style={{ color: 'red', fontSize: 25 }}>{typeError}</Text>
              ) : null}

              <Text style={{ fontWeight: '700', fontSize: 18 }}>
                Item Description:
              </Text>
              <Text style={{ fontSize: 16 }}>
                {data.get_item_by_Id.description}
              </Text>
              <View style={styles.userInfo}>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>Seller Info</Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>Name: </Text>
                  {data.get_item_by_Id.user.firstName}{' '}
                  {data.get_item_by_Id.user.lastName}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>Email: </Text>
                  {data.get_item_by_Id.user.email}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>Tel: </Text>
                  {data.get_item_by_Id.user.phoneNumber}
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }

  return null
}

const styles = StyleSheet.create({
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
  itemInfo: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  itemTitle: {
    fontSize: 25,
    fontWeight: '600',
  },
  itemPrice: {
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
    backgroundColor: 'transparent',
    fontFamily: 'Roboto_medium',
  },
  loading: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: 'gray',
    marginTop: '60%',
    textAlign: 'center',
    marginBottom: '-40%',
    zIndex: 1,
  },
});
