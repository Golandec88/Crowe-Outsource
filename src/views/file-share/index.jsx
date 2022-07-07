import Title from "@components/title";
import s from "@views/manager-requests/style.module.scss";
import { Grid, TextField } from "@mui/material";
import useItemsUploader from "@hooks/items-uploader";
import { getRequests, getRequestStatuses } from "@modules/request/creators";
import { Autocomplete } from "@mui/material";
import ClientsTable from "@components/tables/file-share/clientsTable";
import useScroller from "@hooks/scroller";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


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
  const [filtered, setFiltered] = useState();
  const [selected, setSelected] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [{ items: statuses }] = useItemsUploader(
    "request",
    "statuses",
    "statuses",
    getRequestStatuses
  );
  const offset = useScroller(135);

  useEffect(() => {
    requests.forEach((el) => {
      clientTin.push(el.request.companyInfo.tin);
    });
    filteredReq();
  }, [clientTin, filtered]);


  const selectClientHandler = (newValue) => {
    setSelectedClient(newValue);
    setClientTin([]);
    setFiltered(newValue);
  };

  const filteredReq = () => {
    let newArr = [];
    requests.forEach((el) => {
      el.request.companyInfo.tin === filtered ? newArr.push(el) : el;
    });
    setFilteredRequests(newArr);
  };

  return <>
    <Title text={t("File-Share")}/>
    <Grid id="container"
      className={`${s.container} ${offset > 135 ? s.fixed : ""}`}
      container item xs={12}>
      <Grid item xs={12}>
        <Autocomplete
          value={filtered}
          disablePortal
          options={clientTin}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={t("tin")}/>}
          onChange={(event, newValue) => selectClientHandler(newValue)}
          noOptionsText={t("No-Options")}
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
          filtered={filtered}
          filteredRequests={filteredRequests}
        />
      </Grid>
    </Grid>
  </>;

}
