import { useState } from "react";
import styles from "./styles.module.scss";
import { Box, Grid, TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { LocalizationProvider } from "@mui/lab";

const UserInfo = (...props) => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);


  const handleDateFrom = (newValue) => {
    setDateFrom(newValue);
  };
  const handleDateTo = (newValue) => {
    setDateTo(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Box
        className={styles.cardRound}
      >
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <h3 className={styles.title}> Информация о пользователе</h3>
            <TextField className={styles.textField}
              label="Имя"
              variant="outlined"
              margin={"none"}/>
            <TextField className={styles.textField}
              label="Фамилия"
              variant="outlined"
              margin={"none"}/>
            <TextField className={styles.textField}
              label="Отчество"
              variant="outlined"
              margin={"none"}/>
            <TextField className={styles.textField}
              label="ИНН / ПИНФЛ физ. лица"
              variant="outlined"
              margin={"none"}
              type={"number"}/>
          </Grid>
          <Grid item xs={6}>
            <h3 className={styles.title}>Серия и номер пасспорта</h3>
            <TextField className={styles.textField}
              label="Серия и номер"
              variant="outlined"
              margin={"none"}/>
            <TextField className={styles.textField}
              label="Дата рождения"
              variant="outlined"
              margin={"none"}/>
            <h3 className={styles.title}>Срок действия паспорта</h3>
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
            <TextField className={styles.textField}
              label="Адрес прописки"
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
  );
};

export default UserInfo;