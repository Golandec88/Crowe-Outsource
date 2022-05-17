import { Grid } from "@mui/material";
import SelectTable from "@components/tables/requests/files/table.jsx";
import Card from "@components/card";
import Title from "@components/title";
import useItemsUploader from "@hooks/items-uploader";
import { getClassifications } from "@modules/request/creators";
import proptypes from "prop-types";
import TableFilter from "./table-filter";
import { useTranslation } from "react-i18next";

export default function FileTable({ selected }) {
  const { t } = useTranslation();
  const [{ items: classifications }] = useItemsUploader("request", "classifications", "classifications", getClassifications);
  return <>
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <Title size="small" text={t("userFiles")}/>

          <TableFilter classifications={classifications}/>
        </Grid>

        {selected && <>
          <Grid item xs={12}>
            <SelectTable
              classifications={classifications}
              files={selected.request.attachedFiles}
            />
          </Grid>
        </>}
      </Grid>
    </Card>
  </>;
}

FileTable.propTypes = {
  selected: proptypes.object
};

