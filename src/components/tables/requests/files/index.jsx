import { Grid } from "@mui/material";
import SelectTable from "@components/tables/requests/files/table.jsx";
import Card from "@components/cards/cards";
import Title from "@components/title";
import useItemsUploader from "@hooks/items-uploader";
import { getClassifications } from "@modules/request/creators";
import proptypes from "prop-types";
import TableFilter from "./table-filter";
import { useTranslation } from "react-i18next";
import { requestType } from "@types/request.js";

export default function FileTable({
  selected,
  statuses,
  checkedList,
  setCheckList,
}) {
  const { t } = useTranslation();
  const [{ items: classifications }] = useItemsUploader(
    "request",
    "classifications",
    "classifications",
    getClassifications
  );
  return (
    <>
      <Card>
        <Grid container>
          <Grid item xs={12}>
            <Title size="small" text={t("userFiles")} />

            <TableFilter classifications={classifications} />
          </Grid>

          {selected && (
            <>
              <Grid item xs={12}>
                <SelectTable
                  classifications={classifications}
                  files={selected.request.attachedFiles}
                  selected={selected}
                  status={statuses[selected.request.requestStatus]}
                  checkedList={checkedList}
                  setCheckList={setCheckList}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Card>
    </>
  );
}

FileTable.propTypes = {
  selected: requestType(),
  statuses: proptypes.array,
  checkedList: proptypes.array,
  setCheckList: proptypes.func,
};
