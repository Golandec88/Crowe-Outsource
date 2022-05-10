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
import RequestDetails from "./request-details.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import getRequestColor from "@utils/request-color.js";
import useItemsUploader from "@hooks/items-uploader.js";
import { getClassifications } from "@modules/request/creators.js";
import { classificationType, requestType } from "@types/request.js";
import { Campaign } from "@mui/icons-material";
import { getStaffUserInfo } from "@modules/user/creators.js";

export default function CollapsibleTable({ items, loading, statuses }) {
  const { t } = useTranslation();
  const [{ items: classifications }] = useItemsUploader("request", "classifications", "classifications", getClassifications);
  return <>
    <TableContainer elevation={0} component={Paper}>
      <Table className={s.table} aria-label="collapsible table">
        <TableHead className={s.head}>
          <TableRow>
            <TableCell/>
            <TableCell>{t("companyName")}</TableCell>
            <TableCell>{t("tin")}</TableCell>
            <TableCell>{t("requestDate")}</TableCell>
            <TableCell>{t("callCenterOperator")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {loading ? <TableRow>
            <TableCell key={"table-skeleton-"}>
              <Skeleton className={s.skeleton}/>
            </TableCell>
          </TableRow> :
            items.map((item, index) => {
              return <Row
                key={`#row-${index}`}
                statuses={statuses}
                classifications={classifications}
                item={item}
              />;
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </>;
}

CollapsibleTable.propTypes = {
  loading: proptypes.bool,
  items: proptypes.array,
  statuses: proptypes.array
};

function Row({ item, statuses, classifications }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [callCenterName, setCallCenterName] = useState(item.request.responceCallCenterOperatorId);

  function getCallCenterName() {
    getStaffUserInfo(item.request.responceCallCenterOperatorId, function ({ data }) {
      setCallCenterName(data.fullName);
    });
  }

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
      <TableCell component="th">
        <Tooltip title={statuses.length ? statuses[item.request.requestStatus] : t("loading") + "..."}>
          <Chip
            size="small"
            variant="filled"
            style={{ marginRight: "10px", height: "15px", background: getRequestColor(item.request.requestStatus) }}
          />
        </Tooltip>
        {item.request.companyInfo.name}
      </TableCell>
      <TableCell>{item.request.companyInfo.tin}</TableCell>
      <TableCell>{item.request.sendDate.substring(0, 10)}</TableCell>
      <TableCell>
        <span>{callCenterName}</span>
        {item.request.responceCallCenterOperatorId === callCenterName &&
          <Tooltip title={t("checkCallCenter")} placement="top">
            <IconButton onClick={getCallCenterName} size="small">
              <Campaign/>
            </IconButton>
          </Tooltip>
        }
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={6} className={s.accordion}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <RequestDetails item={item} classifications={classifications.classes}/>
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
}

Row.propTypes = {
  statuses: proptypes.array,
  item: requestType(),
  classifications: classificationType()
};
