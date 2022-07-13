import { useEffect, useState } from "react";
import proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Dialog,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Rowing, Person, RemoveCircleOutline } from "@mui/icons-material";

import useItemsUploader from "@hooks/items-uploader";
import {
  getOperatorActivities,
  getOperators,
  registerOperator,
} from "@modules/user/creators";
import { staffUserType, operatorActivityType, clientType } from "@types/user";

import Title from "@components/title";
import TableSkeleton from "@components/tables/skeleton";

import s from "@components/tables/requests/manager/style.module.scss";
import { getRequests } from "@modules/request/creators";
import { addOperatorActivity } from "@modules/project/creators";
import { setMessage } from "@modules/global/creators";
import RegisterOperator from "@forms/registerOperator";
import OperatorActivity from "@components/modals/operator-activity";
import useFormParser from "@hooks/form-parser";
import { t } from "i18next";

export default function OperatorsPage() {
  const dispatch = useDispatch();
  const [addOperatorModal, setAddOperatorModal] = useState(false);
  const [{ items: operators, loading }, updateUsersList] = useItemsUploader(
    "user",
    "operators",
    "operators",
    getOperators
  );
  const [{ items: requests }] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    { statuses: [7] }
  );
  const [info, setInfo] = useState({});
  const [infoLoading, toggleInfoLoading] = useState(false);
  const [activityModal, toggleActivityModal] = useState(false);
  const [confirmModal, toggleConfirmModal] = useState({
    value: false,
    method: null,
    text: null,
  });
  const registerData = useFormParser("register-form");
  const manager = useSelector(({ user }) => user.info);
  const staff = [manager].concat(operators);
  const [openedCollapseID, setOpenedCollapseId] = useState("");

  function submitHandler(event) {
    event.preventDefault();
    registerOperator(registerData(), function () {
      setMessage({ type: "info", text: t("success") });
      close();
      updateUsersList();
    });
  }

  function close() {
    setAddOperatorModal(false);
    toggleActivityModal(false);
    toggleConfirmModal({ value: false, method: null });
    setInfo({});
  }
  // function onAddOperatorActivity(id) {
  //   setSelected(id);
  //   toggleActivityModal(true);
  // }
  function onDeleteOperator(id, isConfirmed = false) {
    if (isConfirmed) {
      toggleConfirmModal({ value: false, method: null, text: null });
      setMessage({ type: "info", text: t("methodNotAllowed") });
    } else {
      toggleConfirmModal({
        value: true,
        method: () => onDeleteOperator(id, true),
        text: t("deleteOperator"),
      });
    }
  }

  function getInfo(id) {
    toggleInfoLoading(true);
    getOperatorActivities(id, (data) => {
      setInfo({ ...info, [id]: data });
      toggleInfoLoading(false);
    });
  }

  function showActivities(id) {
    toggleActivityModal(true);
    getInfo(id);
  }

  return (
    <>
      <div className={s.titleWrapper}>
        <Title text={t("operators")} />
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
      <TableContainer elevation={0}>
        <Table className={s.table}>
          <TableHead className={s.head}>
            <TableRow>
              <TableCell>{t("operatorFullName")}</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>{t("phoneNumber")}</TableCell>
              <TableCell>{t("email")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody className={s.body}>
            {loading ? (
              <TableSkeleton />
            ) : staff?.length ? (
              staff.map((item, index) => (
                <Row
                  key={`#row-${index}`}
                  onDeleteOperator={() => onDeleteOperator(item.id)}
                  item={item}
                  showActivities={showActivities}
                  loading={infoLoading}
                />
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={6}>{t("empty")}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog onClose={close} open={addOperatorModal}>
        <DialogTitle>{t("registerOperator")}</DialogTitle>
        <DialogContent>
          <RegisterOperator submit={submitHandler} />
        </DialogContent>
      </Dialog>
      <Dialog onClose={close} open={activityModal} fullScreen>
        <DialogTitle>{t("operatorActivity")}</DialogTitle>
        <DialogContent>
          <OperatorActivity
            open={activityModal}
            closeModal={() => toggleActivityModal(false)}
            loading={loading}
            info={info}
          />
        </DialogContent>
      </Dialog>
      <Dialog onClose={close} open={confirmModal.value}>
        <DialogTitle>{t("confirmAction")}</DialogTitle>
        <DialogContent>{confirmModal.text}</DialogContent>
        <DialogActions>
          <Button onClick={close}>{t("cancel")}</Button>
          <Button onClick={confirmModal.method} autoFocus>
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Row({ item, onDeleteOperator, showActivities }) {
  return (
    <>
      <TableRow>
        <TableCell>{item.fullName}</TableCell>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.phoneNumber}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>
          <Tooltip title={t("operatorActivity")}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => showActivities(item.id)}
            >
              <Rowing />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("deleteOperator")}>
            <IconButton size="small" color="error" onClick={onDeleteOperator}>
              <RemoveCircleOutline />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}

// Row.propTypes = {
//   onChange: proptypes.func,
//   onAddOperatorActivity: proptypes.func,
//   onDeleteOperator: proptypes.func,
//   loading: proptypes.bool,
//   info: proptypes.oneOfType([operatorActivityType(), proptypes.string]),
//   item: staffUserType(),
//   operators: proptypes.arrayOf(staffUserType()),
// };

// Row.defaultProps = {
//   info: [],
// };
