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

export default class FeatureCard extends Component {

  render() {
    return (
      <View>
        <Content scrollEnabled={false} style={{flex: 0, width: '93%', justifyItems: 'center'}}>
          <Card noShadow style={{flex: 0, elevation: 0, borderColor: "white"}}>
              <Image source={{uri:'http://placeimg.com/640/480/animals'}} style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, width: "100%"}}/>
              {/* <Image source={this.props.item.uri || this.props.compUri ? {uri: `${this.props.item.uri || this.props.compUri}`} : require('../assets/splash.png')} style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, width: 200, flex: 1, resizeMode: "cover"}}/> */}
              <Text style={styles.catLabel}>Label</Text>
            <CardItem header style={{paddingTop: 5, paddingBottom: 0}}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.titleText} >Title</Text>
            </CardItem>
            <CardItem>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.contentText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </CardItem>
          </Card>
        </Content>
      </View>
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


