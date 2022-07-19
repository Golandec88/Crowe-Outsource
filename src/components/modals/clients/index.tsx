import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { removeClientsFromProject } from "@modules/project/creators";
import { setMessage } from "@modules/global/creators";

import { clientsType } from "@components/modals/clients/types";
import s from "@components/tables/requests/manager/style.module.scss";

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
  SlideProps,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TableSkeleton from "@components/tables/skeleton";
import RequestsList from "@components/modals/requests";

const Transition = React.forwardRef<ReactElement, SlideProps>((props, ref) => {
  return (
    <Slide direction="up" ref={ref} {...props}>
      {props.children}
    </Slide>
  );
});

const Clients: React.FC<clientsType> = ({
  model,
  close,
  clients,
  loading,
  disableAdd,
  id,
}) => {
  const { t } = useTranslation();

  const [addRequestsListModal, setRequestsListModal] = useState(false);
  const [removedClient, setRemovedClient] = useState(null);

  function removeClient() {
    if (removedClient) {
      removeClientsFromProject(
        { clients: [removedClient.requestId], project: id },
        () => {
          setMessage({
            text: t("successRemoveClientFromProject"),
            type: "success",
          });
          close();
        }
      );
    }
  }

  return (
    <>
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
                {clients?.length ? (
                  loading ? (
                    <TableSkeleton cols={3} />
                  ) : (
                    clients.map((item, index) => (
                      <TableRow
                        key={`#client-${index}`}
                        className={
                          removedClient?.tin === item.tin ? s.active : ""
                        }
                        onClick={() => setRemovedClient(item)}
                      >
                        <TableCell>
                          {item?.tin || item?.companyInfo?.tin}
                        </TableCell>
                        <TableCell>
                          {item?.fullName || item?.companyInfo?.name}
                        </TableCell>
                        <TableCell>
                          {item?.oked || item?.companyInfo?.oked}
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
        </DialogActions>
      </Dialog>

      <RequestsList
        open={addRequestsListModal}
        onClose={() => setRequestsListModal(false)}
        allClose={() => {
          setRequestsListModal(false);
          close();
        }}
        existingClients={clients}
        id={id}
      />
    </>
  );
};
export default Clients;
