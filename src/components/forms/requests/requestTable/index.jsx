import React from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import styles from "./style.module.scss";
import * as Icon from "@mui/icons-material";


const columns = [
  { id: "tin", label: "ИНН" },
  { id: "status", label: "Статус" },
  { id: "notification", label: "" }
];

function createData(tin, status) {
  return { tin, status };
}

const rows = [
  createData("300123123", 6, 1),
  createData("300123123", 1, 2),
  createData("300123123", 2, 3),
  createData("300123123", 3, 4),
  createData("300123123", 4, 5),
  createData("300123123", 5, 6),
  createData("300123123", 3, 1),
  createData("300123123", 6, 1),
  createData("300123123", 1, 2),
  createData("300123123", 2, 3),
  createData("300123123", 3, 4),
  createData("300123123", 4, 5),
  createData("300123123", 5, 6),
  createData("300123123", 3, 1),
  createData("300123123", 6, 1),
  createData("300123123", 1, 2),
  createData("300123123", 2, 3),
  createData("300123123", 3, 4),
  createData("300123123", 4, 5),
  createData("300123123", 5, 6),
  createData("300123123", 3, 1),
];


const requestsTable = () => {
  return (<>
    <Grid container>
      <Grid item xs={12}>
        <TextField
          className={styles.textField}
          label="Поиск"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon.Search/>
              </InputAdornment>
            ),
          }}/>
      </Grid>
      <Grid className={styles.table} item xs={12}>
        <Table className={styles.tableContent}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`table-th-${index}`}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>
                <Icon.Notifications sx={{ color: "white" }}/>
              </TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {rows.map((row, index) => (
              <TableRow
                key={`table-tr-${index}`}
                role="checkbox"
                tabIndex={-1}
                hover
              >{columns.map((column, subIndex) => (
                  <TableCell key={`table-td-${subIndex}`}>
                    {row[column.id]}
                  </TableCell>
                ))}
                <TableCell>

                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Icon.Phone color="primary"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  </>
  );
};

export default requestsTable;