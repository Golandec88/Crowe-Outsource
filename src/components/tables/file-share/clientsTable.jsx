import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import proptypes from "prop-types";
import s from "@components/tables/requests/appeals/style.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export default function ClientsTable(props) {
  const { items, loading, statuses, onChange, selected, selectedClient, filtered, filteredRequests } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleChange(id) {
    navigate("/client-info/" + id, { state: id });
  }


  return <>
    {
      <Box className={s["overflow-content"]}>
        <Table className={s.table}>
          <TableHead className={s.head}>
            <TableRow>
              <TableCell style={{ width:"50%" }}>
                {t("companyName")}
              </TableCell>
              <TableCell style={{ width:"50%" }}>
                {t("tin")}
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody className={s.body}>
            {filteredRequests?.length && filteredRequests ?
              filteredRequests.map((item, index) =>
                (
                  <TableRow
                    className={`${s["select-area"]} ${selected === item ? s["active"] : ""}`}
                    key={`table-tr-${index}`}
                    role="checkbox"
                    tabIndex={-1}
                    onClick={() => handleChange(item.request.id)}
                    hover>
                    <TableCell style={{ textAlign:"left" }}>
                      {item.request.companyInfo.name}
                    </TableCell>
                    <TableCell style={{ textAlign:"center" }}>
                      {item.request.companyInfo.tin}
                    </TableCell>
                  </TableRow>
                )
              )
              : items.map((item, index) =>
                (
                  <TableRow
                    className={`${s["select-area"]} ${selected === item ? s["active"] : ""}`}
                    key={`table-tr-${index}`}
                    role="checkbox"
                    tabIndex={-1}
                    onClick={() => handleChange(item.request.id)}
                    hover>
                    <TableCell style={{ textAlign:"left" }}>
                      {item.request.companyInfo.name}
                    </TableCell>
                    <TableCell style={{ textAlign:"center" }}>
                      {item.request.companyInfo.tin}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </Box>
    }
  </>;
}


ClientsTable.propTypes = {
  offset: proptypes.number,
  items: proptypes.array,
  loading: proptypes.bool,
  onChange: proptypes.func,
  selected: proptypes.object,
  statuses: proptypes.array,
  selectedClient: proptypes.string,
  filtered: proptypes.string,
  filteredRequests: proptypes.array
};

ClientsTable.defaultProps = {
  onChange: () => {
  },
  loading: false,
  items: [],
  statuses: [],

};
