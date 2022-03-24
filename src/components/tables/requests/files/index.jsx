import { useState } from "react";
import { Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import * as Icon from "@mui/icons-material";
import s from "./style.module.scss";
import SelectTable from "@components/tables/requests/files/table.jsx";
import Card from "@components/card";
import Title from "@components/title";
import useItemsUploader from "@hooks/items-uploader";
import { getClassifications } from "@modules/request/creators";
import proptypes from "prop-types";


export default function FileTable({ offset, selected }) {
  const [classifications] = useItemsUploader("request", "classifications", getClassifications);
  const [selectedDocType, setSelectedDocTypes] = useState([]);
  const [selectedSubDoc, setSelectedSubDoc] = useState([]);
  const setSelectedNum = useState();

  return <>
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <Title size="small" text="Файлы пользователя"/>
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
            {classifications.items.classes?.map((option, index) => (
              <MenuItem key={option.name + index} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className={s.textField}
            id="outlined-select-currency"
            select
            disabled={!selectedDocType.subClasses}
            label="Подтип документа"
            value={selectedSubDoc}
            onChange={event => setSelectedSubDoc(event.target.value)}
          >{selectedDocType.subClasses?.map((option, index) => (
              <MenuItem key={option.name + index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <SelectTable getSelectedDocs={val => setSelectedNum(val)}
            files={selected?.request.attachedFiles}
            classifications={classifications}
          />
        </Grid>
      </Grid>
    </Card>
  </>;
}

FileTable.propTypes = {
  offset: proptypes.number,
  selected: proptypes.object
};