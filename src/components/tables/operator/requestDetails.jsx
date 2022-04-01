import * as React from "react";
import { useState } from "react";
import s from "./style.module.scss";
import proptypes from "prop-types";
import SubmitButtons from "@components/buttons/submit";
import { Alert, Grid, Link, IconButton, Chip, Tooltip } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import useItemsUploader from "@hooks/items-uploader";
import { getAllClassifications } from "@modules/manager/creators";
import { downloadFile } from "@modules/manager/creators";


export default function RequestDetails({ row }) {
  const [classifications] = useItemsUploader("manager", "allClassifications", getAllClassifications);
  const [declinedDocs, setDeclinedDocs] = useState([]);

  const handleDownloadFile = (fileId) => {
    if (fileId) {
      downloadFile(fileId).then((res) => {
        if (typeof res.data === "string") {
          const blob = new Blob([res.data], { type: res.headers["content-type"] });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = name;
          document.body.appendChild(link);
          link.click();
        }
      });
    }
  };


  const handleDeclineDoc = (event, file) => {
    if (declinedDocs.some(item => item.fileName === file.fileName)) {
      return "already here";
    } else setDeclinedDocs([...declinedDocs, file]);
  };
  const handleAcceptDoc = (event, file) => {
    const newList = declinedDocs.filter((item) => item.fileName !== file.fileName);
    setDeclinedDocs(newList);
  };

  return <>
    <Grid container>
      <Grid item xs={12} className={s.title} textAlign={"center"}>
        Информация о заявке № <span>{row?.request.id}</span>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          <p>Организации : <span>{row?.request.companyInfo.name}</span></p>
          <p>ИНН : <span>{row?.request.companyInfo.tin}</span></p>
          <p>Адресс : <span>{row?.request.companyInfo.address}</span></p>
          <p>Директор : <span>{row?.request.companyInfo.director}</span></p>
          <p>Главный бухгалтер : <span>{row?.request.companyInfo.headAccountant}</span></p>
          <p>Телефон : <span>{row?.request.companyInfo.phone}</span></p>
          <p>Электронная почта : <span>{row?.request.companyInfo.email}</span></p>
          <br/>
          <p>Банк : <span>{row?.request.companyInfo.bank.name}</span></p>
          <p>ОКЭД : <span>{row?.request.companyInfo.bank.mfo}</span></p>
          <p>Счёт : <span>{row?.request.companyInfo.bank.account}</span></p>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          <p>Ф.И.О : <span>{row?.passportData.serialAndNumber}</span></p>
          <p>Серия и номер пасспорта : <span>{row?.passportData.serialAndNumber}</span></p>
          <p>Пинфл : <span>{row?.passportData.pinfl}</span></p>
          <p>Адресс прописки : <span>{row?.passportData.registration}</span></p>
          <p>Выдано : <span>{row?.passportData.givenPlace}</span></p>
          <p>Дата выдачи : <span>{row?.passportData.givenDate}</span></p>
          <p>Дата окончания : <span>{row?.passportData.expireDate}</span></p>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          <Alert color={"primary"} severity="info">Проверьте все документы!</Alert>
          <p>
            <span>Файлы заявки</span>
          </p>
          {row?.request.attachedFiles.map((item, index) => {
            const info = classifications.items.find(o => o.id === item.fileClassificationId);
            return <div className={s.justify} key={item.fileClassificationId + "___" + index}>
              <div>
                <Tooltip title={"Статус"}>
                  <Chip size="small" variant={"filled"} style={{ marginRight: "10px", height: "16px" }}
                    color={"success"}/>
                </Tooltip>
                <Link style={{ cursor: "pointer" }}
                  onClick={() => handleDownloadFile(item.fileName)}>
                  <span>{index + 1 + " "}</span> : {info?.class}&nbsp;({info?.subClass})
                </Link>
              </div>
              <div>
                <IconButton onClick={event => handleDeclineDoc(event, { ...info, ...item })}
                  size="small"
                  aria-label="decline" color="error">
                  <Close fontSize="small"/>
                </IconButton>
                <IconButton onClick={event => handleAcceptDoc(event, { ...info, ...item })}
                  size="small" aria-label="accept" color="success">
                  <Check fontSize="small"/>
                </IconButton>
              </div>
            </div>;
          })}
        </div>
      </Grid>
      <Grid item xs={12} margin={2}>
        <SubmitButtons size={"small"}/>
      </Grid>
    </Grid>
  </>;
}

RequestDetails.propTypes = {
  row: proptypes.object,

};


