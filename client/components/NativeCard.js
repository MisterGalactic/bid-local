import React, { Component } from 'react';
import {
  View,
  Modal,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import faker from 'faker-extra';

import HTMLView from "react-native-htmlview";

export default class NativeCard extends Component {


  render() {
    return (
      <>
        <Content padder scrollEnabled={false} style={{flex: 0, borderRadius: 15}}>
          <Card style={{flex: 0, borderRadius: 15}}>
            <CardItem header bordered style={{alignItems: 'flex-end', backgroundColor: "thistle", borderBottom: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 5 }}>
              <Image source={require('../assets/ecommerce.gif')} style={{backgroundColor: 'white', position: 'absolute', borderTopLeftRadius: 15, borderTopRightRadius: 15, height: '100%', width: '100%', top: 0,flex: 1, resizeMode: "cover"}}/>
              <Image source={this.props.item.uri ? {uri: `${this.props.item.uri}`} : require('../assets/splash.png')} style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, width: 200, flex: 1, resizeMode: "cover"}}/>
              <Text style={{
                position: 'absolute',
                bottom: '4%',
                padding: 5,
                fontSize: 16,
                backgroundColor: this.props.item.color,
                color: 'white',
                fontFamily: 'Roboto_medium',
              }}>{this.props.item.subtext}
              </Text>
            </CardItem>
            <CardItem header style={{paddingTop: 5, paddingBottom: 0}}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.titleText} >{this.props.item.text}</Text>
            </CardItem>
            <CardItem bordered style={{alignItems: 'flex-start', overflow: 'hidden', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, height: 95  }}>
              <View style={{overflow: 'hidden',height:70}}>
                <HTMLView value={this.props.item.desc} stylesheet={styles} />
              </View>
              {/* <Text ellipsizeMode='tail' numberOfLines={2} style={styles.contentText}>{this.props.item.desc}</Text> */}
            </CardItem>
          </Card>
        </Content>
      </>
    );
  }
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
    fontSize: 15,
  },
  /*******************************/
  contentText: {
    fontFamily: "Cochin",
    height: 40
  },
  titleText: {
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight: "bold",
  },
  // catLabel: {
  //   position: 'absolute',
  //   bottom: '4%',
  //   padding: 5,
  //   fontSize: 16,
  //   backgroundColor: '#c968c9',
  //   color: 'white',
  //   fontFamily: 'Roboto_medium',
  // }
});


