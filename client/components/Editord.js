import React, { useRef, useEffect, useState } from 'react';
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView,  Dimensions, StyleSheet} from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";

const windowWidth = Dimensions.get('window').width;

export default function Editor() {
	const richText = React.useRef();
	return (
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                    <Text>Description:</Text>
                    <RichEditor
                        ref={richText}
                        onChange={ descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                actions=
                {[
                  actions.insertOrderedList,
                  actions.insertImage,
                  'customAction',
                ]}
                iconMap=
                {{
                  [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>),
                  // customAction: customIcon,
                  // customAction={this.handleCustomAction}
                }}
            />
        </SafeAreaView>
    );
}

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



const styles = StyleSheet.create({
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


