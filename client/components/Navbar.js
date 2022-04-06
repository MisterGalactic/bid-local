import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Header, Button, Left, Right, Body, Icon } from "native-base";
import { StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Text, Dimensions, Share} from 'react-native';
import SideBar from './SideBar';

export default function Navbar({navigation, canGoBack, targetScreen, item, post, route}) {
  const [hideSide, setHideSide] = useState(true);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        item ? `Hey! Check out this item currently on auction.${"\n"}
                Product Name: ${item.get_item_by_Id.name}${"\n"}
                Description: ${item.get_item_by_Id.description}${"\n"}
                Starting Bid: $${item.get_item_by_Id.minimumBid}${"\n"}
                Auction End: ${new Date( Number(item.get_item_by_Id.auctionEnd) ).toDateString()}${"\n"}
                Download the Central Win App here!${"\n"}
                https://testflight.apple.com/join/n0C7yEop
                `
        :
        post ? `Hey! Check out this blog post.${"\n"}
                Date: ${new Date( Number(post.get_post_by_Id.auctionEnd) ).toDateString()}${"\n"}
                Text: ${post.get_post_by_Id.description}${"\n"}
                Download the Central Win App here!${"\n"}
                https://testflight.apple.com/join/n0C7yEop
                `
                : null,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <Header style={{height: 35, backgroundColor: '#ffffff'}}>
    <StatusBar backgroundColor='#ffffff'/>
      <Left style={{flex: 1}}>
        {canGoBack
          ?
          <Button transparent onPress={targetScreen || route?.params?.from === 'additem' ? ()=>{navigation.navigate(targetScreen||'Home')} : ()=>{navigation.goBack()} }>
            {/* <ImageBackground source={require('../assets/arrow.png')} style={styles.arrow} resizeMode='contain'/> */}
            <Icon type="Ionicons" name="chevron-back" style={styles.navIcon}/>
          </Button>
          :
          null
        }
      </Left>
      <Body style={styles.logoContainer}>
        <ImageBackground source={require('../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
      </Body>
      <Right style={{flex: 1}}>
        {
          item||post ?
          <TouchableOpacity style={styles.container} onPress={onShare}>
            <Icon type="MaterialCommunityIcons" name="share-variant" style={styles.shareIcon}/>
          </TouchableOpacity>
          : null
        }

        {/* <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Sandbox')}}>
          <Icon type="MaterialCommunityIcons" name="radioactive" style={styles.navIcon}/>
        </TouchableOpacity> */}
        {/* <Button transparent onPress={() => {setHideSide(hide => !hide)}}>
          <ImageBackground source={require('../assets/burger.png')} style={styles.burger} resizeMode='contain'/>
        </Button> */}
      </Right>
    </Header>
    <SideBar navigation={navigation} hideSide={hideSide} setHideSide={setHideSide}/>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    height: 40,
    width: 30,
    backgroundColor: 'red'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '3%',
  },
  logo: {
    height: 30,
    width: 170
  },
  burger: {
    height: 40,
    width: 45,
  },
  navIcon: {
    // position: "absolute",
    height: 50,
    width: 50,
    color: '#383838',
    opacity: 0.7,
    // fontSize: 24,
    fontSize: 48,
    // marginLeft: 5,
    // borderRadius: 30/2,
    // borderWidth: 1,
    borderColor: '#383838',
    marginBottom: '15%',
  },
  shareIcon: {
    // position: "absolute",
    height: 30,
    width: 30,
    color: '#383838',
    fontSize: 24,
    marginLeft: 10,
    borderRadius: 30/2,
    // borderWidth: 1.5,
    borderColor: '#383838',
    marginBottom: '10%',
  }
});
