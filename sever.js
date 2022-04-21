const express = require("express");
const app = express();
const port = 8000;
var bodyparser = require("body-parser");
var cosr = require("cors");
var mysql = require("mysql");
var md5 = require("md5");
app.use(cosr());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "asmsever",
});

function generateID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

app.use("/upload", express.static("upload"));

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/ds", (req, res) => {
  con.query(
    "SELECT * FROM room ORDER BY stt desc",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    },
  );
});

app.get("/dssv/:idss", (req, res) => {
  con.query(
    "SELECT * FROM room WHERE idroom='" + req.params.idss + "';",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    },
  );
});

app.get("/dsview", (req, res) => {
  con.query(
    "SELECT * FROM room ORDER BY idroom desc",
    function (err, result, fields) {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var i;
      var tong = 0;
      for (i = 0; i < result.length; i++) {
        console.log(i + ": " + json[i].luotXem);
        tong = tong + json[i].luotXem;
      }
      if (err) throw err;
      res.send("" + tong);
    },
  );
});

app.get("/dsuser", (req, res) => {
  con.query(
    "SELECT * FROM `user` WHERE thanhVien != 'admin' ORDER BY idUser desc",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    },
  );
});

app.post("/addtrangthai", (req, res, next) => {
  var sql =
    "UPDATE user SET trangThai='" +
    req.body.trangThai +
    "' WHERE idUser= '" +
    req.body.idTrangThai +
    "'";
  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      res.send("ok");
    }
  });
});

app.post("/updateView", (req, res, next) => {
  var sql =
    "UPDATE room SET luotXem='" +
    req.body.viewCount +
    "' WHERE idroom= '" +
    req.body.idRoomView +
    "'";
  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      res.send("ok");
    }
  });
});

app.get("/usermember", (req, res) => {
  con.query(
    "SELECT * FROM `user` WHERE thanhVien = 'member'",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    },
  );
});

app.get("/userhost", (req, res) => {
  con.query(
    "SELECT * FROM `user` WHERE thanhVien = 'host'",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    },
  );
});

// hiển thị ds bảng sv theo khoảng id
app.get("/dssp/:id", (req, res) => {
  var limit = 3;
  var ofsset = (req.params.id - 1) * limit;
  var sql =
    "SELECT * FROM room ORDER BY idroom desc LIMIT " + ofsset + " , " + limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/dshost/:idhost", (req, res) => {
  con.query(
    "SELECT * FROM room WHERE idUser = " +
      req.params.idhost +
      " ORDER BY idroom desc",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    },
  );
});

app.get("/dshostview/:idhost", (req, res) => {
  con.query(
    "SELECT * FROM room WHERE idUser = " +
      req.params.idhost +
      " ORDER BY idroom desc",
    function (err, result, fields) {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var i;
      var tong = 0;
      for (i = 0; i < result.length; i++) {
        console.log(i + ": " + json[i].luotXem);
        tong = tong + json[i].luotXem;
      }
      if (err) throw err;
      res.send("" + tong);
    },
  );
});

const multer = require("multer");
// SET STORAGE
let urlImage = null;
var listimage = [];
let uidRoom = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "upload");
    } else {
      cb(new Error("not image"), false);
    }
  },
  filename: function (req, file, cb) {
    urlImage = Date.now() + ".jpg";
    var arrhinhanh = {
      tenHinh: urlImage,
    };
    listimage.push(arrhinhanh);
    console.log(listimage);
    cb(null, urlImage);
  },
});
var upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
});
//end upload
// post
app.post("/addProduc", upload.single("file"), (req, res, next) => {
  uidRoom = generateID();
  var curDate = new Date();
  // Lấy ngày hiện tại
  var curDay = curDate.getDate();
  // Lấy tháng hiện tại
  var curMonth = curDate.getMonth() + 1;
  // Lấy năm hiện tại
  var curYear = curDate.getFullYear();

  var sql =
    "insert into room (idroom, image, tenPhong, giaPhong, idLoaiPhong, chieuDai, chieuRong, giaNuoc, giaDien, moTa,tinh, quan, phuong, duong, idUser, idTienIch, xacThuc, kiemDuyet, gioiTinh, ngayTao, luotXem ) values('" +
    uidRoom +
    "','" +
    urlImage +
    "','" +
    req.body.tenPhong +
    "','" +
    req.body.giaPhong +
    "','" +
    req.body.loaiPhong +
    "','" +
    req.body.chieuDai +
    "','" +
    req.body.chieuRong +
    "','" +
    req.body.giaNuoc +
    "','" +
    req.body.giaDien +
    "','" +
    req.body.moTa +
    "','" +
    req.body.tinh +
    "','" +
    req.body.quan +
    "','" +
    req.body.phuong +
    "','" +
    req.body.duong +
    "','" +
    req.body.IdUser +
    "','" +
    req.body.IdUser +
    "','false','false','" +
    req.body.gioiTinh +
    "','" +
    curDay +
    "/" +
    curMonth +
    "/" +
    curYear +
    "', '0');";
  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    var count = 0;
    for (var i = 0; i < listimage.length; i++) {
      var sql =
        "insert into image (tenImage, idRoom) values('" +
        listimage[i].tenHinh +
        "','" +
        uidRoom +
        "');";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        count = count + 1;
        if (count == listimage.length) {
          urlImage = null;
          listimage = [];
          res.send("ok");
        }
      });
    }
  });
});

//get image
app.get("/getlisstimg/:idroom", (req, res) => {
  var sql = "SELECT * FROM image WHERE idRoom= '" + req.params.idroom + "'";
  console.log(sql);
  var count = 0;
  var list = [];
  con.query(sql, function (err, result, fields) {
    result.map((item, index) => {
      const idPhong = item.tenImage;
      console.log(idPhong);
      var itemnew = {
        tenhinh: item.tenImage,
      };
      list.push(itemnew);
      count = count + 1;
      if (result.length == count) {
        console.log("Dataa đủ: ", list);

        res.send(list);
      }
    });
  });
});

app.post("/remove", (req, res) => {
  console.log("Thay đổi img");
  var sql = "SELECT * FROM image WHERE idRoom= '" + req.body.idroomdele + "'";
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    result.map((item, index) => {
      const idPhong = item.tenImage;
      console.log(idPhong);
      var fs = require("fs");
      var filePath = "upload/" + idPhong;
      fs.unlink(filePath, deleteFileCallback);
      function deleteFileCallback(error) {
        if (error) {
          console.log("Error in dleting file");
          console.log(error.message);
        } else {
          console.log("Deleted Successfully...");
          var sql = "DELETE FROM image WHERE tenImage = '" + idPhong + "'";
          console.log(sql);
          con.query(sql, function (err, data, fields) {
            var sql =
              "DELETE FROM room WHERE idroom = '" + req.body.idroomdele + "'";
            console.log(sql);

            con.query(sql, function (err, result, fields) {});
          });
        }
      }
    });
  });
});

app.post("/removeyeuthich", (req, res) => {
  console.log(req.body.idrom);
  console.log(req.body.iduser);
  var sql =
    "DELETE FROM yeuthich WHERE idUser = '" +
    req.body.iduser +
    "' AND idRoom = '" +
    req.body.idrom +
    "';";
  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  });
});

// post sua san pham
app.post("/updateProduc", (req, res) => {
  console.log(req.body.imageSua);
  if (listimage.length == 0) {
    console.log("Không thay đổi img");
    console.log(req.body.loaiPhongSua);
    console.log(req.body.tienIchSua);
    var sql =
      "UPDATE room SET tenPhong= '" +
      req.body.tenPhongSua +
      "', giaPhong= '" +
      req.body.giaPhongSua +
      "', idLoaiPhong= '" +
      req.body.loaiPhongSua +
      "', chieuDai= '" +
      req.body.chieuDaiSua +
      "', chieuRong= '" +
      req.body.chieuRongSua +
      "', giaNuoc= '" +
      req.body.giaNuocSua +
      "', giaDien= '" +
      req.body.giaDienSua +
      "', moTa= '" +
      req.body.moTaSua +
      "', tinh= '" +
      req.body.tinhSua +
      "', quan= '" +
      req.body.quanSua +
      "', phuong= '" +
      req.body.phuongSua +
      "', duong= '" +
      req.body.duongSua +
      "',idTienIch= '" +
      req.body.tienIchSua +
      "',  gioiTinh= '" +
      req.body.gioiTinhSua +
      "' WHERE idroom= '" +
      req.body.idRoomSua +
      "'";
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result == "ok") {
        res.send("ok");
      }
    });
    urlImage = null;
    listimage = [];
  } else {
    console.log("Thay đổi img");
    var sql = "SELECT * FROM image WHERE idRoom= '" + req.body.idRoomSua + "'";
    console.log(sql);
    var dem = 0;
    con.query(sql, function (err, result, fields) {
      result.map((item, index) => {
        const idPhong = item.tenImage;
        console.log(idPhong);
        var fs = require("fs");
        var filePath = "upload/" + idPhong;
        fs.unlink(filePath, deleteFileCallback);
        function deleteFileCallback(error) {
          if (error) {
            console.log("Error in dleting file");
            console.log(error.message);
          } else {
            console.log("Deleted Successfully...");
            var sql =
              "DELETE FROM image WHERE idRoom = '" + req.body.idRoomSua + "'";
            console.log(sql);
            con.query(sql, function (err, data, fields) {
              dem = dem + 1;
              if (dem == result.length) {
                var sql =
                  "UPDATE room SET image= '" +
                  urlImage +
                  "', tenPhong= '" +
                  req.body.tenPhongSua +
                  "', giaPhong= '" +
                  req.body.giaPhongSua +
                  "', idLoaiPhong= '" +
                  req.body.loaiPhongSua +
                  "', chieuDai= '" +
                  req.body.chieuDaiSua +
                  "', chieuRong= '" +
                  req.body.chieuRongSua +
                  "', giaNuoc= '" +
                  req.body.giaNuocSua +
                  "', giaDien= '" +
                  req.body.giaDienSua +
                  "', moTa= '" +
                  req.body.moTaSua +
                  "', tinh= '" +
                  req.body.tinhSua +
                  "', quan= '" +
                  req.body.quanSua +
                  "', phuong= '" +
                  req.body.phuongSua +
                  "', duong= '" +
                  req.body.duongSua +
                  "',idTienIch= '" +
                  req.body.tienIchSua +
                  "',  gioiTinh= '" +
                  req.body.gioiTinhSua +
                  "' WHERE idroom = '" +
                  req.body.idRoomSua +
                  "'";
                console.log(sql);
                con.query(sql, function (err, result, fields) {
                  if (err) throw err;
                  var count = 0;
                  for (var i = 0; i < listimage.length; i++) {
                    var sql =
                      "insert into image (tenImage, idRoom) values('" +
                      listimage[i].tenHinh +
                      "','" +
                      req.body.idRoomSua +
                      "');";
                    console.log("up img", sql);
                    con.query(sql, function (err, result, fields) {
                      if (err) throw err;
                      count = count + 1;
                      if (count == listimage.length) {
                        urlImage = null;
                        listimage = [];
                        res.send("ok");
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    });
  }
});

//them yeu thich
app.post("/yeuthich", (req, res) => {
  var sql = "SELECT * FROM yeuthich WHERE idRoom = '" + req.body.phongtro + "'";

  console.log(req.body.phongtro.slice(1, -1));

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
      res.send({ success: false, message: "Phòng đã có trong mục yêu thích" });
    } else {
      res.send({ success: true, message: "Phòng đã thêm vào mục yêu thích" });
      var sql =
        "INSERT INTO yeuthich (idUser, idRoom) values('" +
        req.body.taikhoan +
        "','" +
        req.body.phongtro +
        "');";
      console.log(sql);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });
    }
  });
});

//hien thi ds yeu thich
app.get("/dsyeuthich/:ids", (req, res) => {
  con.query(
    "SELECT * FROM room WHERE idRoom= '" + req.params.ids + "'",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    },
  );
});

//get data room yeu thich
app.get("/getdatayeuthich/:iduser", (req, res) => {
  var sql = "SELECT * FROM yeuthich WHERE idUser= '" + req.params.iduser + "'";
  console.log(sql);
  var count = 0;
  var list = [];
  con.query(sql, function (err, result, fields) {
    result.map((item, index) => {
      const idPhong = item.idRoom;
      console.log("lặp :",idPhong);
      var sql = "SELECT * FROM room WHERE idroom = '" + idPhong + "'";
      console.log(sql);
      con.query(sql, function (err, data, fields) {
        console.log("list :",      data.length );
        data.map((item, index) => {
          console.log(item.tenPhong);
          var itemnew = {
            idroom: item.idroom,
            image: item.image,
            tenPhong: item.tenPhong,
            giaPhong: item.giaPhong,
            loaiPhong: item.loaiPhong,
            chieuDai: item.chieuDai,
            chieuRong: item.chieuRong,
            giaNuoc: item.giaNuoc,
            giaDien: item.giaDien,
            moTa: item.moTa,
            tinh: item.tinh,
            quan: item.quan,
            phuong: item.phuong,
            duong: item.duong,
            user: item.idUser,
            gioiTinh: item.gioiTinh,
            ngayTao: item.ngayTao,
            luotXem: item.luotXem,
          };
          list.push(itemnew);
          count = count + 1;
          if (result.length == count) {
            res.send(list);
          }
        });
      });
    });
  });
});

// singup
app.post("/singupclient", (req, res) => {
  var sql =
    "SELECT * FROM user WHERE email= '" +
    req.body.tentaikhoans +
    "' AND matkhau= '" +
    md5(req.body.matkhaus) +
    "'";

  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
      res.send({ success: false });
    } else {
      res.send({ success: true });
      var sql =
        "INSERT INTO user ( email, matKhau, thanhVien) values('" +
        req.body.tentaikhoans +
        "','" +
        md5(req.body.matkhaus) +
        "','member');";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });
    }
  });
});

// singup
app.post("/singup", (req, res) => {
  var sql =
    "SELECT * FROM user WHERE email= '" +
    req.body.tentaikhoans +
    "' AND matkhau= '" +
    req.body.matkhaus +
    "'";

  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
      res.send({ success: false });
    } else {
      res.send({ success: true });
      var sql =
        "INSERT INTO user ( email, matKhau, thanhVien) values('" +
        req.body.tentaikhoans +
        "','" +
        md5(req.body.matkhaus) +
        "','host');";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });
    }
  });
});

// check user
app.post("/login", (req, res) => {
  console.log("dawng nhap");
  var sql =
    "SELECT * FROM user WHERE email= '" +
    req.body.username +
    "' AND matkhau= '" +
    md5(req.body.password) +
    "'";

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      console.log("Thành viên: " + json[0].trangThai);
      if (json[0].trangThai === "Hoạt động") {
        if (json[0].thanhVien === "admin" || json[0].thanhVien === "host") {
          console.log(">> ID: ", json[0].idUser);
          console.log(">> Email: ", json[0].email);
          console.log(">> ThanhVien: ", json[0].thanhVien);
          res.send({
            success: true,
            IDUSER: json[0].idUser,
            EMAIL: json[0].email,
            THANHVIEN: json[0].thanhVien,
          });
        } else {
          res.send({
            success: false,
            message: "Vui lòng đăng nhập tài khoản này ở app",
          });
          console.log(res);
        }
      } else {
        res.send({
          success: false,
          message: "Tài khoản đã bị khóa! Vui lòng liên hệ bộ phận hỗ trợ.",
        });
        console.log(res);
      }
    } else {
      res.send({ success: false, message: "Sai tài khoản!" });
      console.log(res);
    }
  });
});

app.post("/loginclient", (req, res) => {
  console.log("dawng nhap");
  var sql =
    "SELECT * FROM user WHERE email= '" +
    req.body.username +
    "' AND matkhau= '" +
    md5(req.body.password) +
    "'";

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      console.log("Thành viên: " + json[0].thanhVien);
      var idusers = JSON.stringify(json[0].idUser);
      if (json[0].trangThai === "Hoạt động") {
        if (json[0].thanhVien === "member") {
          res.send({ success: true, iduser: idusers });
          console.log(res);
        } else {
          res.send({
            success: false,
            message: "Vui lòng đăng nhập tài khoản này ở web admin",
          });
          console.log(res);
        }
      } else {
        res.send({
          success: false,
          message: "Tài khoản đã bị khóa! Vui lòng liên hệ bộ phận hỗ trợ.",
        });
        console.log(res);
      }
    } else {
      res.send({ success: false, message: "Sai tài khoản!" });
      console.log(res);
    }
  });
});

app.use(function (req, res, next) {
  res.status(404).send("404 Not Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
