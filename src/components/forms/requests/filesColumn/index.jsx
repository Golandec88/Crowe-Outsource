import React, { useState } from "react";
import styles from "./style.module.scss";
import Box from "@mui/material/Box";
import SelectTable from "../selectTable";
import { Button, Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import * as Icon from "@mui/icons-material";

const docTypes = [
  { name: "Все документы" },
  { name: "ККМ" },
  { name: "Банк" },
  { name: "Приказы" },
  { name: "Аренда" },
];


const FileTable = (props) => {

  const [selectedDocType, setSelectedDocTypes] = useState([docTypes[0].name]);
  const [selectedNum, setSelectedNum] = useState("");

  const getSelectedDocs = (data) => {
    setSelectedNum(data);
  };

  const handleSelectedDoc = (event) => {
    setSelectedDocTypes(event.target.value);
  };

  return (<>
    <Box className={styles.cardRound}>
      <Grid container>
        <Grid item xs={12}>
          <h3 className={styles.title}>Файлы пользователя</h3>
          <TextField
            className={styles.textField}
            label="Поиск"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon.Search/>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container className={styles.selectGroup}>
            <Grid item xs={9}>
              <TextField
                className={styles.textField}
                id="outlined-select-currency"
                select
                label="Тип документа"
                value={selectedDocType}
                onChange={handleSelectedDoc}
              >
                {docTypes.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <Button className={styles.button} disabled={selectedNum.length < 1} variant="outlined"
                size={"large"}
                color={"error"}>
                  Удалить
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SelectTable getSelectedDocs={getSelectedDocs}/>
        </Grid>
      </Grid>
    </Box>
  </>
  );
};

export default FileTable;