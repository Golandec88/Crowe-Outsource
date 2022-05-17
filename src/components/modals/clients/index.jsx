import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import proptypes from "prop-types";
import { getProjectClients } from "@modules/project/creators";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, forwardRef, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSkeleton from "@components/tables/skeleton";
import TableContainer from "@mui/material/TableContainer";
import s from "@components/tables/requests/manager/style.module.scss";
import Button from "@mui/material/Button";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Clients({ model, close, id }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addClientsModal, toggleClientsModal] = useState(false);
  const clients = useSelector(({ project }) => project.clients);
  const loading = useSelector(({ global }) => global.loadingFields.clients);

  useEffect(() => {
    if(id) getProjectClients(dispatch, id);
  }, [dispatch, id]);

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
                clients.map(({ tin }, index) =>
                  <TableRow key={`#client-${index}`}>
                    <TableCell>{tin}</TableCell>
                    <TableCell />
                    <TableCell />
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
        <Button
          size="medium"
          variant="contained"
          color="primary"
          disableElevation
        >
          {t("addClientToProject")}
        </Button>
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
  id: proptypes.string
};
