import Title from "@components/title";
import { useTranslation } from "react-i18next";
import s from "@views/manager-requests/style.module.scss";
import { Grid, InputAdornment, Paper, TextField } from "@mui/material";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses } from "@modules/request/creators";
import RequestsTable from "@components/tables/requests/appeals";
import { Autocomplete } from "@mui/lab";
import * as Icon from "@mui/icons-material";
import ClientsTable from "@components/tables/file-share/clientsTable";
import useScroller from "@hooks/scroller";
import { useState } from "react";

export default function FileShare() {
  const { t } = useTranslation();
  const [{ items: requests, loading }] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    { statuses: [4] }
  );
  const [{ items: statuses }] = useItemsUploader(
    "request",
    "statuses",
    false,
    getRequestStatuses
  );
  const offset = useScroller(135);
  const [selected, setSelected] = useState();


  return <>
    <Title text={t("fileShare")}/>
    <Grid id="container" className={`${s.container} ${offset > 135 ? s.fixed : ""}`} container xs={12}>
      <Grid xs={12}>
        <TextField
          className={s["text-field"]}
          label={t("search") + "..."}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon.Search/>
              </InputAdornment>
            ),
          }}/>
      </Grid>
      <Grid className={s.table} item xs={12}>
        <ClientsTable
          loading = {loading}
          items={requests}
          statuses={statuses}
          selected={selected}
          onChange = {setSelected}
        />
      </Grid>
    </Grid>
  </>;
}
