import React from "react";
import i18n from "i18next";
import SwitchButton from "@components/header/SelectLanguage/SwitchButton";

const LanguageSelect = () => {
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

  );



};

export default LanguageSelect;
