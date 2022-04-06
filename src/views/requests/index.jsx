import { Paper } from "@mui/material";
import BasicTabs from "@components/forms/requests/tabs";
import FileTable from "@components/tables/requests/files";
import SubmitButtons from "@components/buttons/submit";
import RequestTable from "@components/tables/requests/appeals";
import Title from "@components/title";
import s from "./style.module.scss";
import useScroller from "@hooks/scroller";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests } from "@modules/request/creators";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Dialogs from "@components/dialog";

export default function RequestsPage() {
  const offset = useScroller(135);
  const [requests] = useItemsUploader("request", "requests", getRequests);
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);
  const [buttonType, setButtonType] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const { t } = useTranslation();

  const handleAccept = () => {
    setButtonType(false);
    setOpen(true);
  };
  const handleDecline = () => {
    setButtonType(true);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const confirm = (comment) => {
    setConfirmation(true);
    handleClose();
  };
  const decline = (comment) => {
    setConfirmation(false);
    handleClose();
  };

  return <>
    <Title text={t("requests")}/>
    <Dialogs dialog={open}
      closeDialog={handleClose}
      confirm={confirm}
      decline={decline}/>
    <Paper className={s.main}>
      <Paper className={s.paper}>
        <RequestTable
          offset={offset}
          items={requests.items}
          loading={requests.loading}
          onChange={setSelected}
          selected={selected}
        />
      </Paper>
      <Paper className={s.paper}>
        <BasicTabs offset={offset} selected={selected}/>
      </Paper>
      <Paper className={s.paper}>
        <FileTable offset={offset} selected={selected}/>
      </Paper>
    </Paper>
    <Paper className={s.main}>
      <SubmitButtons size={"small"} accept={handleAccept} decline={handleDecline}/>
      <Dialogs dialog={open}
        closeDialog={handleClose}
        type={buttonType}
        confirm={confirm}
        decline={decline}/>
    </Paper>
  </>;
}
