import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import { addRoom } from "../../context/UserContext";
// data
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./styles";
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
  //     alert('Thêm thành công');
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
  const getDataPost = async () => {
    const baseUrl = "http://localhost:8000/ds";
    const response = await axios.get(baseUrl);
    setDataPost(response.data);
  };
  useEffect(() => {
    getDataPost();
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
        setCellProps: () => ({ style: {  minWidth: "100px", maxWidth: "100px" } }),
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
                      {"Thông báo"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Có chắc chắn là bạn muốn xóa?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                      </Button>
                      <Button
                        onClick={() =>
                          removeSanPham(article.idroomdele, article.urlimage)
                        }
                        color="primary"
                        autoFocus
                      >
                        Xóa
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
        setCellProps: () => ({ style: {  minWidth: "80px", maxWidth: "80px" } }),
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
                      state: dataPost[tableMeta.rowIndex],
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
      name: "",
      options: {
        filter: false,
        setCellProps: () => ({ style: {  minWidth: "80px", maxWidth: "80px" } }),
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
                    // component={Link}
                    // to={{
                    //   pathname: "/app/notifications/",
                    //   state: dataPost[tableMeta.rowIndex],
                    // }}
                  >
                    <i class="fa fa-eye" aria-hidden="true"></i>
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
      label: "Hình ảnh",
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
      label: "Tên phòng",
      options: {
        filter: false,
        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: true,
      },
    },
    {
      name: "giaPhong",
      label: "Giá phòng",
      options: {
        filter: false,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: true,
      },
    },
    {
      name: "giaNuoc",
      label: "Giá nước",
      options: {
        filter: false,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: true,
      },
    },
    {
      name: "giaDien",
      label: "Giá điện",
      options: {
        filter: false,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: true,
      },
    },
    {
      name: "gioiTinh",
      label: "Giới tính",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "idLoaiPhong",
      label: "Loại phòng",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "chieuDai",
      label: "Chiều dài",
      options: {
        filter: false,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "chieuRong",
      label: "Chiều rộng",
      options: {
        filter: false,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "tinh",
      label: "Tỉnh thành",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "quan",
      label: "Quận huyện",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "phuong",
      label: "Phường xã",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "duong",
      label: "Đường/ Số nhà",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "idTienIch",
      label: "Tiện ích",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px"  } }),
        sort: false,
        display: false,
        customBodyRender: (name) => {
          return <Typography>{name}</Typography>;
        },
      },
    },
    {
      name: "idUser",
      label: "Người đăng",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "ngayTao",
      label: "Ngày đăng",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: true,
      },
    },
    {
      name: "kiemDuyet",
      label: "Kiểm duyệt",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "xacThuc",
      label: "Xác thực",
      options: {
        filter: true,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "luotXem",
      label: "Lượt xem",
      options: {
        filter: false,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
      },
    },
    {
      name: "moTa",
      label: "Mô tả",
      options: {
        filter: false,        setCellProps: () => ({ style: {  minWidth: "170px",   } }),
        sort: false,
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
    [
      "Admin",
      "Admin",
      "admin@gmail.com",
      "0905.196.052",
      "https://1.bp.blogspot.com/-n_bFzL9lPUU/Xp23H9Sk8yI/AAAAAAAAhyA/JYfvZhwguxc8vT_YS3w14Xi3YWf3hxqIQCLcBGAsYHQ/s1600/Hinh-Anh-Dep-Tren-Mang%2B%25282%2529.jpg",
      "Nam",
      "Admin",
    ],
    [
      "Nguyễn Duy Tài",
      "Nguyenduytai",
      "ndt3444@gmail.com",
      "0323.445.765",
      "https://1.bp.blogspot.com/-n_bFzL9lPUU/Xp23H9Sk8yI/AAAAAAAAhyA/JYfvZhwguxc8vT_YS3w14Xi3YWf3hxqIQCLcBGAsYHQ/s1600/Hinh-Anh-Dep-Tren-Mang%2B%25282%2529.jpg",
      "Nam",
      "Chủ trọ",
    ],
  ];

  const datatableDataTienIch = [
    ["Máy lạnh", "icon-may-lanh"],
    ["Nguyễn Duy Tài", "Nguyenduytai"],
  ];

  return (
    <>
      <PageTitle title="Quản lý" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginBottom: 15, paddingTop: 10, paddingBottom: 10 }}
            onClick={() => addRoom(props.history)}
          >
            Thêm phòng trọ
          </Button>
          <MUIDataTable
            title="Quản lý phòng trọ"
            data={dataPost}
            columns={columns}
            options={options}
          />
        </Grid>

        <Grid item xs={12}>
          <MUIDataTable
            title="Quản lý username"
            data={datatableDataUser}
            columns={[
              "Tên Người Dùng",
              "Tên đăng nhập",
              "Email",
              "Số điện thoại",
              "Avartar",
              "Giới tính",
              "Chức vụ",
            ]}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
