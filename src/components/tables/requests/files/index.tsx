import { Grid } from "@mui/material";
import SelectTable from "@components/tables/requests/files/table.js";
import Card from "@components/cards/cards";
import Title from "@components/title";
import useItemsUploader from "@hooks/items-uploader";
import { getClassifications } from "@modules/request/creators";
import TableFilter from "./table-filter";
import { useTranslation } from "react-i18next";
import React from "react";
import { classificationsType, filesType, requestType } from "@store/types";
import { fileTableType } from "@components/tables/requests/files/types";

const FileTable: React.FC<fileTableType> = ({
  selected,
  statuses,
  checkedList,
  setCheckList,
}) => {
  const { t } = useTranslation();
  const [{ items: classifications }] = useItemsUploader<classificationsType[]>(
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
};

export default FileTable;
