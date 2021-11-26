import { useMutation, useQuery } from '@apollo/client';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Image, SafeAreaView,

  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Navbar from '../components/Navbar';
import { CREATE_ITEM, GET_CATEGORIES } from '../queries/addItem';

export default function AddItem({ navigation, route }) {
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
    const queryVariables = {
      item: {
        name: title,
        minPrice: parseInt(price),
        description: description,
        picUrl1: imageUrls[0] ? imageUrls[0] : '',
        picUrl2: imageUrls[1] ? imageUrls[1] : '',
        picUrl3: imageUrls[2] ? imageUrls[2] : '',
        auctionEnd: new Date(Date.now()+6000*parseInt(price)),
        categoryId: selectedCategories[0].id,
      },
    };
    createItem({ variables: queryVariables });
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
      setImages((imgs) => [...imgs, result.uri]);
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      let data = {
        file: base64Img,
        // upload_preset: CLOUDINARY_PRESET,
        upload_preset: 'i5ubfrjz',
      };

      console.log('initiated')
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
      })
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image source={require('../assets/ecommerce.gif')} />
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
          <Text style={{ marginTop: 15 }}>Duration (Minutes):</Text>
          <TextInput
            style={styles.textBoxes}
            value={time}
            onChangeText={(text) => handleTime(text)}
            keyboardType="numeric"
            placeholder="0,00"
          />
          {typeError ? (
            <Text style={{ color: 'purple', fontSize: 18 }}>{typeError}</Text>
          ) : null}
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
              ADD ITEM
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
});
