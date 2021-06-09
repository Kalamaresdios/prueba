import React from "react";
import Home from './screen/Home';
import DetalleItem from './screen/DetalleItem';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
          <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Detalle" component={DetalleItem} />
        </Stack.Navigator>
  </NavigationContainer>
  );
}