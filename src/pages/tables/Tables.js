import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import { addRoom } from "../../context/UserContext";
import Switch from "react-input-switch";
// data
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./styles";
import "./table.css";
import axios from "axios";
import mock from "../dashboard/mock";
import "font-awesome/css/font-awesome.min.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
var article = [];
export default function Tables(props) {
  var classes = useStyles();

  const [idroom, setidroom] = useState("");
  const [tenPhong, setTenPhong] = useState("");
  const [giaPhong, setGiaPhong] = useState("");
  const [idLoaiPhong, setIdLoaiPhong] = useState("");
  const [chieuDai, setChieuDai] = useState("");
  const [chieuRong, setChieuRong] = useState("");
  const [giaNguoc, setGiaNuoc] = useState("");
  const [giaDien, setGiaDien] = useState("");
  const [moTa, setMoTa] = useState("");
  const [tinh, setTinh] = useState("");
  const [quan, setQuan] = useState("");
  const [phuong, setPhuong] = React.useState("");
  const [duong, setDuong] = React.useState("");
  const [idUser, setIdUser] = React.useState("");
  const [idTienIch, setIdTienIch] = React.useState("");
  const [xacThuc, setXacThuc] = React.useState("false");
  const [kiemDuyet, setKiemDuyet] = React.useState("false");
  const [gioiTinh, setGioiTinh] = React.useState("");
  const [ngayTao, setNgayTao] = React.useState("");
  const [luotXem, setLuotXem] = React.useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // const onSubmit = values => {
  //   axios.post('http://localhost:8000/addProduc', values)
  //     .then(response =>{

  //     });
  //     alert('Th??m th??nh c??ng');
  //     refreshPage();
  // }
  // const [state, setState] = React.useState({
  //   age: "",
  //   name: "hai",
  // });

  // const [value, setValue] = React.useState("female");
  // const handleChangegioitinh = (event) => {
  //   setValue(event.target.value);
  // };
  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  // const [statetienich, setStatetienich] = React.useState({
  //   tienich: "",
  //   name: "hai",
  // });

  // const handleChangetienich = (event) => {
  //   const name = event.target.name;
  //   setStatetienich({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  // const [id, setid] = React.useState("");
  const [dataPost, setDataPost] = React.useState([]);
  const [dataHost, setDataHost] = React.useState([]);
  const [dataUSER, setDataUSER] = React.useState([]);
  const getDataPost = async () => {
    const baseUrl = "http://localhost:8000/ds";
    const response = await axios.get(baseUrl);
    setDataPost(response.data);
  };

  const getDataHost = async (id_token) => {
    const baseUrl = "http://localhost:8000/dshost/" + id_token;
    const response = await axios.get(baseUrl);
    setDataHost(response.data);
  };

  const getDataUSER = async () => {
    const baseUrl = "http://localhost:8000/dsuser";
    const response = await axios.get(baseUrl);
    setDataUSER(response.data);
  };

  const editTrangThaiKhoa = (id, trangthai) => {
    if (trangthai == "T???m kh??a") {
      return;
    }
    fetch("http://172.16.10.166:8000/addtrangthai", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idTrangThai: id,
        trangThai: "T???m kh??a",
      }),
    }).then((response) => {});
    refreshPage();
  };

  const editTrangThaiMo = (id, trangthai) => {
    if (trangthai == "Ho???t ?????ng") {
      return;
    }
    fetch("http://172.16.10.166:8000/addtrangthai", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idTrangThai: id,
        trangThai: "Ho???t ?????ng",
      }),
    }).then((response) => {});
    refreshPage();
  };

  const [style, setStyle] = useState("cont");
  const [styleadmin, setStyleadmin] = useState("cont");
  const changeStyle = () => {
    setStyle("cont2");
  };
  const changeStyleAdmin = () => {
    setStyleadmin("cont2");
  };

  useEffect(() => {
    const thanhvien = localStorage.getItem("thanhvien_token");
    const id = localStorage.getItem("id_token");
    if (thanhvien === "host") {
      getDataHost(id);
      changeStyle();
    } else {
      changeStyleAdmin();
      getDataPost();
      getDataUSER();
    }
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };
  const [opendialog, setOpendialog] = React.useState(false);

  const handleClickOpenDialog = (id, url) => {
    article = {
      idroomdele: id,
      urlimage: url,
    };
    setOpendialog(true);
  };

  const handleCloseDialog = () => {
    setOpendialog(false);
  };
  const removeSanPham = (id, url) => {
    console.log("Remove san pham");
    axios.post("http://localhost:8000/remove", article).then((response) => {});
    refreshPage();
  };
  const columns = [
    {
      name: "",
      options: {
        filter: false,
        setCellProps: () => ({
          style: { minWidth: "100px", maxWidth: "100px" },
        }),
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              control={
                <>
                  <IconButton
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Icon>send</Icon>}
                    style={{
                      marginLeft: 20,
                    }}
                    onClick={() => {
                      handleClickOpenDialog(
                        dataHost[tableMeta.rowIndex].idroom,
                        dataHost[tableMeta.rowIndex].image,
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={opendialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Th??ng b??o"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        C?? ch???c ch???n l?? b???n mu???n x??a?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        H???y
                      </Button>
                      <Button
                        onClick={() =>
                          removeSanPham(article.idroomdele, article.urlimage)
                        }
                        color="primary"
                        autoFocus
                      >
                        X??a
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              }
            />
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "80px", maxWidth: "80px" } }),
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              control={
                <>
                  <IconButton
                    startIcon={<CloudUploadIcon />}
                    variant="contained"
                    color="yellow"
                    size="large"
                    component={Link}
                    to={{
                      pathname: "/app/notifications/",
                      state: dataHost[tableMeta.rowIndex],
                    }}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </IconButton>
                </>
              }
            />
          );
        },
      },
    },
    {
      name: "idroom",
      label: "ID Room",
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: "image",
      label: "H??nh ???nh",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (name) => {
          return (
            <div>
              <img
                style={{ width: 100, height: 100, borderRadius: 10 }}
                src={"http://localhost:8000/upload/" + name}
              />
            </div>
          );
        },
      },
    },
    {
      name: "tenPhong",
      label: "T??n ph??ng",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
      },
    },
    {
      name: "giaPhong",
      label: "Gi?? ph??ng",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
        customBodyRender: (name) => {
          return (
            <text>
              {name.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </text>
          );
        },
      },
    },
    {
      name: "giaNuoc",
      label: "Gi?? n?????c",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
        customBodyRender: (name) => {
          return (
            <text>
              {name.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </text>
          );
        },
      },
    },
    {
      name: "giaDien",
      label: "Gi?? ??i???n",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
        customBodyRender: (name) => {
          return (
            <text>
              {name.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </text>
          );
        },
      },
    },
    {
      name: "gioiTinh",
      label: "Gi???i t??nh",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "idLoaiPhong",
      label: "Lo???i ph??ng",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "chieuDai",
      label: "Chi???u d??i",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
        customBodyRender: (name) => {
          return <text>{name}m</text>;
        },
      },
    },
    {
      name: "chieuRong",
      label: "Chi???u r???ng",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
        customBodyRender: (name) => {
          return <text>{name}m</text>;
        },
      },
    },
    {
      name: "tinh",
      label: "T???nh th??nh",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "quan",
      label: "Qu???n huy???n",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "phuong",
      label: "Ph?????ng x??",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "duong",
      label: "???????ng/ S??? nh??",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "idUser",
      label: "Ng?????i ????ng",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "ngayTao",
      label: "Ng??y ????ng",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
      },
    },
    {
      name: "kiemDuyet",
      label: "Ki???m duy???t",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "xacThuc",
      label: "X??c th???c",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "luotXem",
      label: "L?????t xem",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "moTa",
      label: "M?? t???",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
        customBodyRender: (name) => {
          return <text>{name.substring(0, 100)}...</text>;
        },
      },
    },
  ];
  const columnsadmin = [
    {
      name: "",
      options: {
        filter: false,
        setCellProps: () => ({
          style: { minWidth: "100px", maxWidth: "100px" },
        }),
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              control={
                <>
                  <IconButton
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Icon>send</Icon>}
                    style={{
                      marginLeft: 20,
                    }}
                    onClick={() => {
                      handleClickOpenDialog(
                        dataPost[tableMeta.rowIndex].idroom,
                        dataPost[tableMeta.rowIndex].image,
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={opendialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Th??ng b??o"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        C?? ch???c ch???n l?? b???n mu???n x??a?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        H???y
                      </Button>
                      <Button
                        onClick={() =>
                          removeSanPham(article.idroomdele, article.urlimage)
                        }
                        color="primary"
                        autoFocus
                      >
                        X??a
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              }
            />
          );
        },
      },
    },
    {
      name: "idroom",
      label: "ID Room",
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: "image",
      label: "H??nh ???nh",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (name) => {
          return (
            <img
              style={{ width: 100, height: 100, borderRadius: 10 }}
              src={"http://localhost:8000/upload/" + name}
            />
          );
        },
      },
    },
    {
      name: "tenPhong",
      label: "T??n ph??ng",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
      },
    },
    {
      name: "giaPhong",
      label: "Gi?? ph??ng",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
        customBodyRender: (name) => {
          return (
            <text>
              {name.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </text>
          );
        },
      },
    },
    {
      name: "giaNuoc",
      label: "Gi?? n?????c",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
        customBodyRender: (name) => {
          return (
            <text>
              {name.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </text>
          );
        },
      },
    },
    {
      name: "giaDien",
      label: "Gi?? ??i???n",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
        customBodyRender: (name) => {
          return (
            <text>
              {name.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </text>
          );
        },
      },
    },
    {
      name: "gioiTinh",
      label: "Gi???i t??nh",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "idLoaiPhong",
      label: "Lo???i ph??ng",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "chieuDai",
      label: "Chi???u d??i",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
        customBodyRender: (name) => {
          return <text>{name}m</text>;
        },
      },
    },
    {
      name: "chieuRong",
      label: "Chi???u r???ng",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
        customBodyRender: (name) => {
          return <text>{name}m</text>;
        },
      },
    },
    {
      name: "tinh",
      label: "T???nh th??nh",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "quan",
      label: "Qu???n huy???n",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "phuong",
      label: "Ph?????ng x??",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "duong",
      label: "???????ng/ S??? nh??",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "idUser",
      label: "Ng?????i ????ng",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "ngayTao",
      label: "Ng??y ????ng",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: true,
      },
    },
    {
      name: "kiemDuyet",
      label: "Ki???m duy???t",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "xacThuc",
      label: "X??c th???c",
      options: {
        filter: true,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "luotXem",
      label: "L?????t xem",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
      },
    },
    {
      name: "moTa",
      label: "M?? t???",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "170px" } }),
        sort: false,
        customBodyRender: (name) => {
          return <text>{name.substring(0, 100)}...</text>;
        },
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "none",
    onRowClick: (rowData, rowState) => {
      // alert(rowData)
    },
  };

  const datatableDataUser = [
    {
      name: "idUser",
      label: "ID User",
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "thanhVien",
      label: "Ch???c v???",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "matKhau",
      label: "M???t kh???u",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (name) => {
          return <text>{name.substring(0, 10)}**********</text>;
        },
      },
    },
    {
      name: "trangThai",
      label: "Tr???ng Th??i",
      options: {
        filter: false,
        setCellProps: () => ({
          style: { minWidth: "120px", maxWidth: "120px" },
        }),
        sort: true,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "80px", maxWidth: "80px" } }),
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              control={
                <>
                  <IconButton
                    startIcon={<CloudUploadIcon />}
                    variant="contained"
                    size="large"
                    onClick={() =>
                      editTrangThaiKhoa(
                        dataUSER[tableMeta.rowIndex].idUser,
                        dataUSER[tableMeta.rowIndex].trangThai,
                      )
                    }
                  >
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </IconButton>
                </>
              }
            />
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        setCellProps: () => ({ style: { minWidth: "80px", maxWidth: "80px" } }),
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              control={
                <>
                  <IconButton
                    startIcon={<CloudUploadIcon />}
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() =>
                      editTrangThaiMo(
                        dataUSER[tableMeta.rowIndex].idUser,
                        dataUSER[tableMeta.rowIndex].trangThai,
                      )
                    }
                  >
                    <i class="fa fa-unlock" aria-hidden="true"></i>
                  </IconButton>
                </>
              }
            />
          );
        },
      },
    },
  ];

  return (
    <>
      <PageTitle title="Qu???n l??" />
      <Grid container spacing={4}>
        <Grid className={styleadmin} item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginBottom: 15, paddingTop: 10, paddingBottom: 10 }}
            onClick={() => addRoom(props.history)}
          >
            Th??m ph??ng tr???
          </Button>
          <MUIDataTable
            title="Qu???n l?? ph??ng tr??? host"
            data={dataHost}
            columns={columns}
            options={options}
          />
        </Grid>

        <Grid className={style} item xs={12}>
          <MUIDataTable
            title="Qu???n l?? ph??ng tr??? admin"
            data={dataPost}
            columns={columnsadmin}
            options={options}
          />
        </Grid>

        <Grid className={style} item xs={12}>
          <MUIDataTable
            title="Qu???n l?? username"
            data={dataUSER}
            columns={datatableDataUser}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
