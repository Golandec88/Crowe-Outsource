import { useState } from "react";
import proptypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import s from "./style.module.scss";

const SelectedRows = [];
const headCells = [
  { id: "type", label: "Тип", numeric: false },
  { id: "subType", label: "Подтип", numeric: false },
  { id: "date", label: "Дата", numeric: false }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === (headCell.label === "date") ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

}

EnhancedTableHead.propTypes = {
  numSelected: proptypes.number,
  onRequestSort: proptypes.func,
  onSelectAllClick: proptypes.func,
  order: proptypes.oneOf(["asc", "desc"]),
  orderBy: proptypes.string,
  rowCount: proptypes.number,
};

export default function SelectTable({ getSelectedDocs, files, classifications }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = SelectedRows.map((n) => n);
      setSelected(newSelecteds);
      getSelectedDocs(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    getSelectedDocs(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SelectedRows.length) : 0;

  const handeleFilesById = (row) => {
    let obj = {
      class: null,
      subClass: null,
      id: null,
      fileName: null,
    };
    classifications.items.classes.forEach(item => {
      item.subClasses.forEach(id => {
        if (row.fileClassificationId === id.id) {
          Object.assign(obj, {
            class: item.name,
            subClass: id.name,
            id: id.id,
            fileName: row.fileName
          });
        }
      });
    });
    return obj;
  };

  return <>
    <TableContainer>
      <Table>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={files?.length}
        />
        <TableBody>
          {files?.slice().sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              row = handeleFilesById(row);
              console.log(row);
              const isItemSelected = isSelected(row.fileName);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  className={s.textAlign}
                  hover
                  onClick={(event) => handleClick(event, row.fileName)}
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell
                    id={labelId}>{row.class}</TableCell>
                  <TableCell
                    id={labelId}>{row.subClass}</TableCell>
                  <TableCell
                    id={labelId}>{row.data ? row.data : " - "}</TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={6}/>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25]}
      count={SelectedRows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </>;
}

SelectTable.propTypes = {
  getSelectedDocs: proptypes.func,
  files: proptypes.object,
  classifications: proptypes.object
};