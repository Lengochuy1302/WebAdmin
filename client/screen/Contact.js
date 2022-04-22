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
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Swipeout from "react-native-swipeout";
import { RadioButton } from "react-native-paper";
const Width = Dimensions.get("screen").width - 20;
const Height = Dimensions.get("screen").height;
const Width1 = Dimensions.get("screen").width;
const Height1 = Dimensions.get("screen").height;
const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPagetNumber] = useState(1);
  const [tenSanPham, setTenSanPham] = useState("");
  const [masosv, setmasosv] = useState("");
  const [masosvs, setmasosvs] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");
  const [sdts, setsdts] = useState("");
  const [emails, setemails] = useState("");
  const [giaSanPham, setGiaSanPham] = useState("");
  const [diachi, setdiachi] = useState("");
  const [hinhanh, sethinhanh] = useState("");
  const [value, setValue] = React.useState("Nam");
  const [values, setValues] = React.useState("Nam");
  const [tenSanPhams, setTenSanPhams] = useState("");
  const [giaSanPhams, setGiaSanPhams] = useState("");
  const [diachis, setdiachis] = useState("");
  const [hinhanhs, sethinhanhs] = useState("");
  const [iditem, setidItem] = useState("");
  const [sotrang, setsotrang] = useState(1);
  const [image, setImage] = useState(
    "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
  );

  const [images, setImages] = useState(
    "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
  );

  const getDataID = async () => {
    try {
      const value = await AsyncStorage.getItem("iduser");
      if (value !== null) {
        console.log("ID USER " + value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const picktrangsau = () => {
    setsotrang(sotrang + 1);
    setPagetNumber(sotrang);
    getData();
  };

  const picktrangtruoc = () => {
    if (1 < sotrang) {
      setsotrang(sotrang - 1);
      setPagetNumber(sotrang);
      getData();
    }
    setPagetNumber(sotrang);
    getData();
    return;
  };

  const onRefresh = () => {
    setLoading(true);
    getData();
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblec, setModalVisiblec] = useState(false);
  const imagev = [
    "https://github.com/Lengochuy1302/RoomSearchProject/blob/master/app/src/main/res/drawable/a03.png?raw=true",
    "https://github.com/Lengochuy1302/RoomSearchProject/blob/master/app/src/main/res/drawable/a02.png?raw=true",
    "https://github.com/Lengochuy1302/RoomSearchProject/blob/master/app/src/main/res/drawable/a01.png?raw=true",
    "https://github.com/Lengochuy1302/RoomSearchProject/blob/master/app/src/main/res/drawable/logoo1.jpg?raw=true",
  ];
  const getData = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.41:8000/dssp/" + pageNumber,
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    getData();
    getDataID();
  }, []);

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 97,
          backgroundColor: "#fff",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            width: 40,
            height: 40,
            borderRadius: 50,
            marginTop: 63,
            marginLeft: 13,
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Entypo name="list" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            flex: 1,
            height: 40,
            borderRadius: 50,
            marginTop: 68,
            marginLeft: 45,
            fontSize: 15,
            fontWeight: "700",
            color: "#000",
          }}
        >
          AETH ROOM
        </Text>
        <View
          style={{
            flex: 1,
            width: 40,
            height: 40,
            borderRadius: 50,
            marginTop: 70,
            marginLeft: 13,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Yêu thích")}>
            <Text
              style={{
                height: 40,
                marginEnd: 15,
                alignSelf: "flex-end",
                marginTop: -2,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 0, marginTop: 0, height: "89%" }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.slidev}
        >
          {imagev.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={styles.slide}
              source={{ uri: e }}
            />
          ))}
        </ScrollView>
        <View style={{ padding: 10, marginTop: 0, height: "70%" }}>
          <View>
            <Text style={{ marginTop: -15, fontSize: 20, marginBottom: 10 }}>
              <MaterialIcons name="security" size={17} color="black" /> Phòng
              trọ
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
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
                          uri: "http://192.168.1.41:8000/upload/" + item.image,
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.243)",
                          width: Width / 2.3,
                          height: Height * 0.19,
                          position: "absolute",
                          borderRadius: 10,
                        }}
                      ></View>
                    </View>
                    <View
                      style={{
                        marginTop: 35,
                        marginLeft: 5,
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
              )}
              onRefresh={onRefresh}
              progressViewOffset={100}
              refreshing={isLoading}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Button
              onPress={() => picktrangtruoc()}
              title="⇦ Trước"
              color="black"
              accessibilityLabel="Trang trước"
            />
            <View
              style={{
                width: 190,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "orange",
                }}
              ></Text>
            </View>
            <Button
              onPress={() => picktrangsau()}
              title="Sau ⇨"
              color="black"
              accessibilityLabel="Trang sau"
            />
          </View>
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
    width: Width / 2.3,
    height: Height * 0.19,
    borderRadius: 10,
  },
  slidev: {
    width: Width1,
    height: Height * 0.35,
    marginBottom: 15,
  },
});
