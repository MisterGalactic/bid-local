import React, { useRef, useEffect, useState } from 'react';
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView,  Dimensions, StyleSheet} from "react-native";
import StripeCheckout from 'react-native-stripe-checkout-webview';
import { WebView } from 'react-native-webview'
import { STRIPE_PUBLISHABLE, STRIPE_SECRET, CHECKOUT_SESSION_ID } from '@env';

import HTMLView from "react-native-htmlview";

const windowWidth = Dimensions.get('window').width;

export default function MyStripeCheckout({ STRIPE_PUBLISHABLE, CHECKOUT_SESSION_ID }) {
  const [article, setArticle] = useState("");
	const RichText = useRef();

	return (
    <>
      <StripeCheckout
      stripePublicKey={STRIPE_PUBLISHABLE}
      checkoutSessionInput={{
        sessionId: CHECKOUT_SESSION_ID,
      }}
      onSuccess={({ checkoutSessionId }) => {
        console.log(`Stripe checkout session succeeded. session id: ${checkoutSessionId}.`);
      }}
      onCancel={() => {
        console.log(`Stripe checkout session cancelled.`);
      }}
      />
      <Text>Stripe Thing</Text>
      <WebView/>
    </>
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


