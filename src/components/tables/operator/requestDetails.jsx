import { useEffect, useState } from "react";
import proptypes from "prop-types";
import s from "./style.module.scss";
import { Alert, Chip, Grid, IconButton, Link, Tooltip } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import useItemsUploader from "@hooks/items-uploader";
import { downloadFile, getInfoByPinfl, getAllClassifications } from "@modules/manager/creators";
import Dialogs from "@components/dialog";


export default function RequestDetails({ row }) {
  const [classifications] = useItemsUploader("manager", "classifications", "classifications", getAllClassifications);
  const [checkedList, setCheckedList] = useState([]);
  const [userPassportDetails, setUserPassportDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [buttonType] = useState(true);
  const [, setConfirmation] = useState(false);


  const handleClose = () => setOpen(false);
  const confirm = () => {
    setConfirmation(true);
    handleClose();
  };
  const decline = () => {
    setConfirmation(false);
    handleClose();
  };

  function formatFilesForm() {
    return row?.request.attachedFiles.map((item) => {
      return {
        ...classifications.items.find(o => o.id === item.fileClassificationId),
        ...item
      };
    });
  }

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

  const handleUserInfoByPinfl = (pinfl) => {
    if (pinfl) {
      getInfoByPinfl(pinfl).then((res) => {
        setUserPassportDetails(res.data);
      });
    }
  };

  useEffect(() => {
    if (row.passportData.pinfl) {
      handleUserInfoByPinfl(row.passportData.pinfl);
    }
  }, [row.passportData.pinfl]);

  useEffect(() => {
    setCheckedList(formatFilesForm());

  }, [classifications.items]);

  const handleUpdate = (status, index) => {
    const newTodos = [...checkedList];
    newTodos[index].docStatus = status;
    setCheckedList(newTodos);
  };

  return <>
    <Grid container>
      <Grid item xs={12} className={s.title} textAlign={"center"}>
        Информация о заявке № <span>{row?.request.id}</span>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          <p>Организации
            : <span>{row?.request.companyInfo.name ? row.request.companyInfo.name : "Не заполненно"}</span>
          </p>
          <p>ИНН : <span>{row?.request.companyInfo.tin ? row.request.companyInfo.tin : "Не заполненно"}</span></p>
          <p>Адресс
            : <span>{row?.request.companyInfo.address ? row.request.companyInfo.address : "Не заполненно"}</span></p>
          <p>Директор
            : <span>{row?.request.companyInfo.director ? row.request.companyInfo.director : "Не заполненно"}</span>
          </p>
          <p>Главный бухгалтер
            : <span>{row?.request.companyInfo.headAccountant ? row.request.companyInfo.headAccountant : "Не заполненно"}</span>
          </p>
          <p>Телефон : <span>{row?.request.companyInfo.phone ? row.request.companyInfo.phone : "Не заполненно"}</span>
          </p>
          <p>Электронная почта
            : <span>{row?.request.companyInfo.email ? row.request.companyInfo.email : "Не заполненно"}</span>
          </p>
          <br/>
          <p>Банк
            : <span>{row?.request.companyInfo.bank.name ? row.request.companyInfo.bank.name : "Не заполненно"}</span>
          </p>
          <p>ОКЭД
            : <span>{row?.request.companyInfo.bank.mfo ? row.request.companyInfo.bank.mfo : "Не заполненно"}</span>
          </p>
          <p>Счёт
            : <span>{row?.request.companyInfo.bank.account ? row.request.companyInfo.bank.account : "Не заполненно"}</span>
          </p>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          <p>Ф.И.О
            : <span>{userPassportDetails?.FullName ? userPassportDetails.FullName : "Не заполненно"}</span>
          </p>
          <p>Серия и номер пасспорта
            : <span>{row?.passportData.serialAndNumber ? row.passportData.serialAndNumber : "Не заполненно"}</span>
          </p>
          <p>Пинфл : <span>{row?.passportData.pinfl ? row.passportData.pinfl : "Не заполненно"}</span></p>
          <p>Адресс прописки
            : <span>{row?.passportData.registration ? row.passportData.registration : "Не заполненно"}</span>
          </p>
          <p>Выдано : <span>{row?.passportData.givenPlace ? row.passportData.givenPlace : "Не заполненно"}</span></p>
          <p>Дата выдачи
            : <span>{row?.passportData.givenDate ? row.passportData.givenDate.substring(0, 10) : "Не заполненно"}</span>
          </p>
          <p>Дата окончания
            : <span>{row?.passportData.expireDate ? row.passportData.expireDate.substring(0, 10) : "Не заполненно"}</span>
          </p>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.details}>
          <p>
            <span>Файлы заявки</span>
          </p>
          {checkedList?.map((item, index) => {
            return <div className={s.justify} key={item.fileClassificationId + "___" + index}>
              <div>
                {item.docStatus !== undefined ? <Tooltip title={item.docStatus === true ? "Принято" : "Отклонено"}>
                  <Chip size="small" variant={"filled"} style={{ marginRight: "10px", height: "16px" }}
                    color={item.docStatus === true ? "success" : "error"}/>
                </Tooltip> : <div/>
                }
                <Link style={{ cursor: "pointer" }}
                  onClick={() => handleDownloadFile(item.fileName)}>
                  <span>{index + 1 + " "}</span> : {item.class}&nbsp;({item.subClass})
                </Link>
              </div>
              <div>
                <IconButton onClick={() => {
                  handleUpdate(false, index);
                }}
                size="small"
                aria-label="decline" color="error">
                  <Close fontSize="small"/>
                </IconButton>
                <IconButton onClick={() => {
                  handleUpdate(true, index);
                }}
                size="small" aria-label="accept" color="success">
                  <Check fontSize="small"/>
                </IconButton>
              </div>
            </div>;
          })}
          {checkedList.every(item => item.docStatus !== undefined) ? " " :
            <Alert color={"primary"} style={{ marginTop: "20px" }} severity="info">Проверьте все документы!</Alert>
          }
        </div>
      </Grid>
      <Grid item xs={12} margin={2}>
        <Dialogs dialog={open}
          closeDialog={handleClose}
          type={buttonType}
          confirm={confirm}
          decline={decline}/>
      </Grid>
    </Grid>
  </>;

}

RequestDetails.propTypes = {
  row: proptypes.object,
};









