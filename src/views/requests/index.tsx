import useScroller from "@hooks/scroller";

import s from "./style.module.scss";

import { Paper } from "@mui/material";
import BasicTabs from "@forms/requests/tabs";
import FileTable from "@components/tables/requests/files";
import RequestTable from "@components/tables/requests/appeals";
import Title from "@components/title";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses } from "@modules/request/creators";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReplyButtons from "@forms/requests/reply-buttons";
import { filesType, requestType } from "@store/types";
import { statusesType } from "@views/requests/types";

const RequestsPage: React.FC = () => {
  const { t } = useTranslation();
  const offset = useScroller(135);
  const [selected, setSelected] = useState({} as requestType);
  const [selectedID, setSelectedID] = useState<string>("");
  const [checkedList, setCheckList] = useState<filesType[]>([]);

  const [{ items: requests, loading }, dispatch] = useItemsUploader<
    requestType[],
    statusesType
  >("request", "requests", "requests", getRequests, { statuses: [0, 1, 2, 3] });
  const [{ items: statuses }] = useItemsUploader<number[]>(
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

  function submit(type: string, id: string) {
    if (type === "accept") setSelectedID(id);
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
          />
        )}
      </Paper>
    </>
  );
};

export default RequestsPage;
