import { useState } from "react";
import styles from "./styles.module.scss";
import { Box, Grid, TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { LocalizationProvider } from "@mui/lab";


const CompanyInfo = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [lastPaymentDate, setLastPaymentDate] = useState(null);

  const handleDateFrom = (newValue) => {
    setDateFrom(newValue);
  };
  const handleDateTo = (newValue) => {
    setDateTo(newValue);
  };
  const handleLastPaymentDate = (newValue) => {
    setLastPaymentDate(newValue);
  };


  return (<>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Box
        className={styles.cardRound}
      >
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <h3 className={styles.title}> Информация по компании</h3>
            <TextField className={styles.textField}
              label="Наименование организации"
              variant="outlined"
              margin={"none"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={12}>
            <h3 className={styles.title}> Срок действия договора</h3>
            <div className={styles.oneLineForm}>
              <DesktopDatePicker
                label="От"
                inputFormat="dd/MM/yyyy"
                value={dateFrom}
                onChange={handleDateFrom}
                renderInput={(params) => <TextField className={styles.textField50} {...params} />}
              />
              <DesktopDatePicker
                label="До"
                inputFormat="dd/MM/yyyy"
                value={dateTo}
                onChange={handleDateTo}
                renderInput={(params) => <TextField className={styles.textField50} {...params} />}
              />
            </div>
          </Grid>
          <Grid item className={styles.paddingZero} xs={12}>
            <h3 className={styles.title}>Последняя оплата</h3>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <DesktopDatePicker
              label="Дата оплаты"
              inputFormat="dd/MM/yyyy"
              value={lastPaymentDate}
              onChange={handleLastPaymentDate}
              renderInput={(params) => <TextField className={styles.textField} {...params} />}
            />
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="Сумма"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="ИНН"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="ОКЕД"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={12}>
            <TextField className={styles.textField}
              label="Адрес организации"
              variant="outlined"
              margin={"none"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="НДС регистрационный номер"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="Банковский счёт"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={3}>
            <TextField className={styles.textField}
              label="МФО"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={9}>
            <TextField className={styles.textField}
              label="Банк"
              variant="outlined"
              margin={"none"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="Директор"
              variant="outlined"
              margin={"none"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="Главный Бухгалтер"
              variant="outlined"
              margin={"none"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="Телефон"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item className={styles.paddingZero} xs={6}>
            <TextField className={styles.textField}
              label="Email"
              variant="outlined"
              margin={"none"}/>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  </>
  );
};

export default CompanyInfo;