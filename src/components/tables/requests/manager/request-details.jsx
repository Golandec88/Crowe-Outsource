import { Alert, Grid, TextField } from "@mui/material";
import { downloadFile as downloadFileAction } from "@modules/request/creators.ts";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import s from "./style.module.scss";
import proptypes from "prop-types";
import { classificationType, requestType } from "@types/request.js";
import downloadFile from "@utils/download-file.ts";
import { getInfoByPinfl as loadInfo } from "@modules/user/creators.ts";
import FileItem from "@components/tables/requests/files/file-item";
import { useDispatch } from "react-redux";

export default function RequestDetails({
  item,
  classifications,
  checkedList,
  setCheckList,
  status,
}) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [localCheckList, setLocalCheckList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadInfo(item.passportData.pinfl, ({ data }) => {
      setFullName(data.FullName);
    });
  }, [item]);

  function onChangeFile(index, value) {
    const result = Array.from(localCheckList);
    result[index] = value;

    setLocalCheckList(result);
    setCheckList([...checkedList, ...[item.request.attachedFiles[index]]]);

    if (value === "downloaded") {
      const id = item.request.attachedFiles[index].fileName;
      downloadFileAction(dispatch, id, downloadFile);
    }
  }

  return (
    <>
      <h2 className={s.title}>
        {t("requestInfo")} № <span>{item.request.id}</span>
      </h2>
      <Grid container sx={{ pb: 2, px: "10px" }}>
        <Grid item xs={4}>
          <div className={s.details}>
            {(function () {
              const {
                name,
                tin,
                address,
                director,
                headAccountant,
                phone,
                email,
                bank,
              } = item.request.companyInfo;
              const titles = [
                "organization",
                "tin",
                "address",
                "director",
                "chefAccountant",
                "phone",
                "email",
                "bank",
                "mfo",
                "check",
              ];

              return (
                <Formatter
                  values={[
                    name,
                    tin,
                    address,
                    director,
                    headAccountant,
                    phone,
                    email,
                    bank.name,
                    bank.mfo,
                    bank.account,
                  ]}
                  titles={titles}
                />
              );
            })()}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={s.details}>
            {(function () {
              const { passportData } = item;
              const titles = [
                "fullNameShort",
                "passportSerialNumber",
                "placeOfResidence",
                "givenDate",
                "expireDate",
                "pinfl",
                "givenPlace",
              ];

              return (
                <Formatter
                  values={[fullName].concat(Object.values(passportData))}
                  titles={titles}
                />
              );
            })()}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={s.details}>
            <h4 sx={{ mt: 0 }}>{t("userFiles")}</h4>
            {item.request.attachedFiles.map(
              ({ fileName, fileClassificationId }, index) => (
                <FileItem
                  type={localCheckList[index] ?? "wait"}
                  counter={index + 1}
                  key={`#file-item-${index}`}
                  classifications={classifications}
                  info={{
                    name: fileName,
                    classificationId: fileClassificationId,
                  }}
                  onChange={onChangeFile}
                  status={status}
                />
              )
            )}
            {localCheckList.filter(filterCheckItems).length !==
              item.request.attachedFiles.length &&
              status === "ManagerInProcess" && (
                <>
                  <Alert color="primary" severity="info" key="#files-alert">
                    {t("checkAllDocuments")}!
                  </Alert>
                </>
              )}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

RequestDetails.propTypes = {
  item: requestType(),
  classifications: proptypes.arrayOf(classificationType()),
  checkedList: proptypes.array,
  setCheckList: proptypes.func,
  status: proptypes.string,
};

RequestDetails.defaultProps = {
  checkedList: [],
  setCheckList: () => {},
};

export function Formatter({ values, titles }) {
  const { t } = useTranslation();

  return values.map((item, index) => {
    return render(titles[index], item, `#${titles[index]}-${index}`);
  });

  function render(label, value, key) {
    return (
      <TextField
        variant="outlined"
        key={key}
        id={key}
        label={t(label)}
        type="text"
        value={value || t("notFilled")}
        readOnly
        fullWidth
        sx={{ mb: 2 }}
      />
    );
  }
}

Formatter.propTypes = {
  values: proptypes.arrayOf(proptypes.string),
  titles: proptypes.arrayOf(proptypes.string),
};

function filterCheckItems(item) {
  return item !== "wait" && item !== "downloaded";
}
