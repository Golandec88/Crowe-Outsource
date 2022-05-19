import { useState } from "react";
import proptypes from "prop-types";
import { useTranslation } from "react-i18next";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton, Collapse, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@mui/material";

import { activityType } from "@types/project";
import s from "@components/tables/requests/manager/style.module.scss";
import TableSkeleton from "@components/tables/skeleton";
import RequestDetails from "@components/tables/requests/manager/request-details";
import { getRequest } from "@modules/request/creators";
import { useDispatch } from "react-redux";
import { classificationType, requestType } from "@types/request";

export default function ActivityTable({ items, loading, classifications }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeList, setActive] = useState([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const [selected, setSelected] = useState();

  function toggleRow(index, value, tin) {
    const newList = [...activeList];
    newList[index] = value;

    if(value) getRequestInfo(tin);
    setActive(newList);
  }

  function getRequestInfo(tin) {
    setRequestLoading(true);

    getRequest(dispatch, tin, info => {
      setSelected(info);
      setRequestLoading(false);
    });
  }

  return <>
    <TableContainer elevation={0}>
      <Table className={s.table}>
        <TableHead className={s.head}>
          <TableRow>
            <TableCell />
            <TableCell>{t("projectName")}</TableCell>
            <TableCell>{t("tin")}</TableCell>
            <TableCell>{t("companyName")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {loading ? <TableSkeleton cols={4} /> :
            items.map(project =>
              project.clients.map((client, index) =>
                <Row
                  key={`#row-key-${index}`}
                  projectName={project.projectName}
                  tin={client.tin}
                  fullName={client.fullName}
                  index={index}
                  setActive={value => toggleRow(index, value, client.tin)}
                  activeList={activeList}
                  loading={requestLoading}
                  selected={selected}
                  classifications={classifications}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>;
}

ActivityTable.propTypes = {
  items: proptypes.arrayOf(activityType()),
  classifications: proptypes.arrayOf(classificationType()),
  loading: proptypes.bool
};

function Row(props) {
  const { projectName, tin, fullName, index, activeList, setActive, loading, selected, classifications } = props;
  return <>
    <TableRow>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => setActive(!activeList[index])}
        >
          {activeList[index] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
        </IconButton>
      </TableCell>
      <TableCell>
        {projectName}
      </TableCell>
      <TableCell>
        {tin}
      </TableCell>
      <TableCell>
        {fullName}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={6} className={s.accordion}>
        <Collapse in={activeList[index]} timeout="auto" unmountOnExit>
          {loading ?
            <Table><TableBody><TableSkeleton cols={4} limit={4}/></TableBody></Table> :
            <RequestDetails
              item={selected}
              classifications={classifications}
            />
          }
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
}

Row.propTypes = {
  projectName: proptypes.string,
  tin: proptypes.string,
  fullName: proptypes.string,
  activeList: proptypes.arrayOf(proptypes.bool),
  index: proptypes.number,
  setActive: proptypes.func,
  loading: proptypes.bool,
  selected: requestType(),
  classifications: proptypes.arrayOf(classificationType())
};
