import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import proptypes from "prop-types";
import { forwardRef, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSkeleton from "@components/tables/skeleton";
import TableContainer from "@mui/material/TableContainer";
import s from "@components/tables/requests/manager/style.module.scss";
import Button from "@mui/material/Button";
import { clientType } from "@types/user";

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
                clients.map(({ tin, fullName, oked, ...rest }, index) =>
                  <TableRow key={`#client-${index}`}>
                    <TableCell>{tin || rest?.companyInfo.tin}</TableCell>
                    <TableCell>{fullName || rest?.companyInfo.name}</TableCell>
                    <TableCell>{oked || rest?.companyInfo.oked}</TableCell>
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
