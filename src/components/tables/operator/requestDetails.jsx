import proptypes from "prop-types";
import s from "./style.module.scss";
import SubmitButtons from "@components/buttons/submit";
import { Grid, Link } from "@mui/material";
import useItemsUploader from "@hooks/items-uploader";
import { getAllClassifications } from "@modules/manager/creators";

export default function RequestDetails({ row }) {
  const [classifications] = useItemsUploader("manager", "allClassifications", getAllClassifications);
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
        <p><span>Файлы заявки</span></p>
        <div className={s.details}>
          {row?.request.attachedFiles.map((item, index) => {
            const info = classifications.items.find(o => o.id === item.fileClassificationId);
            return <Link key={index} style={{ cursor: "pointer" }} onClick={event => console.log(event)}>
              <p>
                <span>{index + 1 + " "}</span> : {info?.class}&nbsp;({info?.subClass})
              </p>
            </Link>;
          })
          }
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

