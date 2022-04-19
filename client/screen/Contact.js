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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Swipeout from "react-native-swipeout";
import { RadioButton } from "react-native-paper";
const Width = Dimensions.get("screen").width - 20;
const Height = Dimensions.get("screen").height;
const Width1 = Dimensions.get("screen").width;
const Height1 = Dimensions.get("screen").height;
import Logo from "../assets/list.png";
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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickImageSua = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages(result.uri);
    }
  };

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

  const huythem = () => {
    setImage(
      "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
    );
    setValue("Nam");
    setModalVisible(false);
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

  const addSanPham = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let sd = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (tenSanPham === "" || tenSanPham === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (giaSanPham === "" || giaSanPham === null) {
      Alert.alert("Cảnh báo", "Tuổi không được bỏ trống!");
      return;
    }

    if (masosv === "" || masosv === null) {
      Alert.alert("Cảnh báo", "MSSV không được bỏ trống!");
      return;
    }

    if (diachi === "" || diachi === null) {
      Alert.alert("Cảnh báo", "Địa chỉ không được bỏ trống!");
      return;
    }

    if (sdt === "" || sdt === null) {
      Alert.alert("Cảnh báo", "Số ĐT không được bỏ trống!");
      return;
    }

    if (sdt.length > 10 || sdt.length < 10) {
      Alert.alert("Cảnh báo", "Số ĐT không đúng!");
      return;
    }

    if (email === "" || email === null) {
      Alert.alert("Cảnh báo", "Email không được bỏ trống!");
      return;
    }

    if (!re.test(email)) {
      Alert.alert("Cảnh báo", "Email không hợp lệ!");
      return;
    }

    if (!sd.test(sdt)) {
      Alert.alert("Cảnh báo", "Số điện thoại không hợp lệ!");
      return;
    }

    if (tenSanPham.length < 5) {
      Alert.alert("Cảnh báo", "Tên của bạn quá ngắn");
      return;
    }
    if (parseInt(giaSanPham) < 0 || parseInt(giaSanPham) > 100) {
      Alert.alert("Cảnh báo", "Tuổi của bạn không đúng");
      return;
    }

    fetch("http://172.20.10.4:3000/addProduc", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ten: tenSanPham,
        tuoi: giaSanPham,
        diachi: diachi,
        hinhanh: image,
        gioitinh: value,
        mssv: masosv,
        sdt: sdt,
        email: email,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      return response.json();
    });
    onPressLearnMore(1);
    setModalVisible(!modalVisible);
    onPressLearnMore(1);
    onItemnull();
  };

  const suaSanPham = () => {
    if (tenSanPhams === "" || tenSanPhams === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (giaSanPhams === "" || giaSanPhams === null) {
      Alert.alert("Cảnh báo", "Tuổi không được bỏ trống!");
      return;
    }

    if (diachis === "" || diachis === null) {
      Alert.alert("Cảnh báo", "Địa chỉ không được bỏ trống!");
      return;
    }

    if (masosvs === "" || masosvs === null) {
      Alert.alert("Cảnh báo", "MSSV không được bỏ trống!");
      return;
    }

    if (sdts === "" || sdts === null) {
      Alert.alert("Cảnh báo", "Số ĐT không được bỏ trống!");
      return;
    }

    if (emails === "" || emails === null) {
      Alert.alert("Cảnh báo", "Email không được bỏ trống!");
      return;
    }

    if (tenSanPhams.length < 5) {
      Alert.alert("Cảnh báo", "Tên của bạn quá ngắn");
      return;
    }
    if (parseInt(giaSanPhams) < 0 || parseInt(giaSanPhams) > 100) {
      Alert.alert("Cảnh báo", "Tuổi của bạn không đúng");
      return;
    }

    console.log("Sửa san pham");
    fetch("http://172.20.10.4:3000/updateProduc", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: iditem,
        tens: tenSanPhams,
        tuois: giaSanPhams,
        diachis: diachis,
        hinhanhs: images,
        gioitinhs: values,
        mssvs: masosvs,
        sdts: sdts,
        emails: emails,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      return response.json();
    });
    onPressLearnMore(1);
    console.log("Update Done");
    onPressLearnMore(1);
    onItemnull();
    setModalVisiblec(!modalVisiblec);
  };

  const removeSanPham = (id) => {
    console.log("Remove san pham");
    fetch("http://172.20.10.4:3000/remove", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      return response.json();
      if (response == "ok") {
        alert(" insert thành công");
      }
    });
    onPressLearnMore(1);
    onPressLearnMore(1);
    onItemnull();
  };

  const onItemnull = () => {
    setTenSanPham(null);
    setGiaSanPham(null);
    setdiachi(null);
    sethinhanh(null);
    sethinhanhs(null);
    setTenSanPhams(null);
    setGiaSanPhams(null);
    setdiachis(null);
    setValue("Nam");
    setmasosv(null);
    setemail(null);
    setsdt(null);
    setmasosvs(null);
    setemails(null);
    setsdts(null);
    setImage(
      "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
    );
  };

  const onItem = (item) => {
    setModalVisiblec(true);
    setTenSanPhams(item.ten);
    setGiaSanPhams(item.tuoi);
    setdiachis(item.diachi);
    sethinhanhs(item.hinhanh);
    setImages(item.hinhanh);
    setValues(item.sex);
    setidItem(item.id);
    setmasosvs(item.mssv);
    setemails(item.gmail);
    setsdts(item.sdt);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblec, setModalVisiblec] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.137:8000/dssp/" + pageNumber,
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

  const onPressLearnMore = (getPage) => {
    setPagetNumber(getPage);
    console.log(pageNumber);
    getData();
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
          backgroundColor: "#f57c00",
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
            <Image style={{ width: 26, height: 26 }} source={Logo} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            flex: 1,
            height: 40,
            borderRadius: 50,
            marginTop: 68,
            marginLeft: 55,
            fontSize: 15,
            fontWeight: "700",
            color: "#fff",
          }}
        >
          Trang chủ
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
              <AntDesign name="hearto" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 10, marginTop: 0, height: "89%" }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chi tiết phòng", {
                    idRoom: item.idroom,
                    image: item.image,
                    tenPhong: item.tenPhong,
                    giaPhong: item.giaPhong,
                    loaiPhong: item.idLoaiPhong,
                    chieuDai: item.chieuDai,
                    chieuRong: item.chieuRong,
                    giaNuoc: item.giaNuoc,
                    giaDien: item.giaDien,
                    mota: item.moTa,
                    tinh: item.tinh,
                    quan: item.quan,
                    phuong: item.phuong,
                    duong: item.duong,
                    user: item.idUser,
                    gioiTinh: item.gioiTinh,
                    ngayTao: item.ngayTao,
                    luotXem: item.luotXem,
                  })
                }
              >
                <View style={{ fontSize: 17, marginBottom: 10 }}>
                  <Image
                    style={styles.slide}
                    source={{
                      uri: "http://192.168.1.137:8000/upload/" + item.image,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.243)",
                      width: Width,
                      height: Height * 0.25,
                      position: "absolute",
                      borderRadius: 10,
                    }}
                  ></View>
                  <Text
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "absolute",
                      width: Width,
                      marginTop: 120,
                      marginLeft: 5,
                      textAlign: "left",
                      fontSize: 25,
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
                      marginTop: 150,
                      marginLeft: 5,
                      textAlign: "left",
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    {item.giaPhong.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    - S: {item.chieuDai * item.chieuRong}m²
                  </Text>
                  <Text
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "absolute",
                      width: Width,
                      marginTop: 165,
                      marginLeft: 5,
                      textAlign: "left",
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    Loại phòng: {item.idLoaiPhong}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "absolute",
                      width: Width,
                      marginTop: 182,
                      marginLeft: 5,
                      textAlign: "left",
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
                      marginTop: 199,
                      marginLeft: 5,
                      textAlign: "left",
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    Đ/c: {item.tinh}, {item.quan}, {item.puong}, {item.duong}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            onRefresh={onRefresh}
            progressViewOffset={100}
            refreshing={isLoading}
          />
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView>
            <View
              style={{
                marginTop: "35%",
                marginLeft: 10,
                marginRight: 10,
                color: "black",
                borderRadius: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 25,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  height: 40,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#f57c00",
                  padding: 0,
                  marginBottom: 10,
                }}
              >
                THÊM SINH VIÊN
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -20,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 0,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 110,
                      height: 110,
                      marginBottom: 15,
                      borderRadius: 100,

                      zIndex: 1,
                    }}
                  />
                </TouchableOpacity>

                <View>
                  <Text
                    style={{
                      marginLeft: 12,
                      marginBottom: -10,
                    }}
                  >
                    Tên sinh viên:
                  </Text>
                  <TextInput
                    style={{
                      width: 200,
                      height: 40,
                      margin: 12,
                      color: "black",
                      backgroundColor: "#F6F7FB",
                      borderRadius: 10,
                      padding: 10,
                    }}
                    onChangeText={setTenSanPham}
                    keyboardType="default"
                  />

                  <Text
                    style={{
                      marginLeft: 12,
                      marginBottom: -10,
                    }}
                  >
                    Mã số SV:
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      margin: 12,
                      color: "red",
                      backgroundColor: "#F6F7FB",
                      borderRadius: 10,
                      padding: 10,
                    }}
                    onChangeText={setmasosv}
                    keyboardType="default"
                  />
                </View>
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Độ tuổi:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setGiaSanPham}
                keyboardType="number-pad"
              />
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Giới tính:
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => setValue(newValue)}
                value={value}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 20,
                    paddingBottom: 15,
                    paddingLeft: "7%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton value="Nam" />
                    <Text
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Nam
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "lightblue",
                      }}
                    >
                      {" "}
                      ♂
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton value="Nữ" />
                    <Text
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Nữ
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "pink",
                      }}
                    >
                      {" "}
                      ♀
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton value="Khác" />
                    <Text
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Khác
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "red",
                      }}
                    >
                      {" "}
                      ⚥
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Địa chỉ:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setdiachi}
                keyboardType="default"
              />
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Email:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setemail}
                keyboardType="default"
              />
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Số điện thoại:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setsdt}
                keyboardType="default"
              />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  title="Thêm sinh viên"
                  accessibilityLabel="Trang 1"
                  onPress={() => addSanPham()}
                />

                <Button
                  title="Hủy bỏ"
                  color="red"
                  accessibilityLabel="Trang 1"
                  onPress={() => huythem()}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisiblec}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisiblec(!modalVisiblec);
          }}
        >
          <ScrollView>
            <View
              style={{
                marginTop: "35%",
                marginLeft: 20,
                marginRight: 20,
                color: "black",
                borderRadius: 20,
                padding: 10,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 25,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  height: 40,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "green",
                  marginBottom: 10,
                }}
              >
                SỬA SINH VIÊN
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -20,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={pickImageSua}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 0,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={{ uri: images }}
                    style={{
                      width: 110,
                      height: 110,
                      marginBottom: 15,
                      borderRadius: 100,

                      zIndex: 1,
                    }}
                  />
                </TouchableOpacity>

                <View>
                  <Text
                    style={{
                      marginLeft: 12,
                      marginBottom: -10,
                    }}
                  >
                    Tên sinh viên:
                  </Text>
                  <TextInput
                    style={{
                      width: 200,
                      height: 40,
                      margin: 12,
                      color: "black",
                      backgroundColor: "#F6F7FB",
                      borderRadius: 10,
                      padding: 10,
                    }}
                    onChangeText={setTenSanPhams}
                    value={tenSanPhams}
                    keyboardType="default"
                  />

                  <Text
                    style={{
                      marginLeft: 12,
                      marginBottom: -10,
                    }}
                  >
                    Mã số SV:
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      margin: 12,
                      color: "red",
                      backgroundColor: "#F6F7FB",
                      borderRadius: 10,
                      padding: 10,
                    }}
                    onChangeText={setmasosvs}
                    value={masosvs}
                    keyboardType="default"
                  />
                </View>
              </View>
              {/* <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -20,
                }}
              >
                <TouchableOpacity
                  onPress={pickImageSua}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    source={{ uri: images }}
                    style={{
                      width: 200,
                      height: 200,
                      marginBottom: 15,
                      borderRadius: 10,
                      zIndex: 1,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Tên sinh viên:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setTenSanPhams}
                value={tenSanPhams}
                keyboardType="default"
              /> */}
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Độ tuổi:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setGiaSanPhams}
                value={String(giaSanPhams)}
                keyboardType="default"
              />
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Giới tính:
              </Text>
              <RadioButton.Group
                onValueChange={(newValues) => setValues(newValues)}
                value={values}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 20,
                    paddingBottom: 15,
                    paddingLeft: "7%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton value="Nam" />
                    <Text
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Nam
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "lightblue",
                      }}
                    >
                      {" "}
                      ♂
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton value="Nữ" />
                    <Text
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Nữ
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "pink",
                      }}
                    >
                      {" "}
                      ♀
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton value="Khác" />
                    <Text
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Khác
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "red",
                      }}
                    >
                      {" "}
                      ⚥
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Địa chỉ:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setdiachis}
                value={diachis}
                keyboardType="default"
              />
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Email:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setemails}
                value={emails}
                keyboardType="default"
              />
              <Text
                style={{
                  marginLeft: 12,
                  marginBottom: -10,
                }}
              >
                Số điện thoại:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  color: "black",
                  backgroundColor: "#F6F7FB",
                  borderRadius: 10,
                  padding: 10,
                }}
                onChangeText={setsdts}
                value={sdts}
                keyboardType="default"
              />

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  title="Update sinh viên"
                  accessibilityLabel="Trang 1"
                  onPress={() => suaSanPham()}
                />

                <Button
                  title="Hủy bỏ"
                  color="red"
                  accessibilityLabel="Trang 1"
                  onPress={() => setModalVisiblec(false)}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
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
