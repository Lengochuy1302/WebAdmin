const express = require("express");
const app = express();
const port = 8000;
var bodyparser = require("body-parser");
var cosr = require("cors");
var mysql = require("mysql");
var md5 = require('md5');
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

app.use("/upload", express.static("upload"));

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/ds", (req, res) => {
  con.query("SELECT * FROM room", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/dssv/:ids", (req, res) => {
  con.query(
    "SELECT * FROM sinhvien WHERE id" + req.params.ids,
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

const multer = require("multer");
// SET STORAGE
let urlImage = null;
let urlImageSua;
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
  var curDate = new Date();
  // Lấy ngày hiện tại
  var curDay = curDate.getDate();
  // Lấy tháng hiện tại
  var curMonth = curDate.getMonth() + 1;
  // Lấy năm hiện tại
  var curYear = curDate.getFullYear();

  var sql =
    "insert into room (image, tenPhong, giaPhong, idLoaiPhong, chieuDai, chieuRong, giaNuoc, giaDien, moTa,tinh, quan, phuong, duong, idUser, idTienIch, xacThuc, kiemDuyet, gioiTinh, ngayTao, luotXem ) values('" +
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
    "', '02','" +
    req.body.TienIch +
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
    if (result == "ok") {
      urlImage = null;
      console.log(result);
      res.send("ok");
    }
  });
});

app.post("/remove", (req, res) => {
  console.log(req.body.idroomdele);
  console.log(req.body.urlimage);
  var sql = "DELETE FROM room WHERE idroom = " + req.body.idroomdele;
  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    var fs = require("fs");
    var filePath = "upload/" + req.body.urlimage;
    fs.unlink(filePath, deleteFileCallback);
    function deleteFileCallback(error) {
      if (error) {
        console.log("Error in dleting file");
        console.log(error.message);
      } else {
        console.log("Deleted Successfully...");
      }
    }
  });
});

// post sua san pham
app.post("/updateProduc", (req, res) => {
  console.log(req.body.imageSua);
  if (urlImage == null) {
    urlImage = req.body.imageSua;
  }
  var sql = "SELECT * FROM room WHERE image = '" + urlImage + "'";

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
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
    } else {
      console.log(req.body.loaiPhongSua);
      console.log(req.body.tienIchSua);
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
        "' WHERE idroom= '" +
        req.body.idRoomSua +
        "'";
      console.log(sql);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        var fs = require("fs");
        var filePath = "upload/" + req.body.imageSua;
        fs.unlink(filePath, deleteFileCallback);
        function deleteFileCallback(error) {
          if (error) {
            console.log("Error in dleting file");
            console.log(error.message);
          } else {
            console.log("Deleted Successfully...");
          }
        }
      });
      urlImage = null;
    }
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
      res.send({ success: true });
      console.log(res);
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
