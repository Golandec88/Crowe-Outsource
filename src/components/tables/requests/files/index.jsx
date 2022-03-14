import { useState } from "react";
import { Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import * as Icon from "@mui/icons-material";

import s from "./style.module.scss";

import SelectTable from "@components/tables/requests/files/table.jsx";
import Card from "@components/card";
import Title from "@components/title";
import proptypes from "prop-types";

const docTypes = [
  { name: "Все документы" },
  { name: "ККМ" },
  { name: "Банк" },
  { name: "Приказы" },
  { name: "Аренда" },
];

export default function FileTable({ offset }) {
  const [selectedDocType, setSelectedDocTypes] = useState([docTypes[0].name]);
  const setSelectedNum = useState("")[1];

  return (<>
    <Card className={`${s.container} ${offset > 135 ? s.ml : ""}`}>
      <Grid container>
        <Grid item xs={12}>
          <Title size="small" text="Файлы пользователя" />
          <TextField
            className={s.textField}
            label="Поиск"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon.Search/>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={s.textField}
            id="outlined-select-currency"
            select
            label="Тип документа"
            value={selectedDocType}
            onChange={event => setSelectedDocTypes(event.target.value)}
          >
            {docTypes.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <SelectTable getSelectedDocs={val => setSelectedNum(val)}/>
        </Grid>
      </Grid>
    </Card>
  </>
  );
}

FileTable.propTypes = {
  offset: proptypes.number
};