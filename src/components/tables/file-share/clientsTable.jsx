import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import proptypes from "prop-types";
import TableSkeleton from "@components/tables/skeleton";
import s from "@components/tables/requests/appeals/style.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";




export default function ClientsTable(props) {
  const { items,loading,statuses,onChange,selected,selectedClient }= props;

  const { t } = useTranslation();
  const columns = ["name" , "tin"];
  const navigate = useNavigate();
  function handleChange (id) {
    navigate("/client-info/" + id, { state: id });
  }
  return <>
    {
      <Box className={s["overflow-content"]}>
        <Table className={s.table}>
          <TableHead className={s.head}>
            <TableRow>
              {columns.map((column,index) =>
                <TableCell key={index}>
                  {column}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody className={s.body}>
            {loading ? <TableSkeleton cols={2} limit={4}/> : items.map((item,index) =>
              (
                <TableRow
                  className={`${s["select-area"]} ${selected === item ? s["active"] : ""}`}
                  key={`table-tr-${index}`}
                  role="checkbox"
                  tabIndex={-1}
                  onClick={()=> handleChange(item.request.id)}
                  hover>
                  <TableCell style={{ textAlign:"center" }}>
                    {item.request.companyInfo.name}
                  </TableCell>
                  <TableCell style={{ textAlign:"center" }}>
                    {item.request.companyInfo.tin}
                  </TableCell>
                </TableRow>
              )
            )  }
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
  selectedClient: proptypes.string
};

ClientsTable.defaultProps = {
  onChange: () => {},
  loading: false,
  items: [],
  statuses: [],

};