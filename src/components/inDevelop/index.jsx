import { useTranslation } from "react-i18next";
import s from "./style.module.scss";
import { SettingsSuggest } from "@mui/icons-material";
import proptypes from "prop-types";

export default function InDevelop({ prepend }) {
  const { t } = useTranslation();
  return <>
    <h1 className={s.title}><SettingsSuggest />{t(prepend)} {t("pageInDevelop")}</h1>
  </>;
}

InDevelop.propTypes = {
  prepend: proptypes.string
};
