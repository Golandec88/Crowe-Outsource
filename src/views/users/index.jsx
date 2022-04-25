import s from "./style.module.scss";
import { Paper } from "@mui/material";
import CollapsibleTable from "@components/tables/operator";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests } from "@modules/request/creators";

export default function UsersPage() {
  const [requests] = useItemsUploader("request", "requests","requests", getRequests);

  return <>
    <Paper className={s.main}>
      <Paper className={s.paper}>
        <CollapsibleTable
          loading={requests.loading}
          items={requests.items}/>
      </Paper>
    </Paper>
  </>;
}
