import { useState } from "react";
import { useTranslation } from "react-i18next";
import proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar, DialogActions, DialogContent,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { AccountTree, Person, RemoveCircleOutline } from "@mui/icons-material";
import Button from "@mui/material/Button";

import useItemsUploader from "@hooks/items-uploader";
import { getOperatorActivities, getOperators, registerOperator } from "@modules/user/creators";
import { staffUserType, operatorActivityType, clientType } from "@types/user";

import Title from "@components/title";
import TableSkeleton from "@components/tables/skeleton";

import s from "@components/tables/requests/manager/style.module.scss";
import { getRequests } from "@modules/request/creators";
import { addOperatorActivity } from "@modules/project/creators";
import { setMessage } from "@modules/global/creators";
import RegisterOperator from "@forms/registerOperator";
import useFormParser from "@hooks/form-parser";

export default function OperatorsPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addOperatorModal, setAddOperatorModal] = useState(false);
  const [{ items: operators, loading }, updateUsersList] = useItemsUploader("user", "operators", "operators", getOperators);
  const [{ items: requests }] = useItemsUploader("request", "requests", "requests", getRequests,
    { statuses: [7] }
  );
  const [info, setInfo] = useState({});
  const [infoLoading, toggleInfoLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [activityModal, toggleActivityModal] = useState(false);
  const [confirmModal, toggleConfirmModal] = useState({ value: false, method: null, text: null });
  const registerData = useFormParser("register-form");


  const manager = useSelector(({ user }) => user.info);
  const staff=[manager].concat(operators);

  function submitHandler(event) {
    event.preventDefault();
    registerOperator(dispatch, registerData(), function () {
      setMessage(dispatch, { type: "info", text: t("success") });
      close();
      updateUsersList();
    });
  }

  function close() {
    setSelected(null);
    setAddOperatorModal(false);
    toggleActivityModal(false);
    toggleConfirmModal({ value: false, method: null });
  }
  function onAddOperatorActivity(id) {
    setSelected(id);
    toggleActivityModal(true);
  }
  function onDeleteOperator(id, isConfirmed = false) {
    setSelected(id);
    if(isConfirmed) {
      toggleConfirmModal({ value: false, method: null, text: null });
      setMessage(dispatch, { type: "info", text: t("methodNotAllowed") });
    } else {
      toggleConfirmModal({
        value: true,
        method: () => onDeleteOperator(id, true),
        text: t("deleteOperator") }
      );
    }
  }
  function addActivity(clientTin, isConfirmed = false) {
    if(isConfirmed) {
      toggleConfirmModal({ value: false, method: null, text: null });
      toggleActivityModal(false);

      addOperatorActivity({ operator: selected, client: clientTin }, function () {
        setMessage(dispatch, { type: "success", text: t("success") });
      });
    } else {
      toggleConfirmModal({
        value: true,
        method: () => addActivity(clientTin, true),
        text: t("appointmentOfCustomer") }
      );
    }
  }
  function getInfo(id) {
    toggleInfoLoading(true);
    getOperatorActivities(id, data => {
      setInfo(data);
      toggleInfoLoading(false);
    });
  }

  return <>
    <Title text={t("operators")}/>
    <TableContainer elevation={0}>
      <Table className={s.table}>
        <TableHead className={s.head}>
          <TableRow>
            <TableCell/>
            <TableCell>ID</TableCell>
            <TableCell>{t("operatorFullName")}</TableCell>
            <TableCell>{t("phoneNumber")}</TableCell>
            <TableCell>{t("email")}</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {loading ? <TableSkeleton /> :
            staff?.length ? staff.map((item, index) =>
              <Row
                key={`#row-${index}`}
                onChange={getInfo}
                info={info}
                loading={infoLoading}
                onAddOperatorActivity={() => onAddOperatorActivity(item.id)}
                onDeleteOperator={() => onDeleteOperator(item.id)}
                item={item}
                staff={staff}
              />) : <>
              <TableRow>
                <TableCell colSpan={6}>
                  {t("empty")}
                </TableCell>
              </TableRow>
            </>
          }
        </TableBody>
      </Table>
    </TableContainer>
    <div className={s.addButton}>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => setAddOperatorModal(true)}
      >
        {t("addOperator")}
      </Button>
    </div>
    <Dialog onClose={close} open={addOperatorModal}>
      <DialogTitle>{t("registerOperator")}</DialogTitle>
      <DialogContent>
        <RegisterOperator submit={submitHandler} />
      </DialogContent>
    </Dialog>
    <Dialog onClose={close} open={activityModal}>
      <DialogTitle>{t("selectClientToAttach")}</DialogTitle>
      <List>
        {requests?.length ? requests.map(({ request }, index) =>
          <ListItemButton
            key={`#project-item-${index}`}
            onClick={() => addActivity(request.companyInfo.tin)}
          >
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={request.companyInfo.tin} />
          </ListItemButton>
        ): <>
          <p>{t("empty")}</p>
        </>}
      </List>
    </Dialog>
    <Dialog onClose={close} open={confirmModal.value}>
      <DialogTitle>{t("confirmAction")}</DialogTitle>
      <DialogContent>
        {confirmModal.text}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>{t("cancel")}</Button>
        <Button onClick={confirmModal.method} autoFocus>
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

function Row(props) {
  const { item, onChange, onAddOperatorActivity, onDeleteOperator, info, loading } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return <>
    <TableRow>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => {
            setOpen(!open);
            if(!open) onChange(item.id);
          }}
        >
          {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
        </IconButton>
      </TableCell>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.fullName}</TableCell>
      <TableCell>{item.phoneNumber}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>
        <Tooltip title={t("addOperatorActivity")}>
          <IconButton size="small" color="primary" onClick={onAddOperatorActivity}>
            <AccountTree />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("deleteOperator")}>
          <IconButton size="small" color="error" onClick={onDeleteOperator}>
            <RemoveCircleOutline />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={6} className={s.accordion}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <TableContainer elevation={0}>
            <Table className={s.table}>
              <TableBody className={s.body}>
                {loading ? <TableSkeleton limit={3}/> :
                  info?.length ? info.map((item, index) => <ProjectRow
                    name={item.projectName}
                    clients={item.clients}
                    key={`#project-row-${index}`}
                  />) : <>
                    <TableRow>
                      <TableCell colSpan={6}>
                        {t("empty")}
                      </TableCell>
                    </TableRow>
                  </>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
}

Row.propTypes = {
  onChange: proptypes.func,
  onAddOperatorActivity: proptypes.func,
  onDeleteOperator: proptypes.func,
  loading: proptypes.bool,
  info: operatorActivityType(),
  item: staffUserType(),
  operators: proptypes.arrayOf(staffUserType())
};

Row.defaultProps = {
  info: []
};

function ProjectRow({ name, clients }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return <>
    <TableRow className={s.subAccordion}>
      <TableCell width="66">
        <IconButton
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon/>}
        </IconButton>
      </TableCell>
      <TableCell>
        {name}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={6} className={s.accordion}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <TableContainer elevation={0}>
            <Table className={s.table}>
              <TableBody className={s.body}>
                {clients?.length ? clients.map((item, index) =>
                  <TableRow key={`#client-row-${index}`}>
                    <TableCell width="66" />
                    <TableCell>
                      <b>{item.tin}</b> - {item.fullName}
                    </TableCell>
                  </TableRow>) : <>
                  <TableRow>
                    <TableCell colSpan={2}>
                      {t("empty")}
                    </TableCell>
                  </TableRow>
                </>}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
}

ProjectRow.propTypes = {
  name: proptypes.string,
  clients: proptypes.arrayOf(clientType())
};
