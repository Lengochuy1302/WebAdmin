import React, { useEffect, useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import axios from "axios";
// styles
import useStyles from "./styles";
import "font-awesome/css/font-awesome.min.css";
// components

import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "FaceBook", value: 30.0, color: "primary" },
  { name: "YouTube", value: 10.0, color: "secondary" },
  { name: "WebSite", value: 55.9, color: "warning" },
  { name: "Telegram", value: 4.1, color: "primary" },
];

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  const [dataPost, setDataPost] = React.useState([]);
  const [view, setdataview] = React.useState(0);

  const getDataHostt = async (id_token) => {
    const baseUrl = "http://localhost:8000/dshost/" + id_token;
    const response = await axios.get(baseUrl);
    setDataPost(response.data);
  };
  const getDataPost = async () => {
    const baseUrl = "http://localhost:8000/ds";
    const response = await axios.get(baseUrl);
    setDataPost(response.data);
  };

  const getDataHosttView = async (id_token) => {
    const baseUrl = "http://localhost:8000/dshostview/" + id_token;
    axios.get(baseUrl).then((response) => {
      setdataview(response.data);
      console.log(response);
    });
  };

  const getDataPostView = async () => {
    const baseUrl = "http://localhost:8000/dsview";
    axios.get(baseUrl).then((response) => {
      setdataview(response.data);
      console.log(response);
    });
  };

  const [datamember, setDataMember] = React.useState([]);
  const getDataMember = async () => {
    const baseUrl = "http://localhost:8000/usermember";
    const response = await axios.get(baseUrl);
    setDataMember(response.data);
  };

  const [datahost, setDataHost] = React.useState([]);
  const getDataHost = async () => {
    const baseUrl = "http://localhost:8000/userhost";
    const response = await axios.get(baseUrl);
    setDataHost(response.data);
  };

  useEffect(() => {
    const thanhvien = localStorage.getItem("thanhvien_token");
    const id = localStorage.getItem("id_token");
    if (thanhvien === "host") {
      getDataHostt(id);
      getDataHosttView(id);
    } else {
      getDataPost();
      getDataPostView();
    }
    getDataMember();
    getDataHost();
  }, []);
  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      <PageTitle title="Th???ng k??" colorBrightness="secondary" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="T???ng S??? L?????ng Ph??ng"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {dataPost.length} Ph??ng
              </Typography>
              <LineChart
                width={270}
                height={30}
                data={[{ value: 0 }, { value: dataPost.length }]}
                margin={{ left: theme.spacing(2) }}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {/* <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  T???ng S??? Ph??ng
                </Typography>
                <Typography size="md">300</Typography>
              </Grid> */}
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Ch??? Ph??ng
                </Typography>
                <Typography size="md">{datahost.length}</Typography>
              </Grid>
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Ph??ng ???? ???????c Thu??
                </Typography>
                <Typography size="md">30</Typography>
              </Grid>
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  S??? Ph??ng C??n
                </Typography>
                <Typography size="md">270</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Th???ng k?? th??nh vi??n"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Ch??? Ph??ng
              </Typography>
              <Typography size="md">{datahost.length} ng?????i</Typography>

              <LinearProgress
                variant="determinate"
                value={datahost.length}
                classes={{ barColorPrimary: classes.progressBar }}
                className={classes.progress}
              />
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness=""
                className={classes.progressSectionTitle}
              >
                Ng?????i D??ng
              </Typography>
              <Typography size="md">{datamember.length} ng?????i</Typography>

              <LinearProgress
                variant="determinate"
                value={datamember.length}
                classes={{ barColorPrimary: classes.progressBar }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="L?????t Xem Trung B??nh"
            colorBrightness="secondary"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
              >
                {view} <i class="fa fa-eye" aria-hidden="true"></i>
              </Typography>
            </div>
            <div className={classes.serverOverviewElement}>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={90} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  L?????t Truy C???p T??? C??c Thi???t B???
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Tablet
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Mobile
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Desktop
                    </Typography>
                  </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={(e) => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Theo Ng??y</MenuItem>
                  <MenuItem value="monthly">Theo Tu???n</MenuItem>
                  <MenuItem value="weekly">Theo Th??ng</MenuItem>
                  <MenuItem value="monthly">Theo N??m</MenuItem>
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={mainChartData}
              >
                <YAxis
                  ticks={[0, 2500, 5000, 5000]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
                  tickFormatter={(i) => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <Area
                  type="natural"
                  dataKey="desktop"
                  fill={theme.palette.background.light}
                  strokeWidth={0}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="mobile"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="tablet"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 100, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
