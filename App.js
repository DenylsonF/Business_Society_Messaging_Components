import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import LoginScreen from './Components/Authorization/Login'
import Home from './Components/Authorization/Home'
import Signup from './Components/Authorization/SignUp'
import AddRoom from './Components/Authorization/AddRoom'
import { IconButton } from 'react-native-paper'
import Room from './Components/Authorization/Room'


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer >
        <Stack.Navigator initialRouteName = 'Login' >
          <Stack.Screen
            name = 'Login'
            component = {LoginScreen}
          />

          <Stack.Screen
            name = 'Home'
            component = {Home}
            options = {({navigation}) => ({
              headerRight: () =>{
                < IconButton 
                    icon = 'message-plus'
                    size = {28}
                    color = '#f492d3'
                    onPress = {() => navigation.navigate('Add Room')}
                />
              },
            })}
          />

          <Stack.Screen
            name = 'Sign Up'
            component = {Signup}
          />

          <Stack.Screen
            name = 'Add Room'
            component = {AddRoom}
          />

          <Stack.Screen
            name = 'Room'
            component = {Room}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
