import React, { useRef, useEffect, useState, useCallback } from 'react';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { Animated } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
  SafeAreaView,
  Button,
  Pressable
} from 'react-native';
import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';
import FeatureCard from '../components/FeatureCard';

const windowWidth = Dimensions.get('window').width;


export default function Sandbox({ navigation }) {

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const carouselItems = [
                          {
                              title:"Item 1",
                              text: "Text 1",
                              subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                              illustration: 'https://i.imgur.com/UYiroysl.jpg',
                          },
                          {
                              title:"Item 2",
                              text: "Text 2",
                              subtitle: 'Lorem ipsum dolor sit amet',
                              illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
                          },
                          {
                              title:"Item 3",
                              text: "Text 3",
                              subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                              illustration: 'https://i.imgur.com/MABUbpDl.jpg',
                          },
                          {
                              title:"Item 4",
                              text: "Text 4",
                              subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                              illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
                          },
                          {
                              title:"Item 5",
                              text: "Text 5",
                              subtitle: 'Lorem ipsum dolor sit amet',
                              illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
                          },
                        ]

  const getPagination = () => {
      return (
          <Pagination
            dotsLength={carouselItems.length}
            activeDotIndex={activeIndex}
            containerStyle={{ position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.92)'
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
      <Pressable onPress={() => alert(item.subtitle)}>
        <View style={{
            backgroundColor:'floralwhite',
            borderRadius: 5,
            borderWidth: 1,
            height: 250,
            padding: 0,
            marginLeft: 0,
            marginRight: 0, }}>
          <ParallaxImage
              source={{ uri: item.illustration }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.4}
              {...parallaxProps}
          />
          <Text style={{fontSize: 30}}>{item.title}</Text>
          <Text>{item.text}</Text>
          <Text>{item.subtitle}</Text>
          <Button
            onPress={() => carouselRef.current.snapToItem(0)}
            title="Bress"
          />
                    <Button
            onPress={() => console.log(activeIndex)}
            title="whatIndex"
          />
        </View>
      </Pressable>
    )
  }

  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView style={styles.container}>
        <View style={styles.homeContent}>
          <Carousel
                    layout={"default"}
                    borderWidth= {1}
                    data={carouselItems}
                    sliderWidth={windowWidth * 0.75}
                    itemWidth={windowWidth * 0.75}
                    renderItem={_renderItem}
                    onSnapToItem = { index => setActiveIndex(index) }
                    ref={carouselRef}
                    hasParallaxImages={true}
          />
          <Text>Active Index:{activeIndex}</Text>
          { getPagination() }
        </View>
      </ScrollView>
      <Tabbar navigation={navigation} canGoBack={false}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  homeContent: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    fontFamily: 'Roboto_medium',
    alignItems: 'center',
  },
  sidebarItem: {
    borderBottomColor: 'white'
  },
  sidebarIcon: {
    color: 'gray',
    marginRight: 10,
  },
  navIcon: {
    position: "absolute",
    color: '#A9A9A9',
    left: "93%",
    fontSize: 20,
  },
  sidebarText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: "500",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 0,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
