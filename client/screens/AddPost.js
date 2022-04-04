import { useMutation, useQuery } from '@apollo/client';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '@env';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Button,
  Platform
} from 'react-native';
import { Header, Left, Right, Body, Icon } from "native-base";
import Navbar from '../components/Navbar';
import { CREATE_POST, GET_POSTCATEGORIES } from '../queries/addPost';
import Editor from '../components/Editor';

import i18n from 'i18n-js';

const windowWidth = Dimensions.get('window').width;

export default function AddPost({ navigation, route }) {

  const [duration, setDuration] = useState('');

  const [now, setNow] = useState(new Date(Date.now()));
  const [start, setStart] = useState(new Date(Date.now()));
  const [end, setEnd] = useState('');

  const [bottomMargin, setBottomMargin] = useState('');
  const [mode, setMode] = useState('date');

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || now;
    setStart(currentDate);
    setEnd(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || now;
    setEnd(currentDate);
  };

  const showStartDatepicker = (data) => {
    setMode('date');
    setShowStart(data);
    setShowEnd(false);
  };

  const showStartTimepicker = (data) => {
    setMode('time');
    setShowStart(data);
    setShowEnd(false);
  };

  const showEndDatepicker = (data) => {
    setMode('date');
    setShowEnd(data);
    setShowStart(false);
  };

  const showEndTimepicker = (data) => {
    setMode('time');
    setShowEnd(data);
    setShowStart(false);
  };

  function secondsToHms(t) {
    t = Number(t);

    var d = Math.floor(t /(3600 * 24));
    var h = Math.floor(t / 3600 % 24);
    var m = Math.floor(t % 3600 / 60);
    var s = Math.floor(t % 3600 % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day" : " days") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour" : " hours") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return t>0 ? `${dDisplay} ${hDisplay} ${mDisplay}` : null;
}

  useEffect(() => {
    if ((mode === 'date')) {
      setBottomMargin('115%')
    } else if ((mode === 'time')) {
      setBottomMargin('70%')
    } else {
      setBottomMargin('0%')
    }
  });

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('0');
  const [description, setDescription] = React.useState('');
  const [createPost, { data, error }] = useMutation(CREATE_POST);
  const postcategories = useQuery(GET_POSTCATEGORIES);
  const [selectedPostCategories, setSelectedPostCategories] = useState([{
    "__typename": "PostCategory",
    "id": "0ec7e90f-238d-4da1-b6cc-f266fc0df9cc",
    "name": "UNSORTED",
  }]);
  const [showModal, setModal] = useState();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [typeError, setTypeError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isPic1Loading, setIsPic1Loading] = useState(false)
  const [isPic2Loading, setIsPic2Loading] = useState(false)
  const [isPic3Loading, setIsPic3Loading] = useState(false)

  const isImageUploading = isPic1Loading || isPic2Loading || isPic3Loading

  useEffect(() => {
    setIsLoading(false);
    setStart(now)
    setEnd(now)
  }, []);

  useEffect(() => {
    console.log('error: ', error);
    if (data) {
      console.log('FinalizePost', { id: data.create_post.id });
      navigation.navigate('FinalizePost', { id: data.create_post.id });
    }
  }, [data]);

  function handleCurrency(input) {
    setTypeError('');
    if (input) {
      if (input.search(/[^0-9,]/g) === -1) {
        // if string only contains (0123456789,)
        if (input.indexOf(',') !== -1) {
          input = input.slice(0, input.indexOf(',') + 3);
          if (input.search(/(,).*\1/g) === -1) {
            // if string doesn't contain multiple commas
            setPrice(input);
          }
        } else {
          setPrice(input);
        }
      } else {
        setTypeError('Invalid Character');
      }
    } else {
      setPrice(input);
    }
  }

  function handleTime(input) {
    setTypeError('');
    if (input) {
      if (input.search(/[^0-9,]/g) === -1) {
        // if string only contains (0123456789,)
        if (input.indexOf(',') !== -1) {
          input = input.slice(0, input.indexOf(',') + 3);
          if (input.search(/(,).*\1/g) === -1) {
            // if string doesn't contain multiple commas
            setDuration(input);
          }
        } else {
          setDuration(input);
        }
      } else {
        setTypeError('Invalid Character');
      }
    } else {
      setDuration(input);
    }
  }

  function handleCallback(text) {
    setDescription(text)
  }

  function handleSubmit() {
    if (!isImageUploading) {
      const queryVariables = {
        post: {
          name: title,
          minPrice: parseInt(price),
          description: description,
          picUrl1: imageUrls[0] ? imageUrls[0] : '',
          picUrl2: imageUrls[1] ? imageUrls[1] : '',
          picUrl3: imageUrls[2] ? imageUrls[2] : '',
          // auctionEnd: new Date(Date.now()+60000*parseInt(end)),
          auctionStart: start,
          auctionEnd: end ? end : new Date(Date.now()+60000*parseInt(duration)),
          PostCategoryId: selectedPostCategories[0].id,
        },
      };
      createPost({ variables: queryVariables });
    }
  }

  function handlePostCategories(cat) {
    setSelectedPostCategories((selArr) => {
      let initialLength = selArr.length;
      let reduced = selArr.reduce((accumulator, current) => {
        if (current.id !== cat.id) accumulator.push(current);
        return accumulator;
      }, []);

      if (initialLength === reduced.length) return [cat, ...reduced];
      else return reduced;
    });
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      if (imageUrls.length === 0) {
        console.log('initiating 1')
        setIsPic1Loading(true)
      } else if (imageUrls.length === 1) {
        console.log('initiating 2')
        setIsPic2Loading(true)
      } else {
        console.log('initiating 3')
        setIsPic3Loading(true)
      }

      setImages((imgs) => [...imgs, result.uri]);
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      let data = {
        file: base64Img,
        // upload_preset: CLOUDINARY_PRESET,
        upload_preset: 'i5ubfrjz',
      };

      // fetch(CLOUDINARY_URL, {
      fetch('https://api.cloudinary.com/v1_1/dm89vlndy/image/upload', {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      }).then(async (r) => {
        let data = await r.json();
        console.log("data", data)
        setImageUrls((urls) => [...urls, data.secure_url]);
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        if (imageUrls.length === 0) {
          setIsPic1Loading(false)
        } else if (imageUrls.length === 1) {
          setIsPic2Loading(false)
        } else {
          setIsPic3Loading(false)
        }
      })
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image style={{top: '12%', alignSelf: 'center', height: '35%', width: '35%'}} source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <Navbar navigation={navigation} canGoBack={true} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <Text style={{ marginTop: 15, alignSelf: 'flex-start', paddingLeft: 17.5 }}>{i18n.t('title')}:</Text>
          <TextInput
            style={styles.textBoxes}
            onChangeText={(text) => setTitle(text)}
          />
          {/* {
            end ? null :
          <>
            <Text style={{ marginTop: 15 }}>Duration (Minutes):</Text>
            <TextInput
              style={styles.textBoxes}
              value={duration}
              onChangeText={(text) => handleTime(text)}
              keyboardType="numeric"
              placeholder={secondsToHms((end - start)/1000)}
            />
            {typeError ? (
              <Text style={{ color: 'purple', fontSize: 18 }}>{typeError}</Text>
            ) : null}
          </>
          } */}
          {
            duration ? null :
          <>
            <Text style={{ marginTop: 15, alignSelf: 'flex-start', paddingLeft: 17.5 }}>{i18n.t('pubDate')}:</Text>
            {/* {showStart ? <Text>showStart true</Text> : <Text>showStart false</Text> } */}
            <View style={{
              borderWidth: 1,
              // borderColor: '#EF476F',
              backgroundColor: 'white',
              borderColor: 'black',
              width: '90%',
              padding: 5,
              flexDirection: 'row',
              marginBottom: showStart ? bottomMargin : null
            }}>
              <View style={{flex: 1, flexDirection: 'row', marginLeft: -windowWidth*0.02}}>
                <Button onPress={() => {showStartDatepicker(!showStart)}} title={(start).toDateString()}/>
                <TouchableOpacity onPress={() => {showStartDatepicker(!showStart)}} style={(mode==='date') && showStart ? styles.confirmView : styles.editView}>
                  <Icon type="MaterialCommunityIcons" name={(mode==='date') && showStart ? "check" : "square-edit-outline"} style={(mode==='date') ? styles.confirmIcon : styles.editIcon}/>
                </TouchableOpacity>
                {(mode==='date') && (
                <>
                  {showStart ?
                  <View style={{position: 'absolute', marginTop: 20, borderRadius:10, backgroundColor : "green",}}>
                    {/* <Button onPress={showStartDatepicker} color='white' title='Confirm'/> */}
                    <DateTimePicker
                      minimumDate={Date.now()}
                      testID="dateTimePicker"
                      value={start}
                      mode="date"
                      is24Hour={true}
                      display="inline"
                      onChange={onChangeStart}
                      style={{position: 'absolute', marginTop: 45, width: windowWidth*0.85, borderWidth: 1}}
                    />
                  </View> : null
                  }
                </>
                )}
                <Button onPress={() => {showStartTimepicker(!showStart)}} title={start ? (start).toLocaleTimeString() : (new Date(Date.now())).toLocaleTimeString()} />
                <TouchableOpacity onPress={() => {showStartTimepicker(!showStart)}} style={(mode==='time') && showStart ? styles.confirmView : styles.editView}>
                  <Icon type="MaterialCommunityIcons" name={(mode==='time') && showStart ? "check" : "square-edit-outline"} style={(mode==='date') ? styles.confirmIcon : styles.editIcon}/>
                </TouchableOpacity>
                {(mode==='time') && (
                <>
                  {
                  showStart ?
                  <View style={{position: 'absolute', marginTop: 20, borderRadius:10, backgroundColor : "green", marginLeft: "40%"}}>
                    {/* <Button onPress={showTimepicker} color='white' title='Confirm'/> */}
                    <DateTimePicker
                      minimumDate={Date.now()}
                      testID="dateTimePicker"
                      value={start}
                      mode="time"
                      is24Hour={true}
                      display="spinner"
                      onChange={onChangeStart}
                      style={{position: 'absolute', marginTop: 45, width: windowWidth*0.5, borderWidth: 1, alignSelf: 'center'}}
                    />
                  </View> : null
                  }
                </>
                )}
              </View>
            </View>
          </>
          }
          <Text style={{ marginTop: 15, alignSelf: 'flex-start', paddingLeft: 20 }}>{i18n.t('description')}:</Text>
          <Editor parentCallback={handleCallback} />
          {/* <TextInput
            style={styles.textBoxes}
            onChangeText={(text) => setDescription(text)}
          /> */}
          <Text style={{ marginTop: 15 }}>{i18n.t('categories')}:</Text>
          <View style={styles.selectedPostCategories}>
            {selectedPostCategories.map((cat, index) => (
              <Text key={index} style={styles.selectedPostCategory}>
                {cat.name}
              </Text>
            ))}
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setModal(true);
              setSelectedPostCategories([]);
              console.log(selectedPostCategories)
            }}
          >
            <Text
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                marginTop: 5,
              }}
            >
              {i18n.t('selectCat')}
            </Text>
          </TouchableWithoutFeedback>
          <Text style={{ marginTop: 15 }}>{i18n.t('images')}:</Text>
          <View style={styles.itemView}>
            {images.length > 0
              ? images.map((img, index) => (
                  <Image
                    key={index}
                    style={styles.itemImage}
                    source={{ uri: img }}
                  />
                ))
              : null}
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={styles.itemImage}
                source={require('../assets/plus.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableHighlight
            style={styles.addItemButton}
            onPress={handleSubmit}
          >
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                backgroundColor: '#06D6A0',
                padding: 15,
              }}
            >
              { isImageUploading ? `${i18n.t('uploadingImage')}` : `${i18n.t('submit')}` }
            </Text>
          </TouchableHighlight>
        </ScrollView>

        {showModal ? (
          <View style={styles.categoryModal}>
            <ScrollView style={styles.categoryModalContent}>
              <Text
                style={{
                  padding: 15,
                  backgroundColor: 'lightgray',
                  fontSize: 18,
                  fontFamily: 'Roboto_medium',
                }}
              >
                {i18n.t('categories')}
              </Text>
              {postcategories.data
                ? postcategories.data.get_postcategories.map((cat) => {
                    return (
                      <CategoryModalField
                        key={cat.id}
                        postcategory={cat}
                        handlePostCategories={handlePostCategories}
                      />
                    );
                  })
                : null}
            </ScrollView>
            <TouchableHighlight onPress={() => setModal(false)}>
              <Text
                style={{
                  textAlign: 'center',
                  backgroundColor: 'lightgray',
                  padding: 10,
                  fontFamily: 'Roboto_medium',
                }}
              >
                {i18n.t('submit')}
              </Text>
            </TouchableHighlight>
          </View>
        ) : null}
      </>
    );
  }
}

function CategoryModalField({ postcategory, handlePostCategories }) {
  const [active, setActive] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive((act) => {
          return !act;
        });
        handlePostCategories(postcategory);
      }}
    >
      <View style={styles.categoryField}>
        <Text style={[{ fontSize: 16 }, styles.text]}>{postcategory.name}</Text>
        {/* <Text style={[{ fontSize: 16 }, styles.text]}>something should be here</Text> */}
        <View
          style={[
            styles.selected,
            active ? { backgroundColor: 'lightblue' } : null,
          ]}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  itemView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemImage: {
    flexShrink: 0,
    width: 100,
    height: 100,
    width: 80,
    height: 80,
    margin: 10,
  },
  textBoxes: {
    borderWidth: 1,
    // borderColor: '#EF476F',
    backgroundColor: 'white',
    borderColor: 'black',
    width: '90%',
    padding: 10,
  },
  addItemButton: {
    justifyContent: 'center',
    margin: 30,
    marginBottom: 100
  },
  categoryModal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000bb',
    padding: 15,
    zIndex: 10,
  },
  categoryModalContent: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
  },
  categoryField: {
    padding: 10,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  selected: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  selectedPostCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  selectedPostCategory: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    margin: 5,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  loading: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: 'gray',
    marginTop: '60%',
    textAlign: 'center',
    marginBottom: '-40%',
    zIndex: 1,
  },
  editView: {
    height: 25,
    width: 25,
    color: 'white',
    borderRadius: 6,
    backgroundColor: 'blue',
    borderColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  editIcon: {
    color: 'white',
    fontSize: 25,
  },
  confirmView: {
    height: 25,
    width: 25,
    color: 'white',
    borderRadius: 6,
    backgroundColor: '#32CD32',
    borderColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  confirmIcon: {
    color: 'white',
    fontSize: 25,
  }
});
