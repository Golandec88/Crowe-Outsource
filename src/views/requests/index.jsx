import * as Icon from "@mui/icons-material";
import { IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import s from "./style.module.scss";

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

const RequestsPage = () => {
  return <>
    <h1 className={s.title}>Заявки</h1>
    <Paper sx={{
      display: "flex",
      background: "transparent",
      height: "calc(100% - 65px)",
      overflow: "hidden",
      boxShadow: "none"
    }}>
      <Paper sx={{ 
        overflow: "hidden", 
        height: "100%",
        boxShadow: "none",
        background: "none",
        minWidth: 350,
        paddingTop: "5px"
      }}>
        <TextField 
          label="Поиск"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon.Search />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 352,
            marginBottom: 1,
            background: "white"
          }}/>
        <Paper sx={{ 
          overflowY: "auto", 
          height: "calc(100% - 70px)",
          boxShadow: "none",
          width: "100%"
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={`table-th-${index}`}
                      style={{ background: "#6311af", color: "white" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    style={{ background: "#6311af", padding: "10px 20px" }}
                  >
                    <Icon.Notifications sx={{ color: "white" }} />
                  </TableCell>
                  <TableCell
                    style={{ background: "#6311af" }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
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
          </TableContainer>
        </Paper>
      </Paper>
      <Paper sx={{
        boxShadow: "none"
      }}>

      </Paper>
    </Paper>
  </>;
};
 
export default RequestsPage;