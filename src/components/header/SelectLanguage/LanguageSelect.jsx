import React from "react";
import { Switch } from "antd";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import SwitchButton from "@components/header/SelectLanguage/SwitchButton";


const LanguageSelect = () => {
  const { t } = useTranslation();

  const onChangeLanguage = checked => {
    // if checked is false, French should be adopted
    if (!checked) {
      i18n.changeLanguage("ru");
    } else {
      i18n.changeLanguage("en");
    }
  };
  return (
    <SwitchButton onChangeLanguage={onChangeLanguage} />
  )



};

export default LanguageSelect;
