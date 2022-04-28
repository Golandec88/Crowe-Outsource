import { Alert, Grid, IconButton, Tooltip } from "@mui/material";
import { downloadFile as downloadFileAction } from "@modules/request/creators";
import { Check, Close, Download } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import s from "./style.module.scss";
import proptypes from "prop-types";
import {
  attachedFilesType,
  classificationType,
  fileCheckTypes,
  requestType
} from "@types/request";
import downloadFile from "@utils/download-file";
import ReplyButtons from "@forms/requests/reply-buttons";
import { getInfoByPinfl as loadInfo } from "@modules/user/creators";

export default function RequestDetails({ item, classifications }) {
  const { t } = useTranslation();

  const [checkedList, setCheckList] = useState([]);
  const [fullName, setFullName] = useState("");

  function onChangeFile(index, value) {
    const result = Array.from(checkedList);
    result[index] = value;

    setCheckList(result);

    if(value === "downloaded") {
      const id = item.request.attachedFiles[index].fileName;
      downloadFileAction(id, downloadFile);
    }
  }

  function getInfo(pinfl) {
    loadInfo(pinfl, ({ data }) => {
      setFullName(data.FullName);
    });
  }

  return <>
    <h2 className={s.title}>{t("requestInfo")} № <span>{item.request.id}</span></h2>
    <Grid container>
      <Grid item xs={4}>
        <div className={s.details}>
          {(function () {
            const { name, tin, address, director, headAccountant, phone, email, bank } = item.request.companyInfo;
            const titles = [
              "organization",
              "tin", "address",
              "director",
              "chefAccountant",
              "phone", "email",
              "bank", "mfo",
              "check"
            ];

            return <Formatter
              values={[
                name, tin, address,
                director, headAccountant,
                phone, email, bank.name,
                bank.mfo, bank.account
              ]}
              titles={titles}
            />;
          })()}
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          {(function () {
            const { passportData } = item;
            const titles = [
              "fullNameShort",
              "passportSerialAndNumber",
              "placeOfResidence",
              "givenDate", "expireDate",
              "pinfl", "givenPlace",
            ];

            getInfo(passportData.pinfl);

            return <Formatter
              values={[fullName].concat(Object.values(passportData))}
              titles={titles}
            />;
          })()}
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          <p>{t("userFiles")}</p>
          {item.request.attachedFiles.map(function ({ fileName, fileClassificationId }, index) {
            return <FileItem
              type={checkedList[index] ?? "wait"}
              counter={index + 1}
              key={`#file-item-${index}`}
              classifications={classifications}
              info={{ name: fileName, classificationId: fileClassificationId }}
              activeList={checkedList}
              onChange={onChangeFile}
            />;
          })}
          {checkedList.filter(filterCheckItems).length !== item.request.attachedFiles.length && <>
            <Alert
              color="primary"
              severity="info"
              key="#files-alert"
            >
              {t("checkAllDocuments")}!
            </Alert>
          </>}
        </div>
      </Grid>
      <Grid className={s["reply-buttons"]} item xs={12}>
        <ReplyButtons id={item.request.id} staffType="manager" />
      </Grid>
    </Grid>
  </>;
}

RequestDetails.propTypes = {
  item: requestType(),
  classifications: proptypes.arrayOf(classificationType())
};

function Formatter({ values, titles }) {
  const { t } = useTranslation();

  return values.map((item, index) => {
    return render(titles[index], item, `#${titles[index]}-${index}`);
  });

  function render(title, field, key) {
    return <p key={key}>
      {t(title)}: <b>{field ? field : t("notFilled")}</b>
    </p>;
  }
}

Formatter.propTypes = {
  values: proptypes.arrayOf(proptypes.string),
  titles: proptypes.arrayOf(proptypes.string)
};

function FileItem(props) {
  const { type, counter, classifications, info, onChange } = props;
  const { t } = useTranslation();

  return <>
    <Tooltip placement="left" title={t("fileCheckStatuses." + type)}>
      <div className={`${s.chip} ${s[type]} ${type !== "wait" ? s.active : ""}`}>
        <span>{counter}. {formatName(info.classificationId)}</span>
        <div className={s.buttons}>
          <IconButton
            className={s.button}
            size="small"
            aria-label="download"
            onClick={() => onChange(counter - 1, "downloaded")}
          >
            <Download fontSize="small"/>
          </IconButton>
          <IconButton
            className={s.button}
            size="small"
            aria-label="error"
            onClick={() => onChange(counter - 1, "error")}
          >
            <Close fontSize="small"/>
          </IconButton>
          <IconButton
            className={s.button}
            size="small"
            aria-label="success"
            onClick={() => onChange(counter - 1, "success")}
          >
            <Check fontSize="small"/>
          </IconButton>
        </div>
      </div>
    </Tooltip>
  </>;

  function formatName(classificationId) {
    if(!classifications?.length) return t("loading") + "...";

    return classifications.map(function ({ subClasses, name: parentName }) {
      return subClasses.map(function ({ id, name: subName }) {
        if(id === classificationId) {
          if(parentName !== subName) {
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
  classifications: proptypes.arrayOf(classificationType())
};

function filterCheckItems(item) {
  return item !== "wait" && item !== "downloaded";
}
