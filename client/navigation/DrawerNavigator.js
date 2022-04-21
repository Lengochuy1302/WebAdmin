// ./navigation/DrawerNavigator.js

import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../screen/HomeScreen";
import { ContactStackNavigator } from "./StackNavigator";
import { MaterialIcons } from "@expo/vector-icons";
import Contact from "../screen/Contact";
import { Alert } from "react-native";
import SettingScreen from "../screen/Setting";
const Drawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#f57c00",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons name="exit-to-app" size={24} color="#05375a" />
        )}
        label="Đăng xuất"
        onPress={() => props.navigation.navigate("Login Screen")}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={screenOptionStyle}
    >
      <Drawer.Screen name="Yêu thích" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const DrawerNavigatorquanly = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={screenOptionStyle}
    >
      <Drawer.Screen
      options={{
        headerShown: false,
      }}
      name="Trang chủ" component={Contact} />
            <Drawer.Screen
      name="Yêu thích" component={HomeScreen} />

<Drawer.Screen
      name="Chat" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export { DrawerNavigator, DrawerNavigatorquanly };
