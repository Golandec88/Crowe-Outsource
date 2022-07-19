import React from "react";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";

import { Check, Close, Download } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { fileItemType } from "@components/tables/requests/files/types";

const FileItem: React.FC<fileItemType> = ({
  type,
  counter,
  classifications,
  info,
  onChange,
  status,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {status === 1 ? (
        <Tooltip placement="left" title={t("fileCheckStatuses." + type)}>
          <div
            className={`${s.chip} ${s[type]} ${
              type !== "wait" ? s.active : ""
            }`}
          >
            <span>
              {counter}. {formatName(info?.fileClassificationId!)}
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
              {counter}. {formatName(info?.fileClassificationId!)}
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

  function formatName(fileClassificationId: string) {
    if (!classifications?.length) return t("loading") + "...";

    return classifications.map(function ({ subClasses, name: parentName }) {
      return subClasses.map(function ({ id, name: subName }) {
        if (id === fileClassificationId) {
          if (parentName !== subName) {
            return `${parentName} - ${subName}`;
          }
          return parentName;
        }
      });
    });
  }
};

export default FileItem;
