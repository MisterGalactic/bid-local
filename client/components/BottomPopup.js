import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { Item, Input, Label, Button } from 'native-base';

export default class BottomPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialEmail: '',
      initialMobile: '',
      count: 0,
    };
  }

  static defaultProps = {
    title: '',
    //slide fade  none
    animationType: 'slide',
    haveOutsideTouch: false,
    data: [],
  }

  onTrigger = () => {
    this.setState({ count: this.state.count + 1 })
    this.props.parentCallback(this.state.count);
  }

  renderContent = () => {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <Item floatingLabel style={styles.labelContainer}>
          <Label style={styles.label}>{'   '}Email</Label>
          <Input
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(text) => { this.setState({ initialEmail: text})}}
            value={this.state.initialEmail}
            style={{ color: 'black', fontFamily: 'Roboto_medium' }}
          />
        </Item>
        <Item floatingLabel style={styles.labelContainer}>
          <Label style={styles.label}>{'   '}Mobile Number</Label>
          <Input
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(text) => { this.setState({ initialMobile: text})}}
            value={this.state.initialMobile}
            style={{ color: 'black', fontFamily: 'Roboto_medium' }}
          />
        </Item>
        <View>
          <Button
            rounded
            onPress={() => this.props.closePopup(this.setState({ initialEmail: null, initialMobile: null},this.onTrigger))}
            style={styles.button}
          >
            <Text
              style={{
                fontFamily: 'Roboto_medium',
                fontSize: 20,
                color: 'white',
              }}
            >
              Submit
            </Text>
          </Button>
        </View>
      </View>
    )
  }

  render() {
    const { show, title, animationType, closePopup, haveOutsideTouch } = this.props;

    return (
      <Modal
        animationType={animationType}
        transparent={true}
        visible={show}
        onRequestClose={() => { }}
      >
        <View style={{ flex: 1, backgroundColor: '#000000AA' }}>
          <Pressable
            onPress={() => {
              if (!haveOutsideTouch) return;
              closePopup()
            }}
            style={{ flex: 1 }}>

          </Pressable>

          <View style={{
            bottom: 0,
            position: 'absolute',
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            // height: Dimensions.get('window').height * 0.4,
            maxHeight: Dimensions.get('window').height * 0.4
          }}>
            <Text style={{
              alignSelf: 'center',
              color: '#182E44',
              fontSize: 20,
              fontWeight: '500',
              margin: 15
            }}>{title}</Text>
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  headers: {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding: 10,
    marginBottom: 10,
    height: 60,
  },
  button: {
    justifyContent: 'center',
    padding: 16,
    alignSelf: 'center',
    width: '40%',
    marginTop: 30,
    backgroundColor: '#118AB2',
    fontFamily: 'Roboto_medium',
    marginBottom: 20
  },
  logo: {
    marginBottom: '5%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoPic: {
    width: '50%',
    resizeMode: 'contain',
  },
  label: {
    fontFamily: 'Roboto_medium',
    color: 'black',
  },
  labelContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto_medium',
    fontSize: 30,
    color: 'black',
    marginBottom: '5%',
  },
  register: {
    marginTop: '5%',
    alignItems: 'center',
    color: 'gray',
    fontFamily: 'Roboto_medium',
    fontFamily: 'Roboto_medium',
  },
});
