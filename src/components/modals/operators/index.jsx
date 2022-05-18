import { DialogContent, DialogTitle, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import s from "@components/tables/requests/manager/style.module.scss";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSkeleton from "@components/tables/skeleton";
import Dialog from "@mui/material/Dialog";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import proptypes from "prop-types";
import { staffUserType } from "@types/user";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Operators({ model, close, operators, loading }) {
  const { t } = useTranslation();

  return <>
    <Dialog
      fullScreen
      open={model}
      onClose={close}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        {t("operatorsList")}
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
                <TableCell>{t("operatorId")}</TableCell>
                <TableCell>{t("operatorFullName")}</TableCell>
                <TableCell>{t("clientTin")}</TableCell>
                <TableCell>{t("clientFullName")}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className={s.body}>
              {operators?.length ? loading ? <TableSkeleton cols={4}/> :
                operators.map(({ operator, clients }) => clients.map((client, index) =>
                  <TableRow key={`#operator-${index}`}>
                    <TableCell>{operator.id}</TableCell>
                    <TableCell>{operator.fullName}</TableCell>
                    <TableCell>{client.tin}</TableCell>
                    <TableCell>{client.fullName}</TableCell>
                  </TableRow> )) :
                <>
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>{t("empty")}</TableCell>
                  </TableRow>
                </>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  </>;
}

Operators.propTypes = {
  model: proptypes.bool,
  close: proptypes.func,
  operators: proptypes.arrayOf(staffUserType()),
  loading: proptypes.bool
};
