import s from "./style.module.scss";
import { Paper } from "@mui/material";
import CollapsibleTable from "@components/tables/requests/manager";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses } from "@modules/request/creators";

export default function UsersPage() {
  const [{ items: requests, loading }] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    { statuses: [4, 5, 6, 7] }
  );
  const [{ items: statuses }] = useItemsUploader(
    "request",
    "statuses",
    false,
    getRequestStatuses
  );

  return <>
    <Paper className={s.main}>
      <Paper className={s.paper}>
        <CollapsibleTable
          loading={loading}
          items={requests}
          statuses={statuses}
        />
      </Paper>
    </Paper>
  </>;
}
