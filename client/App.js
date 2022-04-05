import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";
import { MainStackNavigatorlogin } from "./navigation/StackNavigator";
function App() {
  return (
    <NavigationContainer>
     <MainStackNavigatorlogin />
  </NavigationContainer>
  );
}

export default App;