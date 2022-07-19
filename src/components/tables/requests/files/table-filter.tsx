import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { classificationsType } from "@store/types";

import s from "@components/tables/requests/files/style.module.scss";

import { InputAdornment, MenuItem, TextField } from "@mui/material";
import * as Icon from "@mui/icons-material";

const TableFilter: React.FC<{ classifications: classificationsType[] }> = ({
  classifications,
}) => {
  const [model, setModel] = useState<classificationsType>(
    {} as classificationsType
  );
  const [subModel, setSubModel] = useState<string>("");
  const { t } = useTranslation();

  return (
    <>
      {classifications?.length && (
        <>
          <TextField
            className={s.textField}
            label={t("search")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon.Search />
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
            onChange={(event) => setModel(JSON.parse(event.target.value))}
          >
            {classifications.map((option, index) => (
              <MenuItem
                key={option.name + index}
                value={JSON.stringify(option)}
              >
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className={s.textField}
            id="outlined-select-currency"
            select
            disabled={!model.subClasses.length}
            label={t("documentSubClass")}
            value={subModel}
            onChange={(event) => setSubModel(event.target.value)}
          >
            {model.subClasses.map((option, index) => (
              <MenuItem key={option.name + index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    </>
  );
};

export default TableFilter;
