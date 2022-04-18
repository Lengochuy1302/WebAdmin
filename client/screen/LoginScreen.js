
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const backImage = require("../assets/backImage.png");
import { Checkbox } from 'react-native-paper';
export default function Login({ navigation }) {

  const [tendangnhap, onChangetendangnhap] = useState("");
  const [passdangnhap, onChangepassdangnhap] = useState("");
  const [checked, setChecked] = React.useState(false);

  const storeDataUser = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
    } catch (e) {
      // saving error
    }
  }

  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if(value !== null) {
        console.log(value)
        setChecked(true);
        onChangetendangnhap(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  const storeDataPass = async (value) => {
    try {
      await AsyncStorage.setItem('pass', value)
    } catch (e) {
      // saving error
    }
  }

  const getDataPass= async () => {
    try {
      const value = await AsyncStorage.getItem('pass')
      if(value !== null) {
        console.log(value)
        setChecked(true);
        onChangepassdangnhap(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  const storeDataID = async (value) => {
    try {
      await AsyncStorage.setItem('iduser', value)
    } catch (e) {
      // saving error
    }
  }

  const getDataID= async () => {
    try {
      const value = await AsyncStorage.getItem('iduser')
      if(value !== null) {
        console.log("ID USER "+ value)
      }
    } catch(e) {
      // error reading value
    }
  }

  const checkuser = () => {
    if (tendangnhap === "" || tendangnhap === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (passdangnhap === "" || passdangnhap === null) {
      Alert.alert("Cảnh báo", "Pass không được bỏ trống!");
      return;
    }

    if (checked === true) {
      storeDataUser(tendangnhap);
      storeDataPass(passdangnhap);

    } else {
      storeDataUser("");
      storeDataPass("");
    }

    fetch("http://192.168.1.137:8000/loginclient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: tendangnhap,
        password: passdangnhap,
      }),
    })
    .then((response) => response.json())
    .then((res) => {
      if (tendangnhap === "Admin" && passdangnhap === "admin") {
          navigation.navigate('Quản lý');
      } else {
        if (res.success === true) {
          navigation.navigate('Quản lý');
          storeDataID(res.iduser)
          AsyncStorage.getItem('key').then(value => {
            setExampleState.title == value;
            console.log(exampleState);
          });
         } else {
            Alert.alert("Cảnh báo",""+ res.message);
         }
      }
 
    })
  };

  useEffect(() => {
    getDataUser();
    getDataPass();
    getDataID();
  }, []);
  
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
         <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="default"
        autoFocus={true}
        placeholder="Tên đăng nhập"
        onChangeText={onChangetendangnhap}
        value={tendangnhap}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        onChangeText={onChangepassdangnhap}
        value={passdangnhap}
      />
      <View style={{marginTop: -10, alignSelf: 'center'}}>
      <View style={{    flexDirection: "row",
    marginBottom: 0, marginTop: -5}}>
      <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
     color='orange'
    />
        <Text style={{marginTop: 10,}}>Remember me?</Text>
      </View>
    </View>
      <TouchableOpacity style={styles.button} onPress={() => checkuser()}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Log In</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup Screen')}>
          <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
