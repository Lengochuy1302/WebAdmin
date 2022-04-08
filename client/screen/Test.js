// In App.js in a new project

// import * as React from 'react';
// import { View, Text,Button } from 'react-native';

// function UserScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>User Screen</Text>
//     <Button
//       title="Go to Details... again"
//       onPress={() => navigation.navigate('Home')}
//     />
//   </View>
//   );
// }
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View, TextInput, TouchableOpacity, Modal, StyleSheet, Pressable, Alert } from 'react-native';

export default function UserScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageNumber, setPagetNumber] = useState(1);
  const [tenSanPham, setThongTin] = useState('');
  const [giaSanPham, setNoiDung] = useState('');
  const [idSanPhamSua, setIdSanPhamSua] = useState();
  const [tenSanPhamSua, setThongTinSua] = useState('');
  const [giaSanPhamSua, setNoiDungSua] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressLearnMore = (getPage) => {
    console.log(getPage)
    setPagetNumber(getPage);
    getData();
  }
  const addSanPham = () => {                                                                                                                                                 
    if (tenSanPham === "") {
      Alert.alert("Tên không được bỏ rỗng")
    } else {
      if (giaSanPham === '') {
        setNoiDung(0)
        Alert.alert('Giá không được bỏ rỗng')
      } else {
        if (isNaN(giaSanPham) == false) {

          console.log("Add san pham")
          fetch('http://172.16.10.154:3000/addProduc/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              thongTIn: tenSanPham,
              noiDung: giaSanPham,

            })

          }).then((response) => {
            console.log(JSON.stringify(response, null, 4))
            return response.json()
            if (response == "ok") {
              alert(" insert thành công")
              getData();
            }
          });
          getData(); // Load lại trang khi thêm
        } else {
          Alert.alert('Giá không được có kí tự chữ')
        }

      }
    }

  
  }
  const suaSanPham = () => {
    console.log(tenSanPhamSua + "ádfasdf")
    console.log(giaSanPhamSua + "ádfasdf")


    setModalVisible(!modalVisible);

    console.log("Sửa san pham")
    fetch('http://172.16.10.154:3000/updateProduc/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idSanPhamSua,
        tenSpSua: tenSanPhamSua,
        giaSpSua: giaSanPhamSua,

      })

    }).then((response) => {
      console.log(JSON.stringify(response, null, 4))
      return response.json()
      if (response == "ok") {
        alert(" update thành công")
        getData();
      }
    });
    getData();
  }

  const getData = async () => {
    try {
      const response = await fetch('http://172.16.10.154:3000/trang/' + pageNumber);
      const json = await response.json();
      console.log("json")
      console.log(json)

      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const showDialogXoaSanPham = (item) => {
    Alert.alert(
      "Xóa",
      "Bạn có muốn xóa bỏ sản phẩm này!!",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy"),
        },
        { text: "Đồng ý", onPress: () => xoaSanPham(item.id) }
      ]
    );
  }
  const xoaSanPham = (id) => {
    console.log("Xoa San Pham")
    fetch('http://172.16.10.154:3000/deleteProduc/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idXoa: id
      })

    }).then((response) => {
      console.log(JSON.stringify(response, null, 4))
      return response.json()
      if (response == "ok") {
        alert(" Xóa thành công")
        getData();
      }
    });
    getData();
  }

  const showDuLieuSua = (item) => {
    setModalVisible(true)
    console.log(item.id)
    setIdSanPhamSua(item.id)
    setThongTinSua(item.thongTIn)
    setNoiDungSua(item.noiDung)
  }
  return (
    <View style={{  padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList

          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={{
              margin: 5, backgroundColor: 'white', borderRadius: 10,
              padding: 10, elevation: 4
            }}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TextInput
                      style={{
                        height: 40,
                        margin: 12,
                        color: 'black',
                        borderWidth: 1,
                        padding: 10,
                      }}
                      onChangeText={setThongTinSua}
                      value={tenSanPhamSua}
                      placeholder="Thông tin"
                      keyboardType="default"

                    />
                    <TextInput
                      style={{

                        height: 40,
                        margin: 12,
                        color: 'black',
                        borderWidth: 1,
                        padding: 10,

                      }}
                      onChangeText={setNoiDungSua}
                      value={String(giaSanPhamSua)}
                      placeholder="Nội dung"

                    />
                    <View style={{ flexDirection: 'row' }}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Hủy</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => suaSanPham()}
                      >
                        <Text style={styles.textStyle}>Sửa sản phẩm</Text>
                      </Pressable>

                    </View>

                  </View>
                </View>
              </Modal>
              <TouchableOpacity onPress={() => showDuLieuSua(item)}
                onLongPress={() => showDialogXoaSanPham(item)}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Thông tin: {item.thongTIn}</Text>
                <Text>Nội dung: {item.noiDung} </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
        <Button
          style={{ margin: 10 }}
          onPress={() => onPressLearnMore(1)}
          title="1"
          color="#841584"
          accessibilityLabel="1"
        />
        <Button
          style={{ margin: 10 }}
          onPress={() => onPressLearnMore(2)}
          title="2"
          color="#841584"
          accessibilityLabel="2"
        />
      </View>

      <View>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            color: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={setThongTin}
          value={tenSanPham}
          placeholder="Thông tin"
          keyboardType="default"
        />
        <TextInput
          style={{

            height: 40,
            margin: 12,
            color: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={setNoiDung}
          value={String(giaSanPham)}
          placeholder="Nội dung"
          keyboardType="default"
        />

        <Button
          title='Thêm sản phẩm'
          accessibilityLabel=" 1"
          onPress={() => addSanPham()}
        />
      </View>
    </View>

  );

}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
    , paddingLeft: 20,
    paddingRight: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: "50%",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center"
  }
});
// export default UserScreen;