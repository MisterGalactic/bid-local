import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from '../screens/Home';
import Post from '../screens/Post';
import Item from '../screens/Item';
import AddItem from '../screens/AddItem';
import AddPost from '../screens/AddPost';
import FinalizeItem from '../screens/FinalizeItem';
import FinalizePost from '../screens/FinalizePost';
import UsersItems from '../screens/UsersListedItems';
import WinnerItems from '../screens/UserWonItems';
import Login from '../screens/Login';
import UserInfo from '../screens/UserInfo';
import Register from '../screens/Register';
import Discover from '../screens/Discover';
import DiscoverPost from '../screens/DiscoverPost';
import LogoButton from '../screens/LogoButton';
import Cart from '../screens/Cart';
import Account from '../screens/Account';
import Sandbox from '../screens/Sandbox';
import ViewAll from '../screens/ViewAll';
import ViewAllPost from '../screens/ViewAllPost';
import BuyCredits from '../screens/BuyCredits';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

const HomeStack = ({ token, initial }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial} headerMode={null}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="DiscoverPost" component={DiscoverPost} />
        <Stack.Screen name="LogoButton" options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,}} component={LogoButton} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="BuyCredits" component={BuyCredits} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="Sandbox" component={Sandbox} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen name="ViewAllPost" component={ViewAllPost} />
        <Stack.Screen name="FinalizeItem" component={FinalizeItem} />
        <Stack.Screen name="FinalizePost" component={FinalizePost} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="UserWonItems" component={WinnerItems} />
        <Stack.Screen name="UsersItems" component={UsersItems} />
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{ token: token }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          initialParams={{ token: token }}
        />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
