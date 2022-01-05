import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from '../screens/Home';
import Item from '../screens/Item';
import AddItem from '../screens/AddItem';
import UsersItems from '../screens/UsersListedItems';
import WinnerItems from '../screens/UserWonItems';
import Login from '../screens/Login';
import UserInfo from '../screens/UserInfo';
import Register from '../screens/Register';
import Discover from '../screens/Discover';
import LogoButton from '../screens/LogoButton';
import Cart from '../screens/Cart';
import Account from '../screens/Account';

const Stack = createStackNavigator();

const HomeStack = ({ token, initial }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial} headerMode={null}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="LogoButton" component={LogoButton} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="AddItem" component={AddItem} />
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
