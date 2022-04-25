import { Paper } from "@mui/material";
import BasicTabs from "@components/forms/requests/tabs";
import FileTable from "@components/tables/requests/files";
import RequestTable from "@components/tables/requests/appeals";
import Title from "@components/title";
import s from "./style.module.scss";
import useScroller from "@hooks/scroller";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses, replyOfRequest } from "@modules/request/creators";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Dialogs from "@components/dialog";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setMessage } from "@modules/global/creators";

export default function RequestsPage() {
  const { t } = useTranslation();
  const offset = useScroller(135);
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);
  const [modelType, setModelType] = useState(null);
  const [requests] = useItemsUploader("request", "requests", "requests", getRequests, {
    statuses: [0, 1, 2, 3]
  });
  const [{ items: statuses }] = useItemsUploader("request", "statuses", "", getRequestStatuses);
  const dispatch = useDispatch();

  const openDialog = (type) => {
    setModelType(type);
    setOpen(true);
  };

  const confirmDialog = comment => {
    replyOfRequest(dispatch, {
      id: selected?.request.id,
      userType: "call-center",
      responseType: modelType,
      comment,
    }, () => {
      setMessage(dispatch, t("success") + "!");
      setOpen(false);
      setModelType(null);
    });
  };

  const closeDialog = () => {
    setOpen(false);
    setModelType(null);
  };

  return <>
    <Title text={t("requests")}/>
    <Paper className={s.main}>
      <Paper className={`${s.paper} ${s.paper__transparent}`}>
        <RequestTable
          offset={offset}
          items={requests.items}
          loading={requests.loading}
          onChange={setSelected}
          selected={selected}
          statuses={statuses}
        />
      </Paper>
      <Paper className={s.paper}>
        <BasicTabs offset={offset} selected={selected}/>
      </Paper>
      <Paper className={s.paper}>
        <FileTable offset={offset} selected={selected}/>
      </Paper>
    </Paper>
    <Paper className={`${s.main} ${s.buttons}`}>
      <Button
        variant="contained"
        color="error"
        disableElevation
        disabled={!selected}
        onClick={() => openDialog("decline")}
      >
        {t("declineRequest")}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        disabled={!selected}
        onClick={() => openDialog("resend")}
      >
        {t("resendRequest")}
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        disabled={!selected}
        onClick={() => openDialog("accept")}
      >
        {t("acceptRequest")}
      </Button>
    </Paper>
    <Dialogs
      model={open}
      setModel={setOpen}
      type={modelType}
      confirm={confirmDialog}
      close={closeDialog}
    />
  </>;
}
