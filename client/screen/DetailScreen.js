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
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

const Width = Dimensions.get("screen").width - 20;
const Height = Dimensions.get("screen").height;
const Width1 = Dimensions.get("screen").width;
const Height1 = Dimensions.get("screen").height;

const DetailScreen = ({ route }) => {
  const [idtaikhoan, setidtaikhoan] = useState("");
  const [idphongtro, setidphongtro] = useState("");
  // var IdRoom = JSON.stringify(idRoom);

  // var itemnew = {
  //   idRoom: idRoom,
  //   image: image,
  //   tenPhong: tenPhong,
  //   giaPhong: giaPhong,
  //   loaiPhong: loaiPhong,
  //   chieuDai: chieuDai,
  //   chieuRong: chieuRong,
  //   giaNuoc: giaNuoc,
  //   giaDien: giaDien,
  //   mota: mota,
  //   tinh: tinh,
  //   quan: quan,
  //   phuong: phuong,
  //   duong: duong,
  //   user: user,
  //   gioiTinh: gioiTinh,
  //   ngayTao: ngayTao,
  //   luotXem: luotXem,
  // };
  // DATA2.push(itemnew);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState([]);
  const getData = async (id) => {
    try {
      const response = await fetch("http://192.168.1.25:8000/dssv/" + id);
      const json = await response.json();
      console.log("data:", json[0].idroom);
      console.log("data:", json[0].luotXem);
      setData(json);
      setDataView(json[0].idroom, json[0].luotXem);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getDataImg = async (id) => {
    try {
      const response = await fetch(
        "http://192.168.1.25:8000/getlisstimg/" + id,
      );
      const json = await response.json();
      console.log("list img:", json);
      setDataImg(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setDataView = async (idrom, viewcount) => {
    fetch("http://192.168.1.25:8000/updateView", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idRoomView: idrom,
        viewCount: viewcount + 1,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      return response.json();
    });
  };

  useEffect(() => {
    AsyncStorage.getItem("iduser").then((value) => {
      console.log("id tai khoan: ", value);
      setidtaikhoan(value);
    });

    AsyncStorage.getItem("keyidroom").then((value) => {
      console.log("id phong: ", value);
      setidphongtro(value);
      getData(value);
      getDataImg(value);
    });
  }, []);

  const addYeuThich = () => {
    console.log("id phong: ", idphongtro);
    fetch("http://192.168.1.25:8000/yeuthich", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taikhoan: idtaikhoan,
        phongtro: idphongtro,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        Alert.alert("Thông báo", "" + res.message);
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <View style={{ fontSize: 17, padding: 0, height: "100%" }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.idRoom}
            renderItem={({ item }) => {
              return (
                <View style={{ fontSize: 17, marginBottom: 0 }}>
                  <ScrollView style={{ height: Height + Height / 2 }}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      style={styles.slide}
                    >
                      {dataImg.map((e, index) => (
                        <Image
                          key={e}
                          resizeMode="stretch"
                          style={styles.slideimg}
                          source={{
                            uri: "http://192.168.1.25:8000/upload/" + e.tenhinh,
                          }}
                        />
                      ))}
                    </ScrollView>

                    <View
                      style={{
                        backgroundColor: "#000",
                        opacity: 0.5,
                        width: Width,
                        margin: 10,
                        height: 27,
                        position: "absolute",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    ></View>
                    <View
                      style={{
                        marginTop: -227,
                        marginLeft: 15,
                        flexDirection: "row",
                      }}
                    >
                      <Ionicons name="md-eye-outline" size={20} color="white" />
                      <Text
                        style={{
                          marginTop: 2,
                          fontSize: 17,
                          marginLeft: 3,
                          color: "#fff",
                        }}
                      >
                        {item.luotXem}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#000",
                        opacity: 0.5,
                        width: Width,
                        margin: 10,
                        marginTop: 185,
                        height: 45,
                        position: "absolute",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        position: "absolute",
                        marginTop: 195,
                        marginLeft: 20,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          color: "#fff",
                          position: "absolute",
                          textAlign: "left",
                          fontSize: 25,
                          fontWeight: "800",
                        }}
                      >
                        {item.tenPhong}
                      </Text>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          marginTop: 3,
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "flex-end",
                            marginRight: 20,
                          }}
                        >
                          <AntDesign
                            onPress={() => addYeuThich()}
                            name="hearto"
                            size={24}
                            color="white"
                          />
                          <View style={{ marginLeft: 10 }}></View>
                          <AntDesign
                            onPress={() => alert("đã chọn share")}
                            name="sharealt"
                            size={24}
                            color="white"
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        marginTop: 245,
                        marginLeft: 20,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          marginLeft: -13,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000a6",
                            fontSize: 20,
                            fontWeight: "700",
                          }}
                        >
                          Giá phòng
                        </Text>
                        <Text
                          style={{
                            color: "green",
                            fontSize: 17,
                            fontWeight: "600",
                          }}
                        >
                          {item.giaPhong.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000a6",
                            fontSize: 20,
                            fontWeight: "700",
                          }}
                        >
                          Tình trạng
                        </Text>
                        <Text
                          style={{
                            color: "red",
                            fontSize: 17,
                            fontWeight: "600",
                          }}
                        >
                          Còn
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000a6",
                            fontSize: 20,
                            fontWeight: "700",
                          }}
                        >
                          Diện tich
                        </Text>
                        <Text
                          style={{
                            color: "blue",
                            fontSize: 17,
                            fontWeight: "600",
                          }}
                        >
                          {item.chieuDai * item.chieuRong}m²
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        position: "absolute",
                        marginTop: 300,
                        marginLeft: 20,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 50,
                          alignItems: "center",
                        }}
                      >
                        <Entypo name="water" size={24} color="deepskyblue" />
                        <Text
                          style={{
                            color: "black",
                            fontSize: 17,
                            marginTop: 5,
                            fontWeight: "600",
                          }}
                        >
                          {item.giaPhong.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          marginRight: 55,
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="lightbulb-outline"
                          size={25}
                          color="black"
                        />
                        <Text
                          style={{
                            color: "black",
                            fontSize: 17,
                            marginTop: 5,
                            fontWeight: "600",
                          }}
                        >
                          {item.giaDien.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        width: Width,
                        marginTop: 405,
                        marginLeft: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000a6",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: "700",
                        }}
                      >
                        Địa chỉ:
                      </Text>
                      <Text
                        style={{
                          color: "#000000a6",
                          textAlign: "left",
                          fontSize: 17,
                          marginTop: 5,
                          fontWeight: "600",
                        }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={20}
                          color="black"
                        />{" "}
                        {item.duong}, {item.phuong}, {item.quan}, {item.tinh}
                      </Text>
                      <Text
                        style={{
                          color: "#000000a6",
                          textAlign: "left",
                          fontSize: 17,
                          marginTop: 10,
                          fontWeight: "600",
                        }}
                      >
                        <Entypo name="back-in-time" size={20} color="black" />{" "}
                        {item.ngayTao}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        width: Width,
                        marginTop: 495,
                        marginLeft: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000a6",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: "700",
                        }}
                      >
                        Mô tả:
                      </Text>
                      <Text
                        style={{
                          color: "#000000a6",
                          textAlign: "left",
                          fontSize: 17,
                          width: Width - 20,
                          marginTop: 5,
                          fontWeight: "600",
                        }}
                      >
                        {item.moTa}
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
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
    margin: 10,
    width: Width,
    height: 220,
  },
  slideimg: {
    borderRadius: 10,
    width: Width,
    height: 220,
  },
});
