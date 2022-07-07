import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import proptypes from "prop-types";
import s from "@components/tables/requests/manager/style.module.scss";
import { removeClientsFromProject } from "@modules/project/creators";
import { setMessage } from "@modules/global/creators";
import { useDispatch } from "react-redux";

import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OperatorActivity({ open, closeModal, loading, info }) {
  const { t } = useTranslation();
  // const dispatch = useDispatch();

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={closeModal}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          {t("operatorActivity")}
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer elevation={0}>
            <Table className={s.table}>
              <TableHead className={s.head}>
                <TableRow>
                  <TableCell>{t("tin")}</TableCell>
                  <TableCell>{t("name")}</TableCell>
                  <TableCell>{t("oked")}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={s.body}></TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        {/* <DialogActions>
          {!disableAdd && clients?.length > 0 && (
            <Button
              size="medium"
              variant="contained"
              color="error"
              disableElevation
              onClick={removeClient}
            >
              {t("removeClientFromProject")}
            </Button>
          )}
          {!disableAdd && (
            <Button
              size="medium"
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                setRequestsListModal(!addRequestsListModal);
              }}
            >
              {t("addClientToProject")}
            </Button>
          )}
        </DialogActions> */}
      </Dialog>

      {/* <RequestsList
        open={addRequestsListModal}
        onClose={() => setRequestsListModal(false)}
        allClose={() => {
          setRequestsListModal(false);
          closeModal();
        }}
        existingClients={clients}
        id={id}
      /> */}
    </>
  );
}

// Clients.propTypes = {
//   model: proptypes.bool,
//   close: proptypes.func,
//   loading: proptypes.bool,
//   clients: proptypes.oneOfType([
//     proptypes.arrayOf(clientType()),
//     proptypes.string,
//   ]),
//   disableAdd: proptypes.bool,
// };
