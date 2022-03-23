import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  View,
  LogBox
} from 'react-native';
import Panel from '../components/ItemPanel.js'
import RecordPanel from '../components/recordPanel.js'
import { Icon } from 'native-base';
import Navbar from '../components/Navbar';
import { GET_USER_ITEMS, GET_USER_RECORD } from '../queries/userHistory';
import { useLazyQuery } from '@apollo/client';
import bidSubscription from '../queries/subscription';

export default function UserHistory({ navigation, route }) {
  bidSubscription();
  const [isLoading, setIsLoading] = useState(true);
  const [getItems, { loading, error, data }] = useLazyQuery(GET_USER_ITEMS, {
    fetchPolicy: 'cache-and-network',
  });
  const [getRecord, { loading: recordLoading, error: recordError, data: recordData }] = useLazyQuery(GET_USER_RECORD, {
    fetchPolicy: 'cache-and-network',
  });
  const [refresh, setRefresh] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    getItems();
    getRecord();
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    LogBox.ignoreLogs(['VirtualizedList: missing keys for items'])
  }, [])

  useEffect(() => {
    if (data) {
      setItemList(data.get_user_info.item);
      console.log(data.get_user_info.item)
    }
  }, [data]);

  useEffect(() => {
    if (recordData) {
      setRecordList(recordData.get_user_info.record);
      // console.log(recordData.get_user_info.record)
    }
  }, [recordData]);

  const onRefresh = useCallback(() => {
    setRefresh(true);

    setTimeout(() => {
      getItems();
      getRecord();
      console.log("refreshing")
      console.log("recordList",recordList)
      // console.log("itemList",itemList)
      setRefresh(false);
    }, 2000);
  }, []);

  // const FlatListBasics = ({inputData}) => {
  //   return (
  //     <View style={styles.item}>
  //       <FlatList
  //         data={inputData}
  //         renderItem={({item}) => <Text style={styles.item}>{item.time} {item.amount}</Text>}
  //       />
  //     </View>
  //   );
  // }

  function handleCallback(fromChild) {
    navigation.navigate('Item', { id: fromChild })
  }

  if (loading)
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image style={{height: '70%', width: '100%'}} source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  if (error) return <Text>Error: {error}</Text>;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image style={{height: '70%', width: '100%'}} source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Navbar navigation={navigation} canGoBack={true} />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          {/* {itemList.length > 0
            ? itemList.map((item) => (
                <Panel
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  deadline={item.auctionEnd}
                  price={item.minimumBid}
                />
              ))
            : null} */}
          {recordList.length > 0
            ? recordList.map((item) => (
              <>
                <RecordPanel
                  key={item.ItemId}
                  id={item.ItemId}
                  record={item.history}
                  auctionEnd={item.auctionEnd}
                  auctionStart={item.auctionStart}
                  parentCallback={handleCallback}
                />
                {/* <Text style={styles.item}>{item.ItemId}</Text>
                <FlatListBasics inputData={item.history}/> */}
              </>
              ))
            : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
  },
  box: {
    paddingLeft: 15,
    height: 100,
    width: '100%',
    flexShrink: 0,
    backgroundColor: '#0C637F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});