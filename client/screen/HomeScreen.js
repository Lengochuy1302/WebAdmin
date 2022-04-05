import React, { useEffect, useState } from "react";
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
  ScrollView,
  Image,
} from "react-native";

import { FlatGrid } from 'react-native-super-grid';
const Width = Dimensions.get("screen").width - 230;
const Height = Dimensions.get("screen").height;
const Width1 = Dimensions.get("screen").width;
const Height1 = Dimensions.get("screen").height;

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  const getData = async () => {
    try {
      const response = await fetch(
        "http://172.16.10.52:8000/ds"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
 }

  const onRefresh = () => {
    setLoading(true);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1, paddingLeft: 9, paddingRight: 9, paddingTop: 8, marginTop: 0 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatGrid
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            
              <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("Chi tiết sinh viên", {
              //     id: item.id,
              //     ten: item.ten,
              //     tuoi: item.tuoi,
              //     diachi: item.diachi,
              //     hinhanh: item.hinhanh,
              //     sex: item.sex,
              //     mssv: item.mssv,
              //     sdt: item.sdt,
              //     gmail: item.gmail,
              //   })
              // }
              >
                     <View style={{fontSize: 17, marginBottom: 0 }}>
                  <Image style={styles.slide} source={{ uri: "http://172.16.10.52:8000/upload/" +  item.image}} />
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.243)",
                      width: Width,
                      height: Height * 0.25,
                      position: "absolute",
                      borderRadius: 10,
                    }}
                  >

                  </View>
                  <Text
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "absolute",
                      width: Width,
                      marginTop:130,
                      marginLeft: 5,
                      textAlign: 'left',
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    {item.tenPhong}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "absolute",
                      width: Width,
                      marginTop:160,
                      marginLeft: 5,
                      textAlign: 'left',
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    Giá: {item.giaPhong}    S: {item.chieuDai*item.chieuRong}m²
                  </Text>
                  <Text
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "absolute",
                      width: Width,
                      marginTop:175,
                      marginLeft: 5,
                      textAlign: 'left',
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    Giới tính: {item.gioiTinh}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "absolute",
                      width: Width,
                      marginTop:190,
                      marginLeft: 5,
                      textAlign: 'left',
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    Đ/c: {item.tinh}, {item.quan}, {item.puong}, {item.duong}
                  </Text>

                </View>
              </TouchableOpacity>

            ////////////
          )}
          onRefresh={onRefresh}
          progressViewOffset={100}
          refreshing={isLoading}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  fixToText: {
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
  },
  modalView: {
    margin: 0,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,

    alignItems: "center",
    shadowColor: "#000",
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
    width: "100%",
    elevation: 2,
  },
  input: {
    height: 40,
    width: "100%",
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  slide1: {
    width: Width1,
    height: Height1 * 0.35,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  slide: {
    borderRadius: 10,
    width: Width,
    height: Height * 0.25,
  },
});
