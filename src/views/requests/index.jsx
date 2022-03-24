import { Paper } from "@mui/material";
import BasicTabs from "@components/forms/requests/tabs";
import FileTable from "@components/tables/requests/files";
import RequestTable from "@components/tables/requests/appeals";
import Title from "@components/title";
import s from "./style.module.scss";
import useScroller from "@hooks/scroller";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests } from "@modules/request/creators";
import { useState } from "react";

export default function RequestsPage() {
  const offset = useScroller(135);
  const [requests] = useItemsUploader("request", "requests", getRequests);
  const [selected, setSelected] = useState();

  return <>
    <Title text="Заявки"/>
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
  </>;
}
