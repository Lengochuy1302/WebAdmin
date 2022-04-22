import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import Swipeout from 'react-native-swipeout';
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FlatGrid } from 'react-native-super-grid';
const Width = Dimensions.get("screen").width - 230;
const Height = Dimensions.get("screen").height;
const Width1 = Dimensions.get("screen").width;
const Height1 = Dimensions.get("screen").height;

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [getidtk, setidtk] = useState("");
  const getData = async (idtk) => {
      console.log("kkks");
    try {
      const response = await fetch(
        "http://172.16.10.166:8000/getdatayeuthich/" +idtk,
      );
      const json = await response.json();
      console.log("danh sach: ",json);
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

 const removeSanPham = (id) => {
  console.log("Remove san pham");
  fetch("http://172.16.10.166:8000/removeyeuthich", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idrom: id,
      iduser: getidtk,
    }),
  })
  onRefresh();
};
  const onRefresh = () => {
    setLoading(true);
    AsyncStorage.getItem("iduser").then((value) => {
      setidtk(value);
      getData(value);
    });
  };
  const rendericongioitinh = (name) => {
    console.log("source: ", name);
    if (name === "Cả Hai") {
      return <Ionicons name="male-female" size={17} color="#11cf33" />;
    } else if (name === "Nữ") {
      return <Foundation name="female-symbol" size={17} color="#e64080" />;
    } else {
      return <Foundation name="male-symbol" size={17} color="#39b5db" />;
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("iduser").then((value) => {
      setidtk(value);
      getData(value);
    });

  }, []);

  return (
    <View>
      <View style={{ padding: 0, marginTop: 0, height: "100%" }}>
        <View style={{ padding: 10, marginTop: 0, height: "100%" }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Swipeout
                style={{
                  marginBottom: 10,
                  height: Height1 * 0.19,
                  borderRadius: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                right={[
                  {
                    onPress: () => {
                      Alert.alert(
                        "Cảnh báo",
                        "Bạn muốn xóa nó?",
                        [
                          {
                            text: "No",
                            onPress: () => console.log("Cancel"),
                            style: "cancel",
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              removeSanPham(item.idroom)
                            },
                          },
                        ],
                        { cancelable: true }
                      );
                    },
                    backgroundColor: "#FF6666",
                    text: "Xóa",
                  },
                  
                ]}
                >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      "Chi tiết phòng",
                      AsyncStorage.setItem("keyidroom", item.idroom),
                    )
                  }
                >
                  <View
                    style={{
                      fontSize: 17,
                      marginBottom: 10,
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Image
                        style={styles.slidet}
                        source={{
                          uri: "http://172.16.10.166:8000/upload/" + item.image,
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.243)",
                          width: Width / 1.17,
                          height: Height * 0.19,
                          position: "absolute",
                          borderRadius: 10,
                        }}
                      ></View>
                    </View>
                    <View
                      style={{
                        marginTop: 35,
                        marginLeft: 10,
                        fontSize: 20,
                        marginBottom: 15,
                        
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          marginBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#adadad",
                          }}
                        >
                          {item.idLoaiPhong}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 5,
                          }}
                        >
                          {rendericongioitinh(item.gioiTinh)}
                        </Text>
                        <Text
                          style={{
                            marginLeft: '30%',
                            fontSize: 16,   
                            color: "#adadad",
                       
                          }}
                        >
                         <FontAwesome5 name="eye" size={17} color="#adadad" /> {item.luotXem}
                        </Text>

                      </View>

                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: "bold",
                          color: "orange",
                          marginBottom: 5,
                        }}
                      >
                        {item.tenPhong}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginBottom: 5,
                        }}
                      >
                        <Text
                          style={{
                        color: "red"
                       
                          }}
                        >
                           {item.giaPhong.toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                        </Text>
                        <Text
                          style={{
                        marginLeft:"30%",
                        color: "green"
                          }}
                        >
                         {item.chieuDai * item.chieuRong}m²
                        </Text>
                      </View>
                      <Text
                       style={{
                        width: '65%'
                      }}
                      >
                      {item.duong}, {item.phuong}, {item.quan},
                        {item.tinh}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                </Swipeout>
              )}
              onRefresh={onRefresh}
              progressViewOffset={100}
              refreshing={isLoading}
            />
          )}
        </View>
      </View>
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
    width: Width1,
    height: Height * 0.25,
  },
  slidet: {
    width: Width / 1.17,
    height: Height * 0.19,
    borderRadius: 10,
  },
  slidev: {
    width: Width1,
    height: Height * 0.35,
    marginBottom: 15,
  },
});