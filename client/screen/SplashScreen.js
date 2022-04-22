import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logo from "../assets/AETHHOUSE.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
const BGColor = "#4D4A95";

export default function SplashScreen({ navigation }) {
  const edges = useSafeAreaInsets();

  const startAnimation = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const getDataUser = async () => {
      try {
        const taikhoan = await AsyncStorage.getItem('user')
        const matkhau = await AsyncStorage.getItem('pass')
        if(taikhoan !== null && matkhau !== null) {
          navigation.navigate('Quản lý');
        }else {
          navigation.navigate('Login Screen')
        }
        
      } catch(e) {
       
      }
    }
  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 175),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: 0,
            y: Dimensions.get("window").height / 2 - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y: Dimensions.get("window").height / 2 - 35,
          },
          useNativeDriver: true,
        }),
      ]).start();
      setTimeout(() => {
        getDataUser()
        },700);
      }, 1500);
  }, []);
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          zIndex: 1,
          backgroundColor: 'white',
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            marginTop: 400,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={Logo}
            style={{
              width: 500,
              height: 500,
              marginBottom: 5,
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                { scale: scaleLogo },
              ],
            }}
          ></Animated.Image>
          <Animated.Text
            style={{
              fontSize: 45,
              fontWeight: "bold",
              color: "black",
              transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
            }}
          >
            Hi Room !
          </Animated.Text>
          <Animated.Text
            style={{
              fontSize: 30,
              color: "black",
              transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
            }}
          >
            Ứng dụng Tìm Kiếm Phòng Trọ
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >

      </Animated.View>
    </View>
  );
}
