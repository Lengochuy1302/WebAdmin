import React from "react";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// styles
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import useStyle from "./styles";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
// components
import Button from "@material-ui/core/Button";
import PageTitle from "../../components/PageTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

import Paper from "@material-ui/core/Paper";

import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function TypographyPage() {
  var classes = useStyle();
  const classe = useStyles();
  const [tenPhong, setTenPhong] = React.useState("");
  const [giaPhong, setGiaPhong] = React.useState("");
  const [idLoaiPhong, setIdLoaiPhong] = React.useState("");
  const [chieuDai, setChieuDai] = React.useState("");
  const [chieuRong, setChieuRong] = React.useState("");
  const [giaNguoc, setGiaNuoc] = React.useState("");
  const [giaDien, setGiaDien] = React.useState("");
  const [moTa, setMoTa] = React.useState("");
  const [tinh, setTinh] = React.useState("");
  const [quan, setQuan] = React.useState("");
  const [phuong, setPhuong] = React.useState("");
  const [duong, setDuong] = React.useState("");
  const [idUser, setIdUser] = React.useState("");
  const [idTienIch, setIdTienIch] = React.useState("");
  const [xacThuc, setXacThuc] = React.useState("false");
  const [kiemDuyet, setKiemDuyet] = React.useState("false");
  const [gioiTinh, setGioiTinh] = React.useState("");
  const [ngayTao, setNgayTao] = React.useState("");
  const [luotXem, setLuotXem] = React.useState("");
  const [userInfo, setuserInfo] = React.useState({
    file: [],
    filepreview: null,
  });
  const getSteps = () => {
    return [
      "Thêm thông tin địa chỉ",
      "Giá tiền, loại phòng và diện tích",
      "Thêm hình ảnh và tiện ích",
      "Thêm tên và mô tả",
    ];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.input} style={{ marginBottom: 20 }}>
                <Typography className={classes.logotypeText}>
                  Địa chỉ
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Tỉnh"
                  variant="outlined"
                  {...register("tinh")}
                  onChange={setTinh}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Quận"
                  variant="outlined"
                  {...register("quan")}
                  onChange={setQuan}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Phường"
                  variant="outlined"
                  {...register("phuong")}
                  onChange={setPhuong}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Đường/ Số nhà"
                  variant="outlined"
                  {...register("duong")}
                  onChange={setDuong}
                />
              </div>
            </form>
          </>
        );
      case 1:
        return (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.input}>
                <Typography className={classes.logotypeText}>
                  Giá thuê
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Giá phòng"
                  onChange={setGiaPhong}
                  {...register("giaPhong")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Giá nước"
                  onChange={setGiaNuoc}
                  {...register("giaNuoc")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Giá điện"
                  onChange={setGiaDien}
                  {...register("giaDien")}
                  variant="outlined"
                />
              </div>
              <div className={classes.input}>
                <FormControl variant="outlined" className={classes.inputText1}>
                  <select
                    className={classes.inputfgb}
                    style={{
                      height: 55,
                      paddingLeft: 10,
                      backgroundColor: "#fff",
                      borderRadius: 5,
                      fontSize: 16,
                    }}
                    {...register("loaiPhong", { required: true })}
                  >
                    <option value="Phòng trọ">Phòng trọ</option>
                    <option value="Chung cư">Chung cư</option>
                    <option value="Nhà nguyên căn">Nhà nguyên căn</option>
                  </select>
                </FormControl>
              </div>
              <div
                style={{ marginBottom: 20 }}
                className={classes.inputdientich}
              >
                <Typography className={classes.logotypeText}>
                  Diện tích
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Chiều dài"
                  onChange={setChieuDai}
                  {...register("chieuDai")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Chiều rộng"
                  onChange={setChieuRong}
                  {...register("chieuRong")}
                  variant="outlined"
                />
              </div>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: 20  }} className={classes.input}>
                <FormControl component="fieldset">
                  <Typography className={classes.logotypeText}>
                    Giới tính
                  </Typography>
                  <RadioGroup
                
                    className={classes.formTienIch}
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    {...register("gioiTinh")}
                    onChange={handleChangegioitinh}
                  >
                    <FormControlLabel
                      className={classes.radio}
                      value="Nữ"
                      {...register("gioiTinh")}
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      className={classes.radio}
                      value="Nam"
                      {...register("gioiTinh")}
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      className={classes.radio}
                      value="Cả Hai"
                      {...register("gioiTinh")}
                      control={<Radio />}
                      label="Cả Hai"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            <div style={{ marginBottom: 20 , display: "none"}} className={classes.input}>
              <FormControl
                required
                component="fieldset"
                className={classes.formControl}
              >
                    <Typography >
                    Tiện ích
                  </Typography>
                <FormGroup           
                className={classes.formTienIch}
                >
                  <FormControlLabel
                  className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={tivi}
                        onChange={handleChangetienich}
                        name="tivi"
                      />
                    }
                    label="Tivi"
                  />
                  <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={wcrieng}
                        onChange={handleChangetienich}
                        name="wcrieng"
                      />
                    }
                    label="WC Riêng"
                  />
                  <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={maygiat}
                        onChange={handleChangetienich}
                        name="maygiat"
                      />
                    }
                    label="Máy Giặt"
                  />
                   <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={gaclung}
                        onChange={handleChangetienich}
                        name="gaclung"
                      />
                    }
                    label="Gác Lửng"
                  />
                  <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={maylanh}
                        onChange={handleChangetienich}
                        name="maylanh"
                      />
                    }
                    label="Máy Lạnh"
                  />
                  <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={tulanh}
                        onChange={handleChangetienich}
                        name="tulanh"
                      />
                    }
                    label="Tủ Lạnh"
                  />
                   <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={anninh}
                        onChange={handleChangetienich}
                        name="anninh"
                      />
                    }
                    label="An Ninh"
                  />
                  <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={thucung}
                        onChange={handleChangetienich}
                        name="thucung"
                      />
                    }
                    label="Thú Cưng"
                  />
                  <FormControlLabel
                            className={classes.labelForm}
                    control={
                      <Checkbox
                        checked={tudo}
                        onChange={handleChangetienich}
                        name="tudo"
                      />
                    }
                    label="Tủ Đồ"
                  />
                </FormGroup>
              </FormControl>
            </div>

            </form>
          </>
        );
      case 3:
        return (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.input} style={{display: "none", marginBottom: 20 }}>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Tỉnh"
                  variant="outlined"
                  {...register("TienIch")}
                  defaultValue={ JSON.stringify(statetienich).replace(/['"]+/g, '').slice(1,-1)}
            
                />
           
              </div>
              <div className={classes.input}>
                <TextField
                  className={classes.inputText1}
                  id="outlined-basic"
                  label="Tên phòng trọ"
                  onChange={setTenPhong}
                  {...register("tenPhong")}
                  variant="outlined"
                />
              </div>
             
              <div style={{ marginBottom: 20 }} className={classes.input}>
                <TextField
                  className={classes.inputText3}
                  id="outlined-multiline-static"
                  label="Mô tả"
                  {...register("moTa")}
                  variant="outlined"
                  multiline
                  rows={14}
                  onChange={setMoTa}
                />
              </div>
            </form>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [statetienich, setStatetienich] = React.useState({});

  const handleChangetienich = (event) => {
    setStatetienich({
      ...statetienich,
      [event.target.name]: event.target.checked,
    });

  };
  console.log(statetienich);
  const { tivi,
    wcrieng,
    maygiat,
    gaclung,
    maylanh,
    tulanh,
    anninh,
    thucung,
    tudo } = statetienich;
  // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    if (values.tinh === "" ) {
      alert("Tỉnh không được bỏ trống!");
      return;
    }
    if (values.phuong === "" ) {
      alert("Phường không được bỏ trống!");
      return;
    }
    if (values.quan === "" ) {
      alert("Quận không được bỏ trống!");
      return;
    }
    if (values.duong === "" ) {
      alert("Đường/số nhà không được bỏ trống!");
      return;
    }
    if (values.giaPhong === "" ) {
      alert("Giá phòng không được bỏ trống!");
      return;
    }
    if (values.giaDien === "" ) {
      alert("Giá điện không được bỏ trống!");
      return;
    }
    if (values.giaNuoc === "" ) {
      alert("Giá nước không được bỏ trống!");
      return;
    }
    if (values.chieuDai === "" ) {
      alert("Chiều dài không được bỏ trống!");
      return;
    }
    if (values.chieuRong === "" ) {
      alert("Chiều rộng không được bỏ trống!");
      return;
    }
    if (values.tenPhong === "" ) {
      alert("Tên phòng không được bỏ trống!");
      return;
    }
    if (values.moTa === "" ) {
      alert("Mô tả không được bỏ trống!");
      return;
    }
    axios
      .post("http://localhost:8000/addProduc", values)
      .then((response) => {});
    alert("Thêm thành công");
    refreshPage();
  };

  const uploadImage = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    console.log(data);
    axios.post("http://localhost:8000/uploadfile", data).then((response) => {
      console.log(response);
    });
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const addPhongTro = () => {};

  const [loaiPhong, setLoaiPhong] = React.useState("");

  const handleChangeLoaiPhong = (event) => {
    setLoaiPhong(event.target.value);
  };

  const [value, setValue] = React.useState("Nữ");
  const handleChangegioitinh = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <PageTitle className={classes.logotypeText} title="Thêm Phòng trọ" />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Xác nhận" : "Tiếp tục"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <div style={{ marginBottom: 20 }} className={classes.image}>
            <form
              action="http://localhost:8000/uploadfile"
              enctype="multipart/form-data"
              method="POST"
            >
              {userInfo.filepreview !== null ? (
                <img
                  style={{ width: '50%', borderRadius: 10 }}
                  className="previewimg"
                  src={userInfo.filepreview}
                  alt="UploadImage"
                />
              ) : null}
              <div></div>
              <input type="file" accept="image/*" onChange={uploadImage} />
            </form>
          </div>
          <form
            action="http://localhost:8000/uploadfile"
            enctype="multipart/form-data"
            method="POST"
            className={classes.inputText44}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Button
              type="submit"
              onClick={() => {
                addPhongTro();
              }}
              className={classes.inputText22}
              style={{ marginBottom: 20 }}
              variant="contained"
              color="secondary"
            >
              Thêm phòng trọ
            </Button>
          </form>
        </Paper>
      )}
    </div>
  );
}
