import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import proptypes from "prop-types";

import { Dialog, Button, DialogActions, DialogContent, DialogTitle, Slide, Table, TableHead, TableRow, TableCell, TableBody, TableContainer  } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import TableSkeleton from "@components/tables/skeleton";
import { clientType } from "@types/user";
import s from "@components/tables/requests/manager/style.module.scss";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Clients({ model, close, clients, loading, disableAdd }) {
  const { t } = useTranslation();
  const [addClientsModal, toggleClientsModal] = useState(false);
  return <>
    <Dialog
      fullScreen
      open={model}
      onClose={close}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        {t("clientsList")}
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
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

            <TableBody className={s.body}>
              {clients?.length ? loading ? <TableSkeleton cols={3}/> :
                clients.map((item, index) =>
                  <TableRow key={`#client-${index}`}>
                    <TableCell>{item?.tin || item?.companyInfo?.tin}</TableCell>
                    <TableCell>{item?.fullName || item?.companyInfo?.name}</TableCell>
                    <TableCell>{item?.oked || item?.companyInfo?.oked}</TableCell>
                  </TableRow>
                ) : <>
                <TableRow>
                  <TableCell colSpan={3} style={{ textAlign: "center" }}>{t("empty")}</TableCell>
                </TableRow>
              </>}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        {!disableAdd && <Button
          size="medium"
          variant="contained"
          color="primary"
          disableElevation
        >
          {t("addClientToProject")}
        </Button>}
      </DialogActions>
    </Dialog>
    <Dialog
      open={addClientsModal}
      onClose={() => toggleClientsModal(false)}
    >

    </Dialog>
  </>;
}

Clients.propTypes = {
  model: proptypes.bool,
  close: proptypes.func,
  loading: proptypes.bool,
  clients: proptypes.arrayOf(clientType()),
  disableAdd: proptypes.bool
};
