import React, { useRef, useEffect, useState } from 'react';
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView,  Dimensions, StyleSheet} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar
} from "react-native-pell-rich-editor";

import HTMLView from "react-native-htmlview";


const windowWidth = Dimensions.get('window').width;

export default function Editor({parentCallback}) {
  const [article, setArticle] = useState("");
	const RichText = useRef();

  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log(
        "Toolbar click, selected items (insert end callback):",
        items
      );
    });
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
  }

  function insertVideo() {
    // you can easily add videos from your gallery
    RichText.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    );
  }


	return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.text}>Description:</Text> */}
      <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          style={styles.rich}
          placeholder={"Start Writing Here"}
          // onChange={(text) => setArticle(text)}
          onChange={(text) => parentCallback(text)}
          // editorInitializedCallback={editorInitializedCallback}
          // onHeightChange={handleHeightChange}
      />
      <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          disabled={false}
          iconTint={"black"}
          selectedIconTint={"gray"}
          disabledIconTint={"black"}
          onPressAddImage={onPressAddImage}
          iconSize={20}
          actions=
          {[
            actions.undo,
            // actions.insertVideo,
            // actions.insertImage,
            actions.insertLink,
            actions.heading1,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.removeFormat,
            actions.insertBulletsList,
            actions.insertOrderedList,
            // actions.alignLeft,
            // actions.alignCenter,
            // actions.alignRight,
            'customAction',
          ]}
          iconMap=
          {{
            [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>),
            // customAction: customIcon,
            // customAction={this.handleCustomAction}
          }}
          insertVideo={insertVideo}
      />
      {/* <Text style={styles.text}>Result</Text>
      <HTMLView value={article} stylesheet={styles} /> */}
    </ScrollView>
    );
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
    },
    p: {
      fontSize: 30,
    },
    /*******************************/
    container: {
      flex: 1,
      // marginTop: 40,
      // backgroundColor: "#F5FCFF",
      backgroundColor: "transparent",
      minHeight: 300,
      marginLeft: 20,
      marginRight: 20
    },
    editor: {
      backgroundColor: "transparent",
      borderColor: "black",
      borderWidth: 1,
      height: 300
    },
    rich: {
      minHeight: 300,
      flex: 1
    },
    richBar: {
      height: 50,
      backgroundColor: "transparent",
      // backgroundColor: "white",
      // backgroundColor: "#F5FCFF",
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
    },
    tib: {
      textAlign: "center",
      color: "#515156",
    },
  });


