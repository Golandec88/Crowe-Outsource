import {
  Autocomplete,
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TextField,
  TableHead,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
  Alert,
  AlertTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getRequests } from "@modules/request/creators";
import useItemsUploader from "@hooks/items-uploader";
import { useState } from "react";
import { useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableSkeleton from "@components/tables/skeleton";
import { useMemo } from "react";
import { t } from "i18next";
import s from "@components/tables/requests/manager/style.module.scss";
import { Check, Close } from "@mui/icons-material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function History() {
  const [{ items: requests, loading }] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    { statuses: [4] }
  );
  const requestInfo = {
    contractId: 12312221,
    contractDateFrom: new Date("05 October 2011 14:48 UTC").toISOString(),
    contractDateTo: new Date().toISOString(),
    operatorId: "knasanno123j9asd",
    reports: [
      {
        typeId: "asdasd12312",
        deadline: "28",
        name: "ndfl",
      },
      {
        typeId: "asdas123d12312",
        deadline: "31",
        name: "soc-nalog",
      },
      {
        typeId: "asdasd32212312",
        deadline: "04",
        name: "nds",
      },
      {
        typeId: "asdasd12312",
        deadline: "28",
        name: "ndflqwe",
      },
      {
        typeId: "asdas123d12312",
        deadline: "31",
        name: "soc-nalogqweq",
      },
      {
        typeId: "asdasd32212312",
        deadline: "04",
        name: "ndsqwe",
      },
    ],
    history: [
      {
        date: new Date().toLocaleString(),
        type: "Перемещение клиента между операторами",
        typeId: "asdasd12312",
        operatorId: "123asd1223",
      },
      {
        date: new Date().toLocaleString(),
        type: "Оплата договора",
        typeId: "asdasd12312",
        contractNum: 222123,
      },
      {
        date: new Date().toLocaleString(),
        type: "report",
        typeId: "asdasd12312",
        name: "НДФЛ",
        comment: "Сдан позже по причине сбоя в системе",
      },
      {
        date: new Date().toLocaleString(),
        type: "Оплата договора",
        typeId: "asdasd12312",
        contractNum: 222123,
      },
      {
        date: new Date().toLocaleString(),
        type: "report",
        typeId: "asdasd12312",
        name: "НДС",
        comment: "Сдан вовремя",
      },
    ],
  };

  const [currentRequest, setCurrentRequest] = useState({});
  const [openReports, setOpenReports] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const reportsList = useMemo(
    () => requestInfo.history.filter((item) => item.type === "report"),
    [requestInfo]
  );
  const activityList = useMemo(
    () => requestInfo.history.filter((item) => item.type !== "report"),
    [requestInfo]
  );

  useEffect(() => {
    setCurrentRequest(requests[0]);
  }, [requests]);

  return (
    <Box sx={{ mb: "25px" }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={requests}
        getOptionLabel={(option) => option?.request?.companyInfo?.tin}
        sx={{ width: 300 }}
        onChange={(event, newValue) => {
          setCurrentRequest(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="ИНН" />}
      />
      {currentRequest?.request && (
        <Paper sx={{ py: 2, px: "20px", mt: 4 }}>
          <p>
            <b>Фирма: </b> {currentRequest.request.companyInfo.name}
          </p>
          <p>
            <b>Ответственный: </b> Operator
          </p>
          <p>
            <b>Договор № </b> {requestInfo.contractId}
          </p>
          <p>
            <b>Срок действия договора: </b>
            {`${new Date(
              requestInfo.contractDateFrom
            ).toLocaleDateString()} - ${new Date(
              requestInfo.contractDateTo
            ).toLocaleDateString()}`}
          </p>

          <Paper
            elevation={0}
            sx={{
              width: "100%",
            }}
          >
            {requestInfo.reports.map((item) => {
              const status = requestInfo.history.find(
                (elem) => elem.typeId === item.typeId
              )
                ? "success"
                : "error";

              return (
                <Alert
                  key={item.name + item.typeId}
                  severity={status}
                  sx={{ mb: 2 }}
                  action={
                    <IconButton
                      title={status === "success" ? "Отменить" : "Подтвердить"}
                      sx={{ mt: "10px" }}
                    >
                      {status === "success" ? (
                        <Close sx={{ color: "red" }} />
                      ) : (
                        <Check sx={{ color: "green" }} />
                      )}
                    </IconButton>
                  }
                >
                  <AlertTitle>{item.name}</AlertTitle>
                  Сдан вовремя
                </Alert>
              );
            })}
          </Paper>

          <Box elevation={0} sx={{ mb: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ background: "#f5f5f5", p: 2 }}
              onClick={() => setOpenReports(!openReports)}
            >
              <IconButton size="small" sx={{ mr: "auto" }}>
                {openReports ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
              <span>
                <b>История отчетности</b>
              </span>
            </Stack>

            <Collapse
              in={openReports}
              timeout="auto"
              unmountOnExit
              sx={{ mb: 2 }}
            >
              {loading ? (
                <TableSkeleton cols={4} />
              ) : currentRequest?.request ? (
                <>
                  <ReportsHistory reports={reportsList} />
                </>
              ) : (
                <>
                  <Stack
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      p: 2,
                    }}
                  >
                    <span>{t("empty")}</span>
                  </Stack>
                </>
              )}
            </Collapse>
          </Box>
          <Box elevation={0}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ background: "#f5f5f5", p: 2 }}
              onClick={() => setOpenHistory(!openHistory)}
            >
              <IconButton size="small" sx={{ mr: "auto" }}>
                {openHistory ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
              <span>
                <b>История активности</b>
              </span>
            </Stack>
            <Collapse in={openHistory} timeout="auto" unmountOnExit>
              {loading ? (
                <TableSkeleton cols={4} />
              ) : currentRequest?.request ? (
                <>
                  <ActivityHistory activity={activityList} />
                </>
              ) : (
                <>
                  <Stack
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      p: 2,
                    }}
                  >
                    <span>{t("empty")}</span>
                  </Stack>
                </>
              )}
            </Collapse>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

function ReportsHistory({ reports }) {
  const reportsType = [
    {
      typeId: "asdadsad",
      name: "НДС",
    },
    {
      typeId: "123asda1",
      name: "НДФЛ",
    },
    {
      typeId: "asd123aa",
      name: "ИНПС",
    },
    {
      typeId: "2223zxc",
      name: "ЫВФЙЦ",
    },
  ];
  return (
    <>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="demo-simple-select-label">Фильтр по типу</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Фильтр по типу"
        >
          {reportsType.map((item) => (
            <MenuItem value={item.typeID} key={item.name + "-filter-item"}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box component="form" sx={{ display: "flex", alingItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Дата с"
            value={new Date()}
            onChange={(newValue) => {
              console.log(newValue);
            }}
            renderInput={(params) => (
              <TextField sx={{ my: 2, mr: 2 }} {...params} />
            )}
          />
          <DatePicker
            label="Дата до"
            value={new Date()}
            onChange={(newValue) => {
              console.log(newValue);
            }}
            renderInput={(params) => <TextField sx={{ my: 2 }} {...params} />}
          />
        </LocalizationProvider>
        <FormControlLabel
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            ml: "auto",
          }}
          control={
            <Switch
              checked={false}
              onChange={() => console.log("asd")}
              name="loading"
              color="primary"
            />
          }
          label="За всё время"
        />
      </Box>

      <Table className={s.table} aria-label="collapsible table">
        <TableHead className={s.head}>
          <TableRow>
            <TableCell>{t("date")}</TableCell>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("comment")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {reports.map((elem) => (
            <TableRow key={elem.comment}>
              {Object.keys(elem).map((key, index) => {
                if (elem[key] !== "report" && key !== "typeId")
                  return (
                    <TableCell key={elem.comment + "-" + index}>
                      {elem[key]}
                    </TableCell>
                  );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function ActivityHistory({ activity }) {
  const activitiesType = [
    {
      typeId: "asdadsad",
      name: "НДС",
    },
    {
      typeId: "123asda1",
      name: "НДФЛ",
    },
    {
      typeId: "asd123aa",
      name: "ИНПС",
    },
    {
      typeId: "2223zxc",
      name: "ЫВФЙЦ",
    },
  ];
  return (
    <>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="demo-simple-select-label">Фильтр по типу</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Фильтр по типу"
        >
          {activitiesType.map((item) => (
            <MenuItem value={item.typeID} key={item.name + "-filter-item"}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box component="form" sx={{ display: "flex", alingItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Дата с"
            value={new Date()}
            onChange={(newValue) => {
              console.log(newValue);
            }}
            renderInput={(params) => (
              <TextField sx={{ my: 2, mr: 2 }} {...params} />
            )}
          />
          <DatePicker
            label="Дата до"
            value={new Date()}
            onChange={(newValue) => {
              console.log(newValue);
            }}
            renderInput={(params) => <TextField sx={{ my: 2 }} {...params} />}
          />
        </LocalizationProvider>
        <FormControlLabel
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            ml: "auto",
          }}
          control={
            <Switch
              checked={false}
              onChange={() => console.log("asd")}
              name="loading"
              color="primary"
            />
          }
          label="За всё время"
        />
      </Box>

      <Table className={s.table} aria-label="collapsible table">
        <TableHead className={s.head}>
          <TableRow>
            <TableCell>{t("date")}</TableCell>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("comment")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {activity.map((elem, index) => (
            <TableRow key={elem.type + index}>
              {Object.keys(elem).map((key, index) => {
                if (key !== "typeId")
                  return (
                    <TableCell key={elem.comment + "-" + index}>
                      {elem[key]}
                    </TableCell>
                  );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
