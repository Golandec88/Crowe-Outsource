import Title from "@components/title";
import { useTranslation } from "react-i18next";
import s from "@views/manager-requests/style.module.scss";
import { Grid, TextField } from "@mui/material";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses } from "@modules/request/creators";
import { Autocomplete } from "@mui/material";
import ClientsTable from "@components/tables/file-share/clientsTable";
import useScroller from "@hooks/scroller";
import { useEffect, useState } from "react";

export default function FileShare() {
  const { t } = useTranslation();
  const [{ items: requests, loading: loading }] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    { statuses: [4] }
  );
  const [clientTin, setClientTin] = useState([]);
  const [{ items: statuses }] = useItemsUploader(
    "request",
    "statuses",
    "statuses",
    getRequestStatuses
  );
  const offset = useScroller(135);
  const [selected, setSelected] = useState();
  const [selectedClient, setSelectedClient] = useState();

  useEffect(() => {
    requests.forEach((el) => {
      clientTin.push(el.request.companyInfo.tin);
    });
  }, [clientTin]);

  const selectClientHandler = (newValue) => {
    setSelectedClient(newValue);
    setClientTin([]);
  };

  return (
    <>
      <Title text={t("fileShare")} />
      <Grid
        id="container"
        className={`${s.container} ${offset > 135 ? s.fixed : ""}`}
        container
        item
        xs={12}
      >
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            options={clientTin}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Tin" />}
            onChange={(event, newValue) => selectClientHandler(newValue)}
          />
        </Grid>
        <Grid className={s.table} item xs={12}>
          <ClientsTable
            items={requests}
            statuses={statuses}
            selected={selected}
            onChange={setSelected}
            loading={loading}
            selectedClient={selectedClient}
          />
        </Grid>
      </Grid>
    </>
  );
}
