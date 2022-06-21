import { useTranslation } from "react-i18next";
import s from "@components/tables/requests/manager/style.module.scss";
import { getRequests } from "@modules/request/creators";
import useItemsUploader from "@hooks/items-uploader";
import { useEffect, useState } from "react";
import { attachClientToProject } from "@modules/project/creators";
import { setMessage } from "@modules/global/creators";
import { useDispatch } from "react-redux";
import proptypes from "prop-types";
import { clientType } from "@types/user";

import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function RequestsList({
  open,
  onClose,
  allClose,
  disableAdd,
  existingClients,
  id,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [{ items: requests, loading }] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    { statuses: [4] }
  );
  const [filteredRequests, setFilteredRequets] = useState([]);
  const [addedRequest, setAddedRequest] = useState(null);

  function addRequest() {
    attachClientToProject({ clients: [addedRequest.id], project: id }, () => {
      allClose();
      setMessage(dispatch, {
        text: t("successAddingClientToProject"),
        type: "success",
      });
    });
  }

  function filterRequests() {
    const filterArr = Array.isArray(existingClients)
      ? requests.filter(({ request }) => {
          const finded = existingClients.find((elem) => {
            return request.companyInfo.tin === elem?.tin;
          });
          return finded ? false : true;
        })
      : requests;

    setFilteredRequets(filterArr);
  }

  useEffect(() => {
    if (requests.length) filterRequests();
  }, [requests, existingClients]);

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth>
      <DialogTitle>
        {t("clientsList")}
        <IconButton
          aria-label="close"
          onClick={() => onClose(false)}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
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

            <TableBody className={s.body}>
              {filteredRequests?.length ? (
                loading ? (
                  <TableSkeleton cols={3} />
                ) : (
                  filteredRequests.map(({ request }, index) => (
                    <TableRow
                      key={`#client-${index}`}
                      className={
                        addedRequest?.companyInfo.tin ===
                        request.companyInfo.tin
                          ? s.active
                          : ""
                      }
                      onClick={() => setAddedRequest(request)}
                    >
                      <TableCell>
                        {request?.tin || request?.companyInfo?.tin}
                      </TableCell>
                      <TableCell>
                        {request?.fullName || request?.companyInfo?.name}
                      </TableCell>
                      <TableCell>
                        {request?.oked || request?.companyInfo?.oked}
                      </TableCell>
                    </TableRow>
                  ))
                )
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      {t("empty")}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        {!disableAdd && (
          <Button
            size="medium"
            variant="contained"
            color="primary"
            disableElevation
            onClick={addRequest}
          >
            {t("addClientToProject")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

RequestsList.propTypes = {
  open: proptypes.bool,
  onClose: proptypes.func,
  allClose: proptypes.func,
  disableAdd: proptypes.bool,
  existingClients: proptypes.oneOfType([
    proptypes.arrayOf(clientType()),
    proptypes.string,
  ]),
  id: proptypes.string,
};
