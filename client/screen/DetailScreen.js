import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  StyleSheet,
  Image,
} from "react-native";

var DATA2 = [];
const Width = Dimensions.get('screen').width - 20;
const Height = Dimensions.get('screen').height;
const Width1 = Dimensions.get('screen').width;
const Height1 = Dimensions.get('screen').height;

const DetailScreen = ({ route }) => {
  const { id, ten, tuoi, diachi, hinhanh, sex, mssv, sdt, gmail } = route.params;
  var Id = JSON.stringify(id);
  var Ten = JSON.stringify(ten);
  var Tuoi = JSON.stringify(tuoi);
  var DiaChi = JSON.stringify(diachi);
  var Hinhanh = JSON.stringify(hinhanh);
  var Sex = JSON.stringify(sex);
  var Mssv = JSON.stringify(mssv);
  var Sdt = JSON.stringify(sdt);
  var Gmail = JSON.stringify(gmail);
  DATA2 = [];
  var itemnew = {
    id: JSON.parse(Id),
    ten: JSON.parse(Ten),
    tuoi: JSON.parse(Tuoi),
    diachi: JSON.parse(DiaChi),
    hinhanh: JSON.parse(Hinhanh),
    sex: JSON.parse(Sex),
    mssv: JSON.parse(Mssv),
    sdt: JSON.parse(Sdt),
    gmail: JSON.parse(Gmail),
  };
  DATA2.push(itemnew);

  console.log(DATA2);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={{ fontSize: 17, padding: 0, height: '100%' }}>
          <FlatList
            data={DATA2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{fontSize: 17, marginBottom: 0 }}>
                <Image style={styles.slide} source={{ uri: item.hinhanh }} />
                <View
                  style={{
                    backgroundColor: "#ffffff20",
                    width: Width,
                    margin: 10,
                    height: 445,
                    position: "absolute",
                    borderRadius: 20,
                  }}
                >

                </View>



                <Text
                  style={{
                    color: "#000000a6",
                    position: "absolute",
                    width: 340,
                    marginTop:470,
                    marginLeft: 20,
                    textAlign: 'left',
                    fontSize: 40,
                    fontWeight: "900",
                  }}
                >
                  {item.ten}🌸
                </Text>
                <Text
                  style={{
                    color: "#000000a6",
                    position: "absolute",
                    marginTop:565,
                    marginLeft: 20,
                    fontSize: 23,
                    fontWeight: "700",
                  }}
                >
                MSSV: {item.mssv}
                </Text>
                <Text
                  style={{
                    color: "#000000a6",
                    position: "absolute",
                    width: Width,
                    marginTop:595,
                    marginLeft: 20,
                    textAlign: 'left',
                    fontSize: 23,
                    fontWeight: "700",
                  }}
                >
                  Age: {item.tuoi} / {item.sex}
                </Text>

                <Text
                  style={{
                    color: "#000000a6",
                    position: "absolute",
                    width: Width,
                    marginTop:630,
                    marginLeft: 20,
                    textAlign: 'left',
                    fontSize: 23,
                    fontWeight: "700",
                  }}
                >
                  Phone: {item.sdt}
                </Text>

                <Text
                  style={{
                    color: "#000000a6",
                    position: "absolute",
                    width: Width,
                    marginTop:695,
                    marginLeft: 20,
                    textAlign: 'left',
                    fontSize: 23,
                    fontWeight: "700",
                  }}
                >
                  Address: {item.diachi}
                </Text>

                <Text
                  style={{
                    color: "#000000a6",
                    position: "absolute",
                    width: Width,
                    marginTop:663,
                    marginLeft: 20,
                    textAlign: 'left',
                    fontSize: 23,
                    fontWeight: "700",
                  }}
                >
                  Email: {item.gmail}
                </Text>
              </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default DetailScreen

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 0,
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
  
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      marginTop: 10,
      width: '100%',
      elevation: 2,
    },
    input: {
      height: 40,
      width: '100%',
      margin: 5,
      borderWidth: 1,
      padding: 10,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    slide1: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginTop: 10
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    container: {
      flex: 1,
    },
    slide: {
      borderRadius: 20,
      margin: 10,
      width: Width,
      height: 445,
    },
  });