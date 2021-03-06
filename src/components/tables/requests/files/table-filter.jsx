import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import s from "@components/tables/requests/files/style.module.scss";
import * as Icon from "@mui/icons-material";
import proptypes from "prop-types";

export default function TableFilter(classifications) {
  const [model, setModel] = useState({ subClasses: [] });
  const [subModel, setSubModel] = useState([]);
  const { t } = useTranslation();

  return <>
    {classifications?.length && <>
      <TextField
        className={s.textField}
        label={t("search")}
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
        label={t("documentType")}
        value={model}
        onChange={event => setModel(event.target.value)}
      >
        {classifications.items.map((option, index) => (
          <MenuItem key={option.name + index} value={option}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>;
      <TextField
        className={s.textField}
        id="outlined-select-currency"
        select
        disabled={!model.subClasses}
        label={t("documentSubClass")}
        value={subModel}
        onChange={event => setSubModel(event.target.value)}
      >
        {model.subClasses.map((option, index) => (
          <MenuItem key={option.name + index} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </>}
  </>;
}

TableFilter.propTypes = {
  classifications: proptypes.array
};
