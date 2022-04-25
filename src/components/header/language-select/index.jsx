import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { changeLanguage } from "i18next";
import useLocalStorage from "@hooks/local-storage";

import s from "./style.module.css";

export default function LanguageSelect() {
  const { item: storedLang, setItem: setLangToStore } = useLocalStorage("ABV_CRM.language");

  const [selected, setSelected] = useState(() => {
    const lang = storedLang || "ru";
    selectLanguage(lang);
    return lang;
  });

  function selectLanguage(lang) {
    changeLanguage(lang).then();
    setLangToStore(lang);
  }

  function selectHandler(event) {
    const lang = event.target ? event.target.value : event;

    selectLanguage(lang);
    setSelected(lang);
  }

  return <>
    <Select
      className={s.select}
      value={selected}
      onChange={selectHandler}
      size="small"
    >
      <MenuItem value="ru">ru</MenuItem>
      <MenuItem value="en">en</MenuItem>
    </Select>
  </>;
}
