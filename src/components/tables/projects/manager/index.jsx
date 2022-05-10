import proptypes from "prop-types";
import Table from "@mui/material/Table";
import s from "@components/tables/requests/manager/style.module.scss";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useTranslation } from "react-i18next";
import TableSkeleton from "@components/tables/skeleton";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import { projectType } from "@types/project";
import ProjectDetails from "@components/tables/projects/manager/project-details";

export default function ProjectsTable({ items, loading }) {
  const { t } = useTranslation();

  return <>
    <TableContainer elevation={0}>
      <Table className={s.table} aria-label="collapsible table">
        <TableHead className={s.head}>
          <TableRow>
            <TableCell/>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("operators")}</TableCell>
            <TableCell>{t("clients")}</TableCell>
            <TableCell>{t("createdBy")}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className={s.body}>
          {loading ? <TableSkeleton/> :
            items.map((item, index) =>
              <Row
                item={item}
                key={`#row-${index}`}
              />
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  </>;
}

ProjectsTable.propTypes = {
  items: proptypes.arrayOf(projectType()),
  loading: proptypes.bool
};

ProjectsTable.defaultProps = {
  loading: false
};

function Row({ item }) {
  const [open, setOpen] = useState(false);

  return <>
    <TableRow>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
        </IconButton>
      </TableCell>
      <TableCell>{item.name}</TableCell>

    </TableRow>
    <TableRow>
      <TableCell colSpan={6} className={s.accordion}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ProjectDetails />
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
}

Row.propTypes = {
  item: projectType()
};
