import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable
} from 'react-native';
import Timer from '../components/Timer';
import { GET_ITEM_BY_ID } from '../queries/item';
import { useQuery, useLazyQuery } from '@apollo/client';
import ExpandableComponent from './PanelExpansion';

export default function RecordPanel(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [layoutHeight, setLayoutHeight] = useState(0);
  // const [find, setFind] = useState(props.id);
  const [description, setDescription] = useState('');

  // console.log("showing props", props)

  const [getItem, { loading, error, data }] = useLazyQuery(GET_ITEM_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props.id,
    }
  });

  const FlatListBasics = ({inputData}) => {
    return (
      <View style={styles.item}>
        <FlatList
          data={inputData}
          renderItem={({item}) => <Text style={styles.item}>{new Date(parseInt(item.time)).toLocaleString()} {item.amount}</Text>}
        />
      </View>
    );
  }

  useEffect(() => {
    if (isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!data) {
      getItem()
      // console.log("getting soemthing", {find})
    }
  }, [])

  // useEffect(() => {
  //   if (data) {
  //     console.log("getting data", data)
  //   }
  // }, [data])


  function updateLayout() {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView
      style={{
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: '#00C793',
        width: '100%',
        marginTop: 15,
      }}
    >
      <Pressable onPress={() => props.parentCallback(props.id)}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ marginRight: 'auto' }}>
              <Text style={styles.titleText}>{data?.get_item_by_Id?.name} </Text>
              <Text>{'$'+ data?.get_item_by_Id?.minimumBid}</Text>
              <FlatListBasics inputData={props.record}/>
            </View>
            {/* <View style={styles.timer}>
              <Text>Time: </Text>
              <Timer start={props.auctionStart} deadline={props.auctionEnd} />
            </View> */}
          </View>
          {/* <View>
            <ExpandableComponent
              id={props.id}
              description={description}
              title={}
              setTitle={}
              setDescription={}
              onClickFunction={() => {
                updateLayout(0);
              }}
              layoutHeight={layoutHeight}
            />
          </View> */}
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexShrink: 0,
    padding: 10,
  },
  titleText: {
    flexShrink: 0,
    width: '95%',
    fontSize: 22,
    fontWeight: 'bold',
    width: '100%',
  },
  timer: {
    borderLeftWidth: 1,
    padding: 3,
  },
});
