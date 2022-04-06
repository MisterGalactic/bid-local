import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState, useCallback } from 'react';
import CreditPopup from '../components/CreditPopup';
import FeePopup from '../components/FeePopup';
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
  KeyboardAvoidingView,
  FlatList,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Carousel from 'react-native-snap-carousel';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import { GET_ITEM_BY_ID, PLACE_A_BID, GET_USER_INFO, BUY_CREDIT, CREATE_RECORD, UPDATE_RECORD } from '../queries/item';
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

const FlatListBasics = ({inputData}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={inputData}
        renderItem={({item}) => <Text style={styles.item}>{new Date(parseInt(item.time)).toLocaleString()} {item.name} {item.amount}</Text>}
      />
    </View>
  );
}

import { useLocalizationContext } from '../context/LocalizationContext'
import i18n from 'i18n-js';

export default function Item({ navigation, route }) {
  const [isShowCredit, setIsShowCredit] = useState(false);
  const [childDataCredit, setChildCredit] = useState(1);

  let clickedSubmitCredit = false;

  function closeCredit() {
    setIsShowCredit(false)
  }
  function handleCreditCallback(fromChild) {
    navigation.navigate('PaymentScreen')
    clickedSubmitCredit = true
    setChildCredit(fromChild+1)
    console.log ('clickedSubmit',clickedSubmitCredit)
    console.log(`fromChild`, fromChild)
    console.log(`childData`, childDataCredit)
    // if (childData>2) {
    //   setTimeout(() => Alert.alert(`You have submitted too many requests. Please try again later. Requests: ${childData}`), 600);
    // } else {
    //   setTimeout(() => Alert.alert(`Please wait for 5 to 10 minutes. The password reset form will be sent directly to your email.`), 600);
    // }
  }


  const [isShowFee, setIsShowFee] = useState(false);
  const [childDataFee, setChildFee] = useState(1);

  let clickedSubmitFee = false;

  function closeFee() {
    setIsShowFee(false)
  }
  function handleFeeCallback(fromChild) {
    navigation.navigate('PaymentScreen')
    clickedSubmitFee = true
    setChildFee(fromChild+1)
    console.log ('clickedSubmit',clickedSubmitFee)
    console.log(`fromChild`, fromChild)
    console.log(`childData`, childDataFee)
    // if (childData>2) {
    //   setTimeout(() => Alert.alert(`You have submitted too many requests. Please try again later. Requests: ${childData}`), 600);
    // } else {
    //   setTimeout(() => Alert.alert(`Please wait for 5 to 10 minutes. The password reset form will be sent directly to your email.`), 600);
    // }
  }



  const { address, setAddress, translations, appLanguage, setAppLanguage } = useLocalizationContext()

  const { data: subData } = bidSubscription();
  const windowWidth = Dimensions.get('window').width;
  const [offerBid, setOfferBid] = useState('');
  const [images, setImages] = useState([]);
  const [history, setHistory] = useState([]);
  const [successBid, setSuccessBid] = useState('');
  const [typeError, setTypeError] = useState('');
  const [exist, setExist] = useState(false);
  const [highestBidder, setHighestBidder] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [changeItem] = useMutation(PLACE_A_BID);
  const [changeUser] = useMutation(BUY_CREDIT);
  const [createRecord, { data: createRecordData, error: createRecordError }] = useMutation(CREATE_RECORD);

  const [updateRecord, { data: updateRecordData, error: updateRecordError }] = useMutation(UPDATE_RECORD);

  const user = useQuery(GET_USER_INFO);
  const [getCredit] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: route.params.id,
    }
  });
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

  // useEffect(() => {
  //   if (route.params.from === 'additem') {
  //     console.log("they match")
  //   }
  // }, [])


  function check(arr, userid) {
    if (Array.isArray(arr)) {
      const found = arr.some(el => el.id === userid);
      if (found) {
        setExist(true)
        console.log("user exists!")
        return found
      } else {
        console.log("user does not exists!")
        return found
      }
    } else {
      console.log("user does not exists!")
    }
  }

  useEffect(() => {
    if (data) {
      console.log("checking if user in history", data.get_item_by_Id.history)
      check(data?.get_item_by_Id?.history, user?.data?.get_user_info?.id)
      // if (data.get_item_by_Id.history !== [] && successBid === '') {
      //   setHistory(data.get_item_by_Id.history)
      // }
      if (data.get_item_by_Id.history !== []) {
        setHistory(data.get_item_by_Id.history)
      }
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
    getCredit();
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
      if (
        offerBid<data.get_item_by_Id.minimumBid && data.get_item_by_Id.bidder === null ||  offerBid<=data.get_item_by_Id.minimumBid && data.get_item_by_Id.bidder
        ) {
        setTypeError('Bid is lower than current highest bid.');
        return;
      }
      console.log(`successfully made offer of ${offerBid} for ${data.get_item_by_Id.name}!`)
      setSuccessBid({"name":`${user?.data.get_user_info?.lastName}`,"amount":`${offerBid}`})
      setHistory([...history,{"name":`${user?.data.get_user_info?.lastName}`,"amount":`${offerBid}`,"time":`${Date.now()}`}])
      changeItem({
        variables: {
          ItemId: route.params.id,
          biddingPrice: parseInt(offerBid),
          lastName: user?.data.get_user_info?.lastName,
          history: [...history,{"id":`${user?.data.get_user_info?.id}`,"name":`${user?.data.get_user_info?.lastName}`,"amount":`${offerBid}`,"time":`${Date.now()}`}]
        }
      });

      if (!exist) {
        console.log("creating new record")
        const createRecordVariables = {
          UserId: user?.data.get_user_info?.id,
          ItemId: route.params.id,
          record: {
            UserId: user?.data.get_user_info?.id,
            ItemId: route.params.id
          },
          auctionEnd: data.get_item_by_Id.auctionEnd,
          auctionStart: data.get_item_by_Id.auctionStart,
          biddingPrice: parseInt(offerBid)
        };

        createRecord({ variables: createRecordVariables });
        console.log({ variables: createRecordVariables })
        console.log('createRecordError: ', createRecordError);
      } else {
        console.log("updating existing record")
        const updateRecordVariables = {
          UserId: user?.data.get_user_info?.id,
          ItemId: route.params.id,
          record: {
            UserId: user?.data.get_user_info?.id,
            ItemId: route.params.id
          },
          biddingPrice: parseInt(offerBid)
        };

        updateRecord({ variables: updateRecordVariables });
        console.log({ variables: updateRecordVariables })
        console.log('updateRecordError: ', updateRecordError);
      }

      changeUser({
        variables: {
          UserId: user?.data.get_user_info?.id,
          credit: parseInt(offerBid),
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
    // let userArray = []
    // Object.keys(data.get_item_by_Id.history).forEach( key => { userArray.push( Object.keys(data.get_item_by_Id.history[key]) ) } )
    // let bidArray = []
    // Object.keys(data.get_item_by_Id.history).forEach( key => { bidArray.push(Object.values(data.get_item_by_Id.history[key])) } )
    // const Show = () => userArray.map(item => (<Text>{item}</Text>))

    return (
      <>
        { loading && offerBid ?
          <>
            <SafeAreaView style={{position: 'absolute', zIndex: 1, height: '100%', width: '100%', top:0, left:0, backgroundColor: 'white', opacity: 0.75}}/>
            <Image style={{position: 'absolute', zIndex: 9, top: '29.5%', alignSelf: 'center', height: '35%', width: '35%'}} source={require('../assets/ecommerce.gif')} />
          </>
          : null
        }
        <Navbar route={route} navigation={navigation} canGoBack={true} targetScreen={''} item={data} style={{zIndex: 1}}/>
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
              <Text style={styles.itemPrice}>
                ${data.get_item_by_Id.minPrice && data.get_item_by_Id.bidder === null ? data.get_item_by_Id.minPrice : data.get_item_by_Id.minimumBid }</Text>
              <Text style={styles.itemPrice}>{i18n.t('yourCredit')}: {user?.data.get_user_info?.credit} HKD</Text>
              {
                user && highestBidder ? (
                  <>
                    <Text>{data.get_item_by_Id.auctionEnd < new Date(Date.now()) ? `${i18n.t('auctionWinner')}` : `${i18n.t('highestBidder')}`}</Text>
                    {/* <Text>you: {user?.data.get_user_info?.id}</Text>
                    <Text>bidder: {data.get_item_by_Id.bidder}</Text> */}
                  </>
                ) : (
                  <>
                    {data.get_item_by_Id.auctionEnd < new Date(Date.now()) ?
                    <Text>{data.get_item_by_Id.bidder ? `${i18n.t('auctionEnded')}` : `${i18n.t('noWinners')}` }</Text>
                    :
                    <Text>{data.get_item_by_Id.auctionStart > new Date(Date.now()) ? `${i18n.t('auctionScheduled')}` : (data.get_item_by_Id.bidder ? `${i18n.t('outbid')}` : `${i18n.t('noBidsYet')}`)}</Text>
                    }
                    {/* <Text>you:{user?.data.get_user_info?.id}</Text>
                    <Text>bidder:{data.get_item_by_Id.bidder}</Text> */}
                  </>
                )
              }
              <View style={styles.time}>
                <Text style={{ color: 'white', fontSize: 16 }}>{data.get_item_by_Id.auctionStart > new Date(Date.now()) ? `${i18n.t('startsIn')}:` : `${i18n.t('timeLeft')}:`}</Text>
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
                      placeholder={(data.get_item_by_Id.minPrice && data.get_item_by_Id.bidder === null ? data.get_item_by_Id.minimumBid : data.get_item_by_Id.minimumBid + 1 ).toString()}
                    />
                    <Text style={styles.bidCurrency}>$</Text>
                  </View>
                  <TouchableHighlight
                    style={styles.bidButton}
                    onPress={() => {
                      data.get_item_by_Id.minimumBid > user?.data.get_user_info?.credit ? setIsShowCredit(!isShowCredit) : (data.get_item_by_Id.minimumBid > 10000 && !exist ? setIsShowFee(!isShowFee) : handleMakeOffer()) ;
                    }}
                  >
                    <Text style={{ fontSize: 16, color: 'white' }}>{i18n.t('makeOffer')}</Text>
                  </TouchableHighlight>
                </View>
              }
              {typeError ? (
                <Text style={{ color: 'red', fontSize: 25 }}>{typeError}</Text>
              ) : null}

              <Text style={{ fontSize: 16 }}>
                <FlatListBasics inputData={history}/>
                {/* <Show/>
                { JSON.stringify(userArray) }
                { JSON.stringify(bidArray) } */}
              </Text>

              <Text style={{ fontWeight: '700', fontSize: 18 }}>
                {i18n.t('itemDescription')}:
              </Text>
              <Text style={{ fontSize: 16 }}>
                {data.get_item_by_Id.description}
              </Text>
              {/* <View style={styles.userInfo}>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>{i18n.t('sellerInfo')}</Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>{i18n.t('name')}: </Text>
                  {data.get_item_by_Id.user.firstName}{' '}
                  {data.get_item_by_Id.user.lastName}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>{i18n.t('email')}: </Text>
                  {data.get_item_by_Id.user.email}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '700' }}>{i18n.t('tel')}: </Text>
                  {data.get_item_by_Id.user.phoneNumber}
                </Text>
              </View> */}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <CreditPopup
          show={isShowCredit}
          title={`You don't have sufficient credits`}
          animationType={"fade"}
          closePopup={closeCredit}
          haveOutsideTouch={true}
          parentCallback={handleCreditCallback}
        />
        <FeePopup
          show={isShowFee}
          title={`Non-refundable auction fee`}
          animationType={"fade"}
          closePopup={closeFee}
          haveOutsideTouch={true}
          parentCallback={handleFeeCallback}
        />
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
