import {
  Autocomplete,
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TextField,
} from "@mui/material";
import { getRequests } from "@modules/request/creators";
import useItemsUploader from "@hooks/items-uploader";
import { useState } from "react";
import { useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableSkeleton from "@components/tables/skeleton";

export default function History() {
  const [{ items: requests, loading }] = useItemsUploader(
    "request",
    "requests",
    "requests",
    getRequests,
    { statuses: [4] }
  );
  const [currentRequest, setCurrentRequest] = useState({});
  const [openedId, setOpenedId] = useState(false);
  const requestInfo = [
    {
      contractId: 12312221,
      dateFrom: new Date().toLocaleString(),
      dateTo: new Date().toLocaleString(),
    },
  ];
  useEffect(() => {
    console.log(currentRequest);
  }, [currentRequest]);

  return (
    <Box>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={requests}
        getOptionLabel={(option) => option.request.companyInfo.tin}
        sx={{ width: 300 }}
        onChange={(event, newValue) => {
          setCurrentRequest(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="ИНН"
            // onChange={(e) => {
            //   console.log(e);
            // }}
          />
        )}
      />
      {currentRequest?.request && (
        <Paper sx={{ py: 2, px: 4, mt: 4 }}>
          <p>
            <b>Фирма: </b> {currentRequest.request.companyInfo.name}
          </p>
          <p>
            <b>Ответсвенный: </b> Operator
          </p>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p>Номер договора: 12345</p>
            <IconButton
              sx={{ flexShrink: 1 }}
              aria-label="expand row"
              size="small"
              onClick={() => setOpenedId(!openedId)}
            >
              {openedId ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          <Collapse in={openedId} timeout="auto" unmountOnExit>
            <p>Номер договора: 12345</p>
          </Collapse>
          <TableContainer elevation={0}>
            <Table>
              <TableBody>
                {loading ? (
                  <TableSkeleton cols={4} />
                ) : currentRequest?.request ? (
                  requestInfo.map((item) => (
                    <TableRow>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={4}>{t("empty")}</TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
