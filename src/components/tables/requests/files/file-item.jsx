import {
  attachedFilesType,
  classificationType,
  fileCheckTypes,
} from "@types/request.js";
import proptypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Check, Close, Download } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import s from "./style.module.scss";

export default function FileItem(
  type,
  counter,
  classifications,
  info,
  onChange,
  status
) {
  const { t } = useTranslation();
  console.log(info);

  return (
    <>
      {status === "ManagerInProcess" ? (
        <Tooltip placement="left" title={t("fileCheckStatuses." + type)}>
          <div
            className={`${s.chip} ${s[type]} ${
              type !== "wait" ? s.active : ""
            }`}
          >
            <span>
              {counter}. {formatName(info.classificationId)}
            </span>

            <div className={s.buttons}>
              <IconButton
                className={s.button}
                size="small"
                aria-label="download"
                onClick={() => onChange(counter - 1, "downloaded")}
              >
                <Download fontSize="small" />
              </IconButton>

              <IconButton
                className={s.button}
                size="small"
                aria-label="error"
                onClick={() => onChange(counter - 1, "error")}
              >
                <Close fontSize="small" />
              </IconButton>
              <IconButton
                className={s.button}
                size="small"
                aria-label="success"
                onClick={() => onChange(counter - 1, "success")}
              >
                <Check fontSize="small" />
              </IconButton>
            </div>
          </div>
        </Tooltip>
      ) : (
        <>
          <div
            className={`${s.chip} ${s[type]} ${
              type !== "wait" ? s.active : ""
            }`}
          >
            <span>
              {counter}. {formatName(info.classificationId)}
            </span>
            <div className={s.buttons}>
              <IconButton
                className={s.button}
                size="small"
                aria-label="download"
                onClick={() => onChange(counter - 1, "downloaded")}
              >
                <Download fontSize="small" />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </>
  );

  function formatName(classificationId) {
    if (!classifications?.length) return t("loading") + "...";

    return classifications.map(function ({ subClasses, name: parentName }) {
      return subClasses.map(function ({ id, name: subName }) {
        if (id === classificationId) {
          if (parentName !== subName) {
            return `${parentName} - ${subName}`;
          }
          return parentName;
        }
      });
    });
  }
}

FileItem.propTypes = {
  onChange: proptypes.func,
  counter: proptypes.number,
  type: fileCheckTypes(),
  info: attachedFilesType(),
  classifications: proptypes.arrayOf(classificationType()),
  status: proptypes.string,
};
