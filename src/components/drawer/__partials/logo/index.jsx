import { Typography } from "@mui/material";
import * as proptypes from "prop-types";
import { memo } from "react";
import s from "./style.module.scss";
import packageJson from "@src/../package.json";

const AppLogo = () => {
  return (
    <>
      <article className={s.app_logo}>
        <img src={require("@static/logo-social.png").default} alt="logo" />
        <Typography className={s.text}>
          Версия приложения{" "}
          <span className={s.version}>{packageJson.version}</span>
        </Typography>
      </article>
    </>
  );
};

AppLogo.propTypes = {
  version: proptypes.string,
};

AppLogo.defaultProps = {
  version: "1.0.0",
};

export default memo(AppLogo);
