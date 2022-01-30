import React, { useRef, useEffect, useState } from 'react';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
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
  Image,
  Button
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body } from 'native-base';
import faker from 'faker-extra';

import HTMLView from "react-native-htmlview";

const windowWidth = Dimensions.get('window').width;

export default function FeaturedCard({ data, parentCallback }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const carouselItems = data

  const getPagination = () => {
    return (
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{ position: 'absolute', top: '84%',}}
          dotStyle={{
              width: 7,
              height: 7,
              borderRadius: 3.75,
              marginHorizontal: 1,
              backgroundColor: 'purple'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }

  const _renderItem = ({item,index}, parallaxProps) => {
    return (
      <Pressable onPress={index => parentCallback(item.key)}>
        <Card style={{flex: 0, borderRadius: 15, marginTop: 0, marginBottom: 0}}>
          <CardItem header bordered style={{backgroundColor: "thistle", borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 5 }}>
            <ParallaxImage
                    source={{ uri: item.uri }}
                    containerStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, width: "100%"}}
                    parallaxFactor={0.4}
                    {...parallaxProps}
            />
            <Text style={{
              position: 'absolute',
              bottom: '4%',
              padding: 5,
              fontSize: 16,
              backgroundColor: item.color,
              color: 'white',
              fontFamily: 'Roboto_medium',
            }}>{item.subtext}</Text>
          </CardItem>
          <CardItem header style={{paddingTop: 5, paddingBottom: 0}}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.titleText} >{item.text}</Text>
          </CardItem>
          <CardItem style={{alignItems: 'flex-start', overflow: 'hidden', height: 80, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
            <HTMLView value={item.desc} stylesheet={styles} />
            {/* <Text ellipsizeMode='tail' numberOfLines={2} style={styles.contentText}>{item.desc}</Text> */}
          </CardItem>
        </Card>
      </Pressable>
    )
  }

  return (
    <>
        <View style={{
          alignItems: 'center',
        }}>
          <Carousel
            layout={"default"}
            data={carouselItems}
            sliderWidth={windowWidth}
            itemWidth={windowWidth*0.95}
            renderItem={_renderItem}
            onSnapToItem = { index => setActiveIndex(index) }
            ref={carouselRef}
            hasParallaxImages={true}
            autoplay={true}
            paddingTop={10}
            paddingBottom={10}
          />
          { getPagination() }
        </View>
    </>
  );
  // return (
  //   <View>
  //     <Content scrollEnabled={false} style={{flex: 0, width: '100%', justifyItems: 'center'}}>
  //       <Card style={{flex: 0, borderRadius: 15}}>
  //         <CardItem header bordered style={{alignItems: 'flex-end', backgroundColor: "thistle", borderBottom: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 5 }}>
  //           <Image source={{uri:'http://placeimg.com/640/480/animals'}} style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, width: "100%"}}/>
  //           {/* <Image source={this.props.item.uri || this.props.compUri ? {uri: `${this.props.item.uri || this.props.compUri}`} : require('../assets/splash.png')} style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, width: 200, flex: 1, resizeMode: "cover"}}/> */}
  //           <Text style={styles.catLabel}>Label</Text>
  //         </CardItem>
  //         <CardItem header style={{paddingTop: 5, paddingBottom: 0}}>
  //           <Text ellipsizeMode='tail' numberOfLines={1} style={styles.titleText} >Featured Card</Text>
  //         </CardItem>
  //         <CardItem style={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
  //           <Text ellipsizeMode='tail' numberOfLines={2} style={styles.contentText}>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //           </Text>
  //         </CardItem>
  //       </Card>
  //     </Content>
  //   </View>
  // );
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
    fontSize: 30,
  },
  /*******************************/
  contentText: {
    fontFamily: "Cochin"
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


