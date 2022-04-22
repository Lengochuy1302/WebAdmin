import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Modal,Alert } from "react-native";
const backImage = require("../assets/backImage.png");
import { Checkbox } from 'react-native-paper';
export default function Signup({ navigation }) {

  const [tendangkys, settendangky] = useState("");
  const [passdangkys, setpassdangky] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [modalVisiblec, setModalVisiblec] = useState(false);
  const checkusers = () => {
    if (tendangkys === "" || tendangkys === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (passdangkys === "" || passdangkys === null) {
      Alert.alert("Cảnh báo", "Pass không được bỏ trống!");
      return;
    }

    if (checked === false) {
      Alert.alert("Cảnh báo!", "Bạn chưa đồng ý điều khoản!");
      return;
    }

    fetch("http://192.168.1.41:8000/singupclient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tentaikhoans: tendangkys,
        matkhaus: passdangkys,
      }),
    })  
    .then((response) => response.json())
    .then((res) => {
      if (res.success === true) {
          Alert.alert("Thông báo","Tạo thành công!");
          navigation.navigate('Login Screen')
       } else {
          Alert.alert("Thông báo","Tài khoản tồn tại!");
       }
    })


  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>ĐĂNG KÝ</Text>
         <TextInput
        style={styles.input}
        placeholder="Tên tài khoản"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        onChangeText={settendangky}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        onChangeText={setpassdangky}
      />

<View style={{marginTop: -10,}}>
      <View style={{    flexDirection: "row",
    marginBottom: 0, marginTop: -5}}>
      <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
     color='orange'
    />
        <Text style={{marginTop: 10,}}>Đồng ý với các </Text>
        <Text
   onPress={() => setModalVisiblec(true)}
        style={{marginTop: 10, fontWeight: '600'}}>điều khoản?</Text>
      </View>
    </View>

      <TouchableOpacity style={styles.button} onPress={() => checkusers()}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
          <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}>Log In</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />

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
              marginTop: "10%",
              height: "100%",
              marginLeft: 5,
              marginRight: 5,
              color: "black",
              borderRadius: 10,
              padding: 10,
              backgroundColor: "white",
              padding: 15,
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
                      <View
                 style={{
                   position: 'absolute',
                   alignSelf: 'flex-end',
                   zIndex: 1,
                   margin: 10,
                  
                }}
          >
            <Text
           onPress={() => setModalVisiblec(false)}
                   style={{
                    fontWeight: '400',
                    fontSize: 15,
                    margin: 15,
                    color: 'orange',
                    marginTop: 5,
                    padding: 5,
                  }}
            >
              Thoát
            </Text>
          </View>
            <Text
              style={{
                height: 40,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: "green",
                padding: 10,
                marginBottom: 10,
              }}
            >
              ĐIỀU KHOẢN & DỊCH VỤ
            </Text>
            <Text
              style={{
                fontWeight: '500'
              }}
            >
            A. GIỚI THIỆU DỊCH VỤ CỦA CHÚNG TÔI
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                marginTop: 5
              }}
            >
          Thỏa thuận này điều chỉnh việc quý khách sử dụng các Dịch Vụ Của Apple ("Dịch vụ" - ví dụ: App Store, Apple Arcade, Apple Books, Apple Fitness+, Apple Music, Apple News, Apple News+, Apple One, Apple Podcast, Apple Podcast Subscriptions, Apple TV, Apple TV+, Apple TV Channels, Game Center, iTunes, tùy theo có dịch vụ nào), thông qua đó quý khách có thể mua, nhận, cấp giấy phép, thuê hoặc đăng ký nội dung, Ứng dụng (như được định nghĩa dưới đây), và các dịch vụ in-app khác (gọi chung là "Nội dung"). Nội dung có thể được cung cấp thông qua các Dịch vụ bởi Apple hoặc một bên thứ ba. Dịch vụ của chúng tôi sẵn có cho quý khách sử dụng ở nước hoặc lãnh thổ mà quý khách cư trú ("Nước sở tại"). Bằng cách tạo một tài khoản để sử dụng Dịch vụ ở một quốc gia hoặc vùng lãnh thổ cụ thể, quý khách đang chỉ định đó là Nước sở tại của mình. Để sử dụng Dịch vụ của chúng tôi, quý khách cần phần cứng, phần mềm tương thích (đề xuất và đôi khi bắt buộc sử dụng phiên bản mới nhất) và có kết nối Internet (có thể bị tính phí). Hiệu quả hoạt động của Dịch vụ của chúng tôi có thể bị ảnh hưởng bởi những yếu tố này.
            </Text>

            <Text
              style={{
                fontWeight: '500',
                marginTop: 20
              }}
            >
          B. SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI THANH TOÁN, THUẾ VÀ HOÀN TIỀN
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                marginTop: 5,
                marginBottom: 20
              }}
            >
         Quý khách có thể có được Nội dung trên Dịch vụ của chúng tôi miễn phí hoặc có tính phí, nhưng trong trường hợp nào cũng đều được gọi là "Giao dịch." Mỗi Giao dịch là một hợp đồng điện tử giữa quý khách và Apple, và/hoặc giữa quý khách và bên cung cấp Nội dung trên Dịch vụ của chúng tôi. Tuy nhiên, nếu quý khách là khách hàng của Apple Distribution International Ltd., thì Apple Distribution International Ltd. là bên bán đứng tên trên hồ sơ cho một số Nội dung mà quý khách có được từ Apple Books, Apple Podcasts, hoặc App Store như được hiển thị trên trang sản phẩm và/hoặc trong quá trình mua lại Dịch vụ liên quan. Trong trường hợp đó, quý khách mua Nội dung từ Apple Distribution International Ltd., được cấp phép bởi nhà cung cấp Nội dung (ví dụ: Nhà cung cấp Ứng dụng (như được định nghĩa bên dưới), nhà xuất bản sách, v.v.). Khi quý khách thực hiện Giao dịch đầu tiên, chúng tôi sẽ yêu cầu quý khách chọn mức độ thường xuyên mà chúng tôi cần phải yêu cầu mật khẩu của quý khách cho các Giao dịch trong tương lai. Nếu quý khách kích hoạt Touch ID cho các Giao dịch, chúng tôi sẽ yêu cầu quý khách xác thực tất cả Giao dịch bằng dấu vân tay của quý khách, và nếu quý khách kích hoạt Face ID cho các Giao dịch, chúng tôi sẽ yêu cầu quý khách xác thực tất cả Giao dịch bằng nhận dạng khuôn mặt. Quản lý cài đặt mật khẩu của quý khách bất kỳ lúc nào bằng cách làm theo hướng dẫn sau: https://support.apple.com/HT204030.

Apple sẽ tính phí phương thức thanh toán quý khách lựa chọn (chẳng hạn như thẻ tín dụng, thẻ ghi nợ, thẻ/mã quà tặng, hoặc phương pháp khác sẵn có ở Nước sở tại của quý khách) cho bất kỳ Giao dịch được thanh toán nào, bao gồm các khoản thuế áp dụng. Nếu quý khách đã thêm phương thức thanh toán của quý khách vào Ví Apple, Apple cũng tính phí cho phương thức thanh toán được lựa chọn đó sử dụng Apple Pay. Quý khách có thể liên kết nhiều phương thức thanh toán với ID Apple của mình, và quý khách đồng ý rằng Apple có thể lưu trữ và tính phí các phương thức thanh toán đó cho các Giao dịch. Phương thức thanh toán chính của quý khách xuất hiện ở đầu trang cài đặt thanh toán của tài khoản của quý khách.

Nếu không thể tính phí được phương thức thanh toán chính của quý khách vì bất kỳ lý do gì (chẳng hạn như hết hạn hoặc không đủ tiền), quý khách cho phép Apple cố gắng tính phí các phương thức thanh toán đủ điều kiện khác của quý khách theo thứ tự từ trên xuống dưới như hiển thị trên trang cài đặt thanh toán của tài khoản của quý khách. Nếu chúng tôi không thể tính phí cho quý khách, quý khách vẫn phải chịu trách nhiệm cho bất kỳ khoản tiền nào chưa thanh toán, và chúng tôi có thể sẽ cố gắng tính phí lại cho quý khách hoặc yêu cầu quý khách cung cấp một phương thức thanh toán khác. Nếu quý khách đặt mua trước Nội dung, quý khách sẽ được tính phí khi Nội dung được cung cấp cho quý khách (trừ khi quý khách hủy trước khi có được Nội dung). Theo luật pháp địa phương, Apple có thể tự động cập nhật thông tin về thanh toán của quý khách liên quan đến các phương thức thanh toán nếu được các mạng thanh toán hoặc tổ chức tài chính của quý khách cung cấp thông tin đó. Để biết thêm chi tiết về cách thức Giao dịch được lập hóa đơn, vui lòng truy cập http://support.apple.com/HT201359. Tất cả các Giao dịch đều không thể thay đổi được. Giá nội dung có thể thay đổi vào bất kỳ lúc nào. Nếu vấn đề kỹ thuật ngăn cản hoặc làm chậm trễ một cách phi lý quá trình chuyển Nội dung, biện pháp khắc phục duy nhất của quý khách là thay thế Nội dung hoặc hoàn lại giá tiền đã thanh toán, theo quyết định của Apple. Tùy vào từng thời điểm, Apple có thể tạm ngừng hoặc hủy thanh toán hoặc từ chối yêu cầu hoàn tiền nếu chúng tôi tìm thấy bằng chứng về sự gian lận, lạm dụng, hoặc phạm pháp, hoặc hành vi thao túng khác mà Apple có quyền phản tố tương ứng. Các thuật ngữ liên quan đến tín dụng cửa hàng và thẻ/mã quà tặng được đăng tải tại đây: https://www.apple.com/legal/internet-services/itunes/giftcards/.            </Text>
          </View>

        </ScrollView>
      </Modal>

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