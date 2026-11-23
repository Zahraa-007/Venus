import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import home from "./screens/home";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
          contentStyle: {
            backgroundColor: "#0F172A",
          },
        }}
      >
        <Stack.Screen name="Home" component={home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
