import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// styles
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import useStyle from "./styles";
import "./image.css";
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

export default function TypographyPage(props) {
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

  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [dataPost, setDataPost] = React.useState([]);
  var rong =[];
  const handleImageChange = (e) => {
    if (e.target.files) {
      setDataPost(rong);
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map((item, index) => {
        console.log(e.target.files[index]);
        const data = new FormData();
        data.append("file", e.target.files[index]);
        axios
          .post("http://localhost:8000/uploadfile", data)
          .then((response) => {
            console.log(response);
          });
      });
    }
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return <img className="Anh" src={photo} alt="" key={photo} />;
    });
  };

  const getSteps = () => {
    return [
      "Th??m th??ng tin ?????a ch???",
      "Gi?? ti???n, lo???i ph??ng v?? di???n t??ch",
      "Th??m h??nh ???nh v?? ti???n ??ch",
      "Th??m t??n v?? m?? t???",
    ];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <form
              style={{ marginBottom: 20 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={classes.input}>
                <Typography className={classes.logotypeText}>
                  ?????a ch???
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="T???nh"
                  variant="outlined"
                  {...register("tinhSua")}
                  defaultValue={props.location.state.tinh}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Qu???n"
                  variant="outlined"
                  {...register("quanSua")}
                  defaultValue={props.location.state.quan}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Ph?????ng"
                  variant="outlined"
                  {...register("phuongSua")}
                  defaultValue={props.location.state.phuong}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="???????ng/ S??? nh??"
                  variant="outlined"
                  {...register("duongSua")}
                  defaultValue={props.location.state.duong}
                />
              </div>
            </form>
          </>
        );
      case 1:
        return (
          <>
            <form
              style={{ marginBottom: 20 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={classes.input}>
                <Typography className={classes.logotypeText}>
                  Gi?? thu??
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Gi?? ph??ng"
                  defaultValue={props.location.state.giaPhong}
                  {...register("giaPhongSua")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Gi?? n?????c"
                  defaultValue={props.location.state.giaNuoc}
                  {...register("giaNuocSua")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Gi?? ??i???n"
                  defaultValue={props.location.state.giaDien}
                  {...register("giaDienSua")}
                  variant="outlined"
                />
              </div>
              <div className={classes.input}>
                <FormControl variant="outlined" className={classes.inputText1}>
                  <select
                    defaultValue={loaiPhong}
                    style={{
                      height: 55,
                      paddingLeft: 10,
                      backgroundColor: "#fff",
                      borderRadius: 5,
                      fontSize: 16,
                    }}
                    {...register("loaiPhongSua", { required: true })}
                  >
                    <option value="Ph??ng tr???">Ph??ng tr???</option>
                    <option value="Chung c??">Chung c??</option>
                    <option value="Nh?? nguy??n c??n">Nh?? nguy??n c??n</option>
                  </select>
                </FormControl>
              </div>
              <div className={classes.inputdientich}>
                <Typography className={classes.logotypeText}>
                  Di???n t??ch
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Chi???u d??i"
                  defaultValue={props.location.state.chieuDai}
                  {...register("chieuDaiSua")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Chi???u r???ng"
                  defaultValue={props.location.state.chieuRong}
                  {...register("chieuRongSua")}
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
              <div style={{ marginBottom: 20 }} className={classes.input}>
                <FormControl component="fieldset">
                  <Typography className={classes.logotypeText}>
                    Gi???i t??nh
                  </Typography>
                  <RadioGroup
                    className={classes.formTienIch}
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    {...register("gioiTinhSua")}
                    onChange={handleChangegioitinh}
                  >
                    <FormControlLabel
                      className={classes.radio}
                      value="N???"
                      {...register("gioiTinhSua")}
                      control={<Radio />}
                      label="N???"
                    />
                    <FormControlLabel
                      className={classes.radio}
                      value="Nam"
                      {...register("gioiTinhSua")}
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      className={classes.radio}
                      value="C??? Hai"
                      {...register("gioiTinhSua")}
                      control={<Radio />}
                      label="C??? Hai"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/* <div style={{ marginBottom: 20 , display: "none"}} className={classes.input}>
              <FormControl
                required
                component="fieldset"
                className={classes.formControl}
              >
                    <Typography >
                    Ti???n ??ch
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
                    label="WC Ri??ng"
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
                    label="M??y Gi???t"
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
                    label="G??c L???ng"
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
                    label="M??y L???nh"
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
                    label="T??? L???nh"
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
                    label="Th?? C??ng"
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
                    label="T??? ?????"
                  />
                </FormGroup>
              </FormControl>
            </div> */}
            </form>
          </>
        );
      case 3:
        return (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.input}>
                <TextField
                  className={classes.inputText1}
                  id="outlined-basic"
                  label="T??n ph??ng tr???"
                  defaultValue={props.location.state.tenPhong}
                  {...register("tenPhongSua")}
                  variant="outlined"
                />
                <TextField
                  style={{ display: "none" }}
                  id="outlined-basic"
                  label="T??n ph??ng tr???"
                  defaultValue={props.location.state.idroom}
                  {...register("idRoomSua")}
                  variant="outlined"
                />
                <TextField
                  style={{ display: "none" }}
                  id="outlined-basic"
                  label="T??n ph??ng tr???"
                  defaultValue={props.location.state.image}
                  {...register("imageSua")}
                  variant="outlined"
                />
              </div>

              <div style={{ marginBottom: 20 }} className={classes.input}>
                <TextField
                  className={classes.inputText3}
                  id="outlined-multiline-static"
                  label="M?? t???"
                  {...register("moTaSua")}
                  variant="outlined"
                  multiline
                  rows={14}
                  defaultValue={props.location.state.moTa}
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

  const [statetienich, setStatetienich] = React.useState();

  const handleChangetienich = (event) => {
    setStatetienich({
      ...statetienich,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    if (values.tinhSua === "") {
      alert("T???nh kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.phuongSua === "") {
      alert("Ph?????ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.quanSua === "") {
      alert("Qu???n kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.duongSua === "") {
      alert("???????ng/s??? nh?? kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.giaPhongSua === "") {
      alert("Gi?? ph??ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.giaDienSua === "") {
      alert("Gi?? ??i???n kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.giaNuocSua === "") {
      alert("Gi?? n?????c kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.chieuDaiSua === "") {
      alert("Chi???u d??i kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.chieuRongSua === "") {
      alert("Chi???u r???ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.tenPhongSua === "") {
      alert("T??n ph??ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.moTaSua === "") {
      alert("M?? t??? kh??ng ???????c b??? tr???ng!");
      return;
    }
    axios
      .post("http://localhost:8000/updateProduc", values)
      .then((response) => {});
    alert("S???a th??nh c??ng");
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

  const addPhongTro = () => {};

  const [loaiPhong, setLoaiPhong] = React.useState("");

  const handleChangeLoaiPhong = (event) => {
    setLoaiPhong(event.target.value);
  };

  const [value, setValue] = React.useState("female");
  const handleChangegioitinh = (event) => {
    setValue(event.target.value);
  };

  const renderPhotoss = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      console.log(photo.tenhinh);
      return <img className="Anh"  src={
        "http://localhost:8000/upload/"+ photo.tenhinh
      } alt="" key={photo} />;
    });
  };
  const getDataPost = async (id) => {
    const baseUrl = "http://localhost:8000/getlisstimg/"+ id;
    const response = await axios.get(baseUrl);
    setDataPost(response.data)

  };
  
  useEffect(() => {
    getDataPost(props.location.state.idroom);
    setLoaiPhong(props.location.state.idLoaiPhong);
    setValue(props.location.state.gioiTinh);
  }, []);
  return (
    <div className={classes.root}>
      <PageTitle className={classes.logotypeText} title="S???a Ph??ng tr???" />
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
                    {activeStep === steps.length - 1 ? "X??c nh???n" : "Ti???p t???c"}
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
            <div className="app">
              <div className="heading">Th??m h??nh ???nh</div>
              <form>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleImageChange}
                />
                <div className="label-holder">
                  <label htmlFor="file" className="label">
                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                  </label>
                </div>
                <div className="result">{renderPhotos(selectedFiles)}</div>
                <div className="result">
                {renderPhotoss(dataPost)}
                  </div>
              </form>
            </div>
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
              S???a ph??ng tr???
            </Button>
          </form>
        </Paper>
      )}
    </div>
  );
}
