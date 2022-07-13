import { Paper } from "@mui/material";
import BasicTabs from "@components/forms/requests/tabs";
import FileTable from "@components/tables/requests/files";
import RequestTable from "@components/tables/requests/appeals";
import Title from "@components/title";
import s from "./style.module.scss";
import useScroller from "@hooks/scroller";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses } from "@modules/request/creators";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReplyButtons from "@forms/requests/reply-buttons";

export default function RequestsPage() {
  const { t } = useTranslation();
  const offset = useScroller(135);
  const [selected, setSelected] = useState();
  const [checkedList, setCheckList] = useState([]);
  //TODO Ругается на типы хука useItemsUploader
  const [{ items: requests, loading }, dispatch] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    {
      statuses: [0, 1, 2, 3],
    }
  );
  const [{ items: statuses }] = useItemsUploader(
    "request",
    "statuses",
    "",
    getRequestStatuses
  );

  useEffect(() => {
    const interval = setInterval(dispatch, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  function submit(type, id) {
    if (type === "accept") {
      setAttachModel(true);
      setSelected(id);
    }
  }

  return (
    <>
      <Title text={t("requests")} />
      <Paper className={s.main}>
        <Paper className={`${s.paper} ${s.transparent}`}>
          <RequestTable
            offset={offset}
            items={requests}
            loading={loading}
            onChange={setSelected}
            selected={selected}
            statuses={statuses}
          />
        </Paper>
        <Paper className={s.paper}>
          <BasicTabs offset={offset} selected={selected} />
        </Paper>
        <Paper className={s.paper}>
          <FileTable
            selected={selected}
            statuses={statuses}
            checkedList={checkedList}
            setCheckList={setCheckList}
          />
        </Paper>
      </Paper>
      <Paper className={`${s.main} ${s.buttons}`}>
        {selected && selected.request.requestStatus === 1 && (
          <ReplyButtons
            id={selected.request.id}
            staffType="call-center"
            checkedList={checkedList}
            onChange={submit}
            type="request"
          />
        )}
      </Paper>
    </>
  );
}
