import React, { useState } from "react";
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
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
 
import { MaterialIcons } from '@expo/vector-icons';
var DATA2 = [];
const Width = Dimensions.get("screen").width - 20;
const Height = Dimensions.get("screen").height;
const Width1 = Dimensions.get("screen").width;
const Height1 = Dimensions.get("screen").height;

const DetailScreen = ({ route }) => {
  const {
    idRoom,
    image,
    tenPhong,
    giaPhong,
    loaiPhong,
    chieuDai,
    chieuRong,
    giaNuoc,
    giaDien,
    mota,
    tinh,
    quan,
    phuong,
    duong,
    user,
    gioiTinh,
    ngayTao,
    luotXem,
  } = route.params;
  DATA2 = [];
  const [idtaikhoan, setidtaikhoan] = useState("");
  const [idphongtro, setidphongtro] = useState("");
  var IdRoom = JSON.stringify(idRoom);
  AsyncStorage.getItem("iduser").then((value) => {
    setidtaikhoan(value);
    setidphongtro(IdRoom);
  });
  console.log("Tai khoan id " + idtaikhoan);
  console.log("Phong id " + idphongtro);
  var HinhAnh = JSON.stringify(image);
  var TenPhong = JSON.stringify(tenPhong);
  var GiaPhong = JSON.stringify(giaPhong);
  var LoaiPhong = JSON.stringify(loaiPhong);
  var ChieuDai = JSON.stringify(chieuDai);
  var ChieuRong = JSON.stringify(chieuRong);
  var GiaNuoc = JSON.stringify(giaNuoc);
  var GiaDien = JSON.stringify(giaDien);
  var MoTa = JSON.stringify(mota);
  var Tinh = JSON.stringify(tinh);
  var Quan = JSON.stringify(quan);
  var Phuong = JSON.stringify(phuong);
  var Duong = JSON.stringify(duong);
  var User = JSON.stringify(user);
  var GioiTinh = JSON.stringify(gioiTinh);
  var NgayTao = JSON.stringify(ngayTao);
  var LuotXem = JSON.stringify(luotXem);
  var itemnew = {
    idRoom: JSON.parse(IdRoom),
    image: JSON.parse(HinhAnh),
    tenPhong: JSON.parse(TenPhong),
    giaPhong: JSON.parse(GiaPhong),
    loaiPhong: JSON.parse(LoaiPhong),
    chieuDai: JSON.parse(ChieuDai),
    chieuRong: JSON.parse(ChieuRong),
    giaNuoc: JSON.parse(GiaNuoc),
    giaDien: JSON.parse(GiaDien),
    mota: JSON.parse(MoTa),
    tinh: JSON.parse(Tinh),
    quan: JSON.parse(Quan),
    phuong: JSON.parse(Phuong),
    duong: JSON.parse(Duong),
    user: JSON.parse(User),
    gioiTinh: JSON.parse(GioiTinh),
    ngayTao: JSON.parse(NgayTao),
    luotXem: JSON.parse(LuotXem),
  };
  function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
 }
  DATA2.push(itemnew);
  const addYeuThich = () => {
    fetch("http://192.168.1.137:8000/yeuthich", {
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
            data={DATA2}
            keyExtractor={(item) => item.idRoom}
            renderItem={({ item }) => {
              return (
                <View style={{ fontSize: 17, marginBottom: 0 }}>
                  <Image
                    style={styles.slide}
                    source={{
                      uri: "http://192.168.1.137:8000/upload/" + item.image,
                    }}
                  />
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
                      flexDirection: "row"
                    }}
                  >
                    <View
                     style={{
                      flex: 1,
                      marginLeft: -13,
                     alignItems: "center"
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
                        {item.giaPhong.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}
                      </Text>
                    </View>
                    <View
                     style={{
                    flex: 1,
                     alignItems: "center"
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
                     alignItems: "center"
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
                        {item.chieuDai*item.chieuRong}m²
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      marginTop: 300,
                      marginLeft: 20,
                      flexDirection: "row"
                    }}
                  >
                    <View
                     style={{
                      flex: 1,
                      marginLeft: 50,
                     alignItems: "center"
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
                        {item.giaPhong.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}
                      </Text>
                    </View>
                    <View
                     style={{
                    flex: 1,
                    marginRight: 55,
                     alignItems: "center"
                    }}
                    >
<MaterialIcons name="lightbulb-outline" size={25} color="black" />
                      <Text
                        style={{
                          color: "black",
                          fontSize: 17,
                          marginTop: 5,
                          fontWeight: "600",
                        }}
                      >
                       {item.giaDien.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}
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
                <Ionicons name="location-outline" size={20} color="black" /> {item.duong}, {item.phuong}, {item.quan}, {item.tinh}
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
               <Entypo name="back-in-time" size={20} color="black" /> {item.ngayTao}
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
                        width: Width-20,
                        marginTop: 5,
                        fontWeight: "600",
                      }}
                  >
                 {item.mota}
                  </Text>
                  </View>
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
});
