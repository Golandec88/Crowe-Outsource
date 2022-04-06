import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import s from "./style.module.scss";
import proptypes from "prop-types";
import { Chip, Skeleton, Tooltip } from "@mui/material";
import RequestDetails from "./requestDetails";


function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell component="th">
          <Tooltip title={(row?.request.requestStatus === 1 ? "Подтверждено" : "Отклонено")}>
            <Chip size="small" variant={"filled"} style={{ marginRight: "10px", height: "16px" }}
              color={(row?.request.requestStatus === 1 ? "success" : "error")}/>
          </Tooltip>
          {row?.request.companyInfo.name}
        </TableCell>
        <TableCell>{row?.request.companyInfo.tin}</TableCell>
        <TableCell>{row?.request.sendDate.substring(0, 10)}</TableCell>
        <TableCell>{row?.request.responseCallCenterOperatorId}</TableCell>
        <TableCell/>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} className={s.accardion}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={s.history}>
              <RequestDetails row={row}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );


}

export default function CollapsibleTable({ items, loading }) {
  return (
    <TableContainer elevation={0} component={Paper}>
      <Table className={s.table} aria-label="collapsible table">
        <TableHead className={s.head}>
          <TableRow>
            <TableCell/>
            <TableCell>Название организации</TableCell>
            <TableCell>ИНН</TableCell>
            <TableCell>Дата заявки</TableCell>
            <TableCell>Оператор Колл-Центра</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {loading
            ? <>
              <TableRow>
                <TableCell key={"table-skeleton-"}>
                  <Skeleton className={s.skeleton}/>
                </TableCell>
              </TableRow>
            </>
            : items.map((item, index) => (<Row key={item.name + index} row={item}/>))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  loading: proptypes.bool,
  items: proptypes.array,
};
