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

export default class NativeCard extends Component {

  render() {
    return (
      <>
        <Content padder scrollEnabled={false} style={{flex: 0, borderRadius: 15}}>
          <Card style={{flex: 0, borderRadius: 15}}>
            <CardItem header bordered style={{alignItems: 'flex-end', backgroundColor: "thistle", borderBottom: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 5 }}>
              <Image source={this.props.item.uri || this.props.compUri ? {uri: `${this.props.item.uri || this.props.compUri}`} : require('../assets/splash.png')} style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, width: 200, flex: 1, resizeMode: "cover"}}/>
              <Text style={styles.catLabel}>{this.props.item.category.charAt(0) + this.props.item.category.slice(1).toLowerCase()}</Text>
            </CardItem>
            <CardItem header style={{paddingTop: 5, paddingBottom: 0}}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.titleText} >{this.props.item.text}</Text>
            </CardItem>
            <CardItem bordered style={{paddingBottom: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.contentText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </CardItem>
          </Card>
        </Content>
      </>
    );
  }
}


const styles = StyleSheet.create({
  contentText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight: "bold",
  },
  catLabel: {
    position: 'absolute',
    bottom: '4%',
    padding: 5,
    fontSize: 16,
    backgroundColor: '#c968c9',
    color: 'white',
    fontFamily: 'Roboto_medium',
  }
});


