import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Opportunities from "./screens/Opportunities";
import OpportunityDetails from "./screens/OpportunityDetails";
import Profile from "./screens/Profile";
import Activities from "./screens/Activities";
import Saved from "./screens/Saved";
import { AppDataProvider } from "./context/AppContext";
import theme from "./theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppDataProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: "fade",
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
            freezeOnBlur: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Opportunities" component={Opportunities} />
          <Stack.Screen
            name="OpportunityDetails"
            component={OpportunityDetails}
          />
          <Stack.Screen name="Activities" component={Activities} />
          <Stack.Screen name="Saved" component={Saved} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppDataProvider>
  );
}
