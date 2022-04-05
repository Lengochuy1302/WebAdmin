import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import {DrawerNavigator} from "./DrawerNavigator";
import { Ionicons } from '@expo/vector-icons';
import Contact from "../screen/Contact";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={
        ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = focused
              ? 'ios-information-circle-outline'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Quản lý') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f57c00',
        tabBarInactiveTintColor: 'gray',
      })
    }
    >
      <Tab.Screen options={{
                    tabBarIcon: () => (<Image source={require("./../assets/25694.png")} style={{width: 20, height: 20}} />)
                , headerShown: false}} name="Trang chủ" component={DrawerNavigator} />
      <Tab.Screen    options={{ headerStyle: {
    backgroundColor: "#f57c00",
  },  headerTintColor: "white",
                    tabBarIcon: () => (<Image source={require("./../assets/640px-Windows_Settings_app_icon.png")} style={{width: 20, height: 20}} />)
                , }}
                 name="Cài đặt" component={ContactStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;