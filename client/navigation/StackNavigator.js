import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import HomeScreen from "../screen/HomeScreen";
import DetailScreen from "../screen/DetailScreen";
import SignupScreen from "../screen/SignUpScreen";
import Contact from "../screen/Contact";
import SplashScreen from "../screen/SplashScreen";
import { Button, Alert } from "react-native";
import TabNavigator from "./TabNavigator";
import SettingScreen from "../screen/Setting";
import {DrawerNavigatorquanly} from "./DrawerNavigator";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#f57c00",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigatorlogin = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Splash"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login Screen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup Screen"
        component={SignupScreen}
      />
      <Stack.Screen name="Chi tiết sinh viên" 
      component={DetailScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Trang Chủ"
        component={TabNavigator}
      />
      <Stack.Screen
        options={{ headerLeft: false, headerShown: false }}
        name="Quản lý"
        component={DrawerNavigatorquanly}
      />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Trang Chủ"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Trang Chủ"
        component={HomeScreen}
        options={{
          headerLeft: false,
          headerRight: () => (
            <Button
              onPress={() => Alert.alert("Thông báo!", "Thêm ở dưới kìa!")}
              title="Thêm"
              color="white"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{
          headerLeft: false,
          headerShown: false,
        }}
        name="Cài đặt"
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigatorlogin, MainStackNavigator, ContactStackNavigator };
