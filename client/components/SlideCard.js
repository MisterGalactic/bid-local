import React, { Component } from 'react';
import { SliderBox } from "react-native-image-slider-box";
import FeaturedCard from './FeaturedCard';
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

export default class SlideCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [null]
    };
  }

  componentDidMount() {
    this.setState({ images: this.props.data.map(x => x.uri) })
  }

  render() {
    return (
      <>
        <Content scrollEnabled={false}>
          <Card style={{flex: 0, borderRadius: 15}}>
            <CardItem header bordered style={{backgroundColor: "white", borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
              <SliderBox
                ImageComponent={FeaturedCard}
                images={this.state.images}
                sliderBoxHeight={200}
                onCurrentImagePressed={index => this.props.parentCallback(this.props.data[index].key)}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                paginationBoxStyle={{
                  position: "absolute",
                  bottom: 0,
                  padding: 0,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)"
                }}
                ImageComponentStyle={null}
                imageLoadingColor="#2196F3"
              />
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


