import {
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
  Chip,
  Tooltip,
  Paper
} from "@mui/material";
import * as Icon from "@mui/icons-material";
import proptypes from "prop-types";
import { useTranslation } from "react-i18next";
import getRequestColor from "@utils/request-color";
import TableSkeleton from "@components/tables/skeleton";
import s from "@components/tables/requests/appeals/style.module.scss";

const columns = ["name" , "tin"];

export default function ClientsTable(loading, items,onChange,selected) {

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
          <TableBody className={s.body} component={Paper}>
            {loading ? <TableSkeleton cols={2}/> : items.map((item,index) =>
              (
                <TableRow
                  className={`${s["select-area"]} ${selected === item ? s["active"] : ""}`}
                  key={`table-tr-${index}`}
                  role="checkbox"
                  tabIndex={-1}
                  onClick={() => onChange(item)}
                  hover>
                  <TableCell>
                    {item}
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
