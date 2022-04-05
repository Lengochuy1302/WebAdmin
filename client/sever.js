const express = require("express");
const app = express();
const port = 4000;
var bodyParser = require('body-parser')
var cosr = require('cors');
var mysql = require("mysql");
app.use(cosr());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sinhvien",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/ds', (req, res) => {
  con.query("SELECT * FROM sinhvien" , function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
})

app.get('/dssv/:ids', (req, res) => {
  con.query("SELECT * FROM sinhvien WHERE id"+ req.params.ids , function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
})

// hiển thị ds bảng sv theo khoảng id
app.get("/dssp/:id", (req, res) => {
  var limit = 6; 
	var ofsset = (req.params.id -1) * limit;
	var sql = "SELECT * FROM sinhvien ORDER BY id desc LIMIT " + ofsset + " , "+ limit ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// post
app.post('/addProduc', (req, res) => { 
    var sql = "insert into sinhvien ( ten, tuoi, diachi, hinhanh, sex, mssv, sdt, gmail) values('"+ req.body.ten +"','"+ req.body.tuoi +"','"+ req.body.diachi +"','"+ req.body.hinhanh +"','"+ req.body.gioitinh +"','"+ req.body.mssv +"','"+ req.body.sdt +"','"+ req.body.email +"');";
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
        res.send("ok")
      }
    });
  })

  app.post('/remove', (req, res) => {
    console.log(req.body.id)
    var sql = "DELETE FROM sinhvien WHERE id = "+ req.body.id ;
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
        res.send("ok")
      }
    });
  })

  // post sua san pham
app.post('/updateProduc', (req, res) => {
  
  // //update sql
  console.log(req.body.ids)
  var sql = "UPDATE sinhvien SET ten= '" + req.body.tens + "', tuoi= '" + req.body.tuois + "', diachi= '" + req.body.diachis + "', hinhanh= '" + req.body.hinhanhs + "', sex= '" + req.body.gioitinhs + "', mssv= '" + req.body.mssvs + "', sdt= '" + req.body.sdts + "', gmail= '" + req.body.emails + "' WHERE id= '" + req.body.id + "'";
  console.log(sql)
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      res.send("ok")
    }
  });
})

  // singup
  app.post("/singup", (req, res) => {
    var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '"+ req.body.tentaikhoans +"' AND matkhau= '"+ req.body.matkhaus + "'";
 
   
    con.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send({'success': false ,'message': "Database không có kết nối!"});
      }

      if (result.length > 0) {
        res.send({'success': false});
      } else {
        res.send({'success': true});
        var sql = "INSERT INTO taikhoan ( tentaikhoan, matkhau) values('"+ req.body.tentaikhoans +"','"+ req.body.matkhaus +"');";
        con.query(sql, function (err, result, fields) {
          if (err) throw err; 
        });
      }
    });
  });



  // check user
  app.post("/login", (req, res) => {
    console.log("dawng nhap")
    var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '"+ req.body.username +"' AND matkhau= '"+ req.body.password + "'";
 
   
    con.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send({'success': false ,'message': "Database không có kết nối!"});
      }

      if (result.length > 0) {
        res.send({'success': true});
        console.log(res);
      } else {
        res.send({'success': false ,'message': "Sai tài khoản!"});
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
