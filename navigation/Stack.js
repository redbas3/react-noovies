import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => navigate("Two")}
    >
      <Text>One</Text>
    </TouchableOpacity>
  );
};
const ScreenTwo = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => navigate("Three")}
    >
      <Text>Two</Text>
    </TouchableOpacity>
  );
};
const ScreenThree = ({ navigation: { navigate, goBack, setOptions } }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => navigate("Tabs", { screen: "Search" })}
    >
      <Text>Change Title</Text>
    </TouchableOpacity>
  );
};

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen
      name="Two"
      component={ScreenTwo}
      options={{
        title: "Changed",
      }}
    />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
