import { useTranslation } from "react-i18next";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses } from "@modules/request/creators.ts";
import Title from "@components/title";
import { Paper } from "@mui/material";
import s from "@views/manager-requests/style.module.scss";
import CollapsibleTable from "@components/tables/requests/manager";

export default function DashboardPage() {
  const { t } = useTranslation();
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

  return (
    <>
      <Title text={t("requestsToManager")} />
      <Paper className={s.main}>
        <Paper className={s.paper}>
          <CollapsibleTable
            loading={loading}
            items={requests}
            statuses={statuses}
          />
        </Paper>
      </Paper>
    </>
  );
}
