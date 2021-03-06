import React from "react";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// styles
import Snackbar from "@material-ui/core/Snackbar";
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

export default function TypographyPage() {
  var classes = useStyle();
  const iduser = localStorage.getItem("id_token");
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

  const handleImageChange = (e) => {
    if (e.target.files) {
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.input} style={{ marginBottom: 20 }}>
                <Typography className={classes.logotypeText}>
                  ?????a ch???
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="T???nh"
                  variant="outlined"
                  {...register("tinh")}
                  onChange={setTinh}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Qu???n"
                  variant="outlined"
                  {...register("quan")}
                  onChange={setQuan}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Ph?????ng"
                  variant="outlined"
                  {...register("phuong")}
                  onChange={setPhuong}
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="???????ng/ S??? nh??"
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
                  Gi?? thu??
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Gi?? ph??ng"
                  onChange={setGiaPhong}
                  {...register("giaPhong")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Gi?? n?????c"
                  onChange={setGiaNuoc}
                  {...register("giaNuoc")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Gi?? ??i???n"
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
                    <option value="Ph??ng tr???">Ph??ng tr???</option>
                    <option value="Chung c??">Chung c??</option>
                    <option value="Nh?? nguy??n c??n">Nh?? nguy??n c??n</option>
                  </select>
                </FormControl>
              </div>
              <div
                style={{ marginBottom: 20 }}
                className={classes.inputdientich}
              >
                <Typography className={classes.logotypeText}>
                  Di???n t??ch
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Chi???u d??i"
                  onChange={setChieuDai}
                  {...register("chieuDai")}
                  variant="outlined"
                />
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Chi???u r???ng"
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
                    {...register("gioiTinh")}
                    onChange={handleChangegioitinh}
                  >
                    <FormControlLabel
                      className={classes.radio}
                      value="N???"
                      {...register("gioiTinh")}
                      control={<Radio />}
                      label="N???"
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
                      value="C??? Hai"
                      {...register("gioiTinh")}
                      control={<Radio />}
                      label="C??? Hai"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{ marginBottom: 20, display: "none" }}
                className={classes.input}
              >
                <FormControl
                  required
                  component="fieldset"
                  className={classes.formControl}
                >
                  <Typography>Ti???n ??ch</Typography>
                  <FormGroup className={classes.formTienIch}>
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
              </div>
            </form>
          </>
        );
      case 3:
        return (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className={classes.input}
                style={{ display: "none", marginBottom: 20 }}
              >
                <TextField
                  className={classes.inputText}
                  id="outlined-basic"
                  label="Id User"
                  variant="outlined"
                  {...register("IdUser")}
                  defaultValue={iduser}
                />
              </div>
              <div className={classes.input}>
                <TextField
                  className={classes.inputText1}
                  id="outlined-basic"
                  label="T??n ph??ng tr???"
                  onChange={setTenPhong}
                  {...register("tenPhong")}
                  variant="outlined"
                />
              </div>

              <div style={{ marginBottom: 20 }} className={classes.input}>
                <TextField
                  className={classes.inputText3}
                  id="outlined-multiline-static"
                  label="M?? t???"
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
  const {
    tivi,
    wcrieng,
    maygiat,
    gaclung,
    maylanh,
    tulanh,
    anninh,
    thucung,
    tudo,
  } = statetienich;
  // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    if (values.tinh === "") {
      alert("T???nh kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.phuong === "") {
      alert("Ph?????ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.quan === "") {
      alert("Qu???n kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.duong === "") {
      alert("???????ng/s??? nh?? kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.giaPhong === "") {
      alert("Gi?? ph??ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.giaDien === "") {
      alert("Gi?? ??i???n kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.giaNuoc === "") {
      alert("Gi?? n?????c kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.chieuDai === "") {
      alert("Chi???u d??i kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.chieuRong === "") {
      alert("Chi???u r???ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.tenPhong === "") {
      alert("T??n ph??ng kh??ng ???????c b??? tr???ng!");
      return;
    }
    if (values.moTa === "") {
      alert("M?? t??? kh??ng ???????c b??? tr???ng!");
      return;
    }
    axios
      .post("http://localhost:8000/addProduc", values)
      .then((response) => {});
    alert("Th??m th??nh c??ng");
    refreshPage();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const addPhongTro = () => {};

  const [loaiPhong, setLoaiPhong] = React.useState("");

  const handleChangeLoaiPhong = (event) => {
    setLoaiPhong(event.target.value);
  };

  const [value, setValue] = React.useState("N???");
  const handleChangegioitinh = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <PageTitle className={classes.logotypeText} title="Th??m Ph??ng tr???" />
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
              Th??m ph??ng
            </Button>
          </form>
        </Paper>
      )}
    </div>
  );
}
