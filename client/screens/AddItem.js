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
import { CREATE_ITEM, GET_CATEGORIES } from '../queries/addItem';

const windowWidth = Dimensions.get('window').width;

export default function AddItem({ navigation, route }) {



  const [bottomMargin, setBottomMargin] = useState('');
  const [now, setNow] = useState(new Date(Date.now()));
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTime(currentDate);
    // handleTime(event);
    console.log(`changing`, event )
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

  useEffect(() => {
    if ((mode === 'date') && show) {
      setBottomMargin('120%')
    } else if ((mode === 'time') && show) {
      setBottomMargin('75%')
    } else {
      setBottomMargin('0%')
    }
  });

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [time, setTime] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [createItem, { data, error }] = useMutation(CREATE_ITEM);
  const categories = useQuery(GET_CATEGORIES);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
  }, []);

  useEffect(() => {
    console.log('error: ', error);
    if (data) {
      navigation.navigate('Item', { id: data.create_item.id });
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
            setTime(input);
          }
        } else {
          setTime(input);
        }
      } else {
        setTypeError('Invalid Character');
      }
    } else {
      setTime(input);
    }
  }

  function handleSubmit() {
    if (!isImageUploading) {
      const queryVariables = {
        item: {
          name: title,
          minPrice: parseInt(price),
          description: description,
          picUrl1: imageUrls[0] ? imageUrls[0] : '',
          picUrl2: imageUrls[1] ? imageUrls[1] : '',
          picUrl3: imageUrls[2] ? imageUrls[2] : '',
          // auctionEnd: new Date(Date.now()+60000*parseInt(time)),
          auctionEnd: time,
          CategoryId: selectedCategories[0].id,
        },
      };
      createItem({ variables: queryVariables });
    }
  }

  function handleCategories(cat) {
    setSelectedCategories((selArr) => {
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
      fetch('https://api.cloudinary.com/v1_1/dtuqopc5y/image/upload', {
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
        <Image style={{height: '70%', width: '100%'}} source={require('../assets/ecommerce.gif')} />
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
          <Text style={{ marginTop: 15 }}>Title:</Text>
          <TextInput
            style={styles.textBoxes}
            onChangeText={(text) => setTitle(text)}
          />
          <Text style={{ marginTop: 15 }}>Starting Price:</Text>
          <TextInput
            style={styles.textBoxes}
            value={price}
            onChangeText={(text) => handleCurrency(text)}
            keyboardType="numeric"
            placeholder="0,00"
          />
          {typeError ? (
            <Text style={{ color: 'purple', fontSize: 18 }}>{typeError}</Text>
          ) : null}
          {/* <Text style={{ marginTop: 15 }}>Duration (Minutes):</Text>
          <TextInput
            style={styles.textBoxes}
            value={time}
            onChangeText={(text) => onChange(text)}
            keyboardType="numeric"
            placeholder={secondsToHms((time - now)/1000)}
          />
          {typeError ? (
            <Text style={{ color: 'purple', fontSize: 18 }}>{typeError}</Text>
          ) : null} */}
          <Text style={{ marginTop: 15 }}>End Date & Time:</Text>
          { (secondsToHms((time - now)/1000)) ? <Text style={{ marginTop: 0 }}>{secondsToHms((time - now)/1000)}</Text> : null }
          <View style={{
            borderWidth: 1,
            borderColor: '#EF476F',
            width: '90%',
            padding: 5,
            flexDirection: 'row',
            marginBottom: bottomMargin
          }}>
            <View style={{flex: 1, flexDirection: 'row', marginLeft: -windowWidth*0.02}}>
              <Button onPress={showDatepicker} title={(date).toDateString()} />
              <TouchableOpacity onPress={showDatepicker} style={show && (mode==='date') ? styles.confirmView : styles.editView}>
                <Icon type="MaterialCommunityIcons" name={show && (mode==='date') ? "check" : "square-edit-outline"} style={show && (mode==='date') ? styles.confirmIcon : styles.editIcon}/>
              </TouchableOpacity>
              {show && (mode==='date') && (
              <View style={{position: 'absolute', marginTop: 50, borderRadius:10, backgroundColor : "green"}}>
                <Button onPress={showDatepicker} color='white' title='Confirm'/>
                <DateTimePicker
                  minimumDate={Date.now()}
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="inline"
                  onChange={onChange}
                  style={{position: 'absolute', marginTop: 45, width: windowWidth*0.85, borderWidth: 1}}
                />
              </View>
              )}
              <Button onPress={showTimepicker} title={(date).toLocaleTimeString()} />
              <TouchableOpacity onPress={showTimepicker} style={show && (mode==='time') ? styles.confirmView : styles.editView}>
                <Icon type="MaterialCommunityIcons" name={show && (mode==='time') ? "check" : "square-edit-outline"} style={show && (mode==='date') ? styles.confirmIcon : styles.editIcon}/>
              </TouchableOpacity>
              {show && (mode==='time') && (
              <View style={{position: 'absolute', marginTop: 50, borderRadius:10, backgroundColor : "green"}}>
                <Button onPress={showTimepicker} color='white' title='Confirm'/>
                <DateTimePicker
                  minimumDate={Date.now()}
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                  style={{position: 'absolute', marginTop: 45, width: windowWidth*0.5, borderWidth: 1}}
                />
              </View>
              )}
            </View>
          </View>
          <Text style={{ marginTop: 15 }}>Description:</Text>
          <TextInput
            style={styles.textBoxes}
            onChangeText={(text) => setDescription(text)}
          />
          <Text style={{ marginTop: 15 }}>Categories:</Text>
          <View style={styles.selectedCategories}>
            {selectedCategories.map((cat, index) => (
              <Text key={index} style={styles.selectedCategory}>
                {cat.name}
              </Text>
            ))}
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setModal(true);
              setSelectedCategories([]);
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
              Pick Categories
            </Text>
          </TouchableWithoutFeedback>
          <Text style={{ marginTop: 15 }}>Title:</Text>
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
              { isImageUploading ? 'Uploading Image' : 'ADD ITEM' }
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
                CATEGORIES
              </Text>
              {categories.data
                ? categories.data.get_categories.map((cat) => {
                    return (
                      <CategoryModalField
                        key={cat.id}
                        category={cat}
                        handleCategories={handleCategories}
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
                Submit
              </Text>
            </TouchableHighlight>
          </View>
        ) : null}
      </>
    );
  }
}

function CategoryModalField({ category, handleCategories }) {
  const [active, setActive] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive((act) => {
          return !act;
        });
        handleCategories(category);
      }}
    >
      <View style={styles.categoryField}>
        <Text style={[{ fontSize: 16 }, styles.text]}>{category.name}</Text>
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
    borderColor: '#EF476F',
    width: '90%',
    padding: 10,
  },
  addItemButton: {
    justifyContent: 'center',
    margin: 10,
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
  selectedCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  selectedCategory: {
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
    color: '#67A036',
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
    backgroundColor: 'green',
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
