import Title from "@components/title";
import {
  Accordion, AccordionDetails, AccordionSummary,
  Grid,
  IconButton, Stack,
  Table,
  TableBody,
  TableCell,
  TableHead, TablePagination,
  TableRow,
  Tooltip, Typography
} from "@mui/material";
import s from "@components/tables/requests/appeals/style.module.scss";
import { Download } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  downloadFile, getAllStaffUsersWhoSentFilesToThisRequest,
  getClientFiles,
  getStaffUserSentFiles, staffUserUploadFiles
} from "@modules/request/creators";
import { useDispatch } from "react-redux";
import DownloadFile from "@utils/download-file";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import ConfirmationDialog from "@components/tables/file-share/ConfirmationDialog";



export default function ClientInfo() {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getClientFiles(dispatch, params.id, Receiver);
    getAllStaffUsersWhoSentFilesToThisRequest(dispatch, params.id, getStaffUsers);
  }, []);

  const [receivedFiles, setReceivedFiles] = useState();
  const [sentFiles, setSentFiles] = useState();
  const [staffUsers, setStaffUsers] = useState();
  const [expanded, setExpanded] = useState(false);
  const [staffPage, setStaffPage] = useState(0);
  const [staffRowsPerPage, setStaffRowsPerPage] = useState(5);
  const [userPage, setUserPage] = useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = useState(5);
  const [staffAmountPage, setStaffAmountPage] = useState(0);
  const [staffAmountRowsPerPage, setStaffAmountRowsPerPage] = useState(5);
  const [staffId, setStaffId] = useState("");
  const [staffUploadedFiles,setStaffUploadedFiles] = useState([]);
  const [openConfirmation,setOpenConfirmation] = useState(false);

  const handleChangePage = (event, newPage, value) => {
    if (value === "staff") {
      setStaffPage(newPage);
      getStaffUserSentFiles(dispatch, params.id, Sent, staffId, staffRowsPerPage, newPage + 1);
    } else if (value === "user") {
      setUserPage(newPage);
      getClientFiles(dispatch, params.id, Receiver, userRowsPerPage, newPage + 1);
    } else {
      setStaffAmountPage(newPage);
      getAllStaffUsersWhoSentFilesToThisRequest(dispatch, params.id, getStaffUsers, staffAmountRowsPerPage, newPage + 1);
    }

  };

  const handleChangeRowsPerPage = (event, value) => {
    if (value === "staff") {
      setStaffRowsPerPage(parseInt(event.target.value, 10));
      setStaffPage(0);
      getStaffUserSentFiles(dispatch, params.id, Sent, staffId, event.target.value, staffPage);
    } else if (value === "user") {
      setUserRowsPerPage(parseInt(event.target.value, 10));
      setUserPage(0);
      getClientFiles(dispatch, params.id, Receiver, event.target.value, userPage);
    } else {
      setStaffAmountRowsPerPage(parseInt(event.target.value, 10));
      getAllStaffUsersWhoSentFilesToThisRequest(dispatch, params.id, getStaffUsers, event.target.value, staffAmountPage);
    }

  };


  const accordionHandleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const confirmationDialogHandlerOpen = () => {
    setOpenConfirmation(true);
  };

  const confirmationDialogHandlerClose =() => {
    setOpenConfirmation(false);
  };




  function Sent(data) {
    setSentFiles(data);
    setStaffRowsPerPage(data.files.pageSize);
  }

  function Receiver(data) {
    setReceivedFiles(data);
  }

  function getStaffUsers(data) {
    setStaffUsers(data);
  }

  function uploadedFiles(data) {
    setStaffUploadedFiles(data);
  }

  const DownloadFileAsAction = (res) => {
    DownloadFile(res, () => {
    });
  };

  const staffUserUploadFilesHandler = (item) => {
    staffUserUploadFiles(item.target.files,uploadedFiles);
    confirmationDialogHandlerOpen();
  };

  return <>
    <Title text={"Client-Info"}/>
    <Grid container>
      <Grid item xs={6}>
        <Table className={s.table}>
          <TableHead className={s.head}>
            <TableRow>
              <TableCell>Received</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivedFiles && receivedFiles.files.items.map((el, index) => {
              return <TableRow key={index}>
                <Paper className={s.filesStyle}>
                  <TableCell  sx={{ padding: "5px", borderBottom: "none" }}> {el.name} </TableCell>
                  <TableCell  sx={{ padding: "5px", borderBottom: "none" }}>
                    <Tooltip placement={"top-end"}
                      title={`${el.fileClassification.class} : ${el.fileClassification.subClass}`}>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <IconButton
                          paddingNone
                          className={s.button}
                          size="small"
                          aria-label="download"
                          onClick={() => downloadFile(el.guid, DownloadFileAsAction)}
                        >
                          <Download fontSize="small"/>
                        </IconButton>
                      </TableCell>
                    </Tooltip>
                  </TableCell>

                </Paper>
              </TableRow>;
            })}
            <Stack spacing={2}>
              <TablePagination
                count={receivedFiles ? receivedFiles.files.totalCount : ""}
                page={userPage}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onPageChange={(event, page) => handleChangePage(event, page, "user")}
                rowsPerPage={userRowsPerPage}
                onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, "user")}
                backIconButtonProps={{ color: "secondary" }}
                nextIconButtonProps={{ color: "secondary" }}
                showFirstButton={true}
                showLastButton={true}
              />
            </Stack>
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={6}>
        <Table className={s.table}>
          <TableHead className={s.head}>
            <TableRow>
              <TableCell>Sent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffUsers && staffUsers.items.map((staff, index) => {
              return <Accordion key={index} expanded={expanded === index} onChange={accordionHandleChange(index)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    getStaffUserSentFiles(dispatch, params.id, Sent, staff.id, staffRowsPerPage, staffPage);
                    setStaffId(staff.id);
                  }
                  }
                >
                  <Typography>{staff.fullName} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {sentFiles && sentFiles.files.items?.length ? sentFiles.files.items.map((files, index) => {
                    return <Typography key={index} className={s.filesStyle}>
                      {files.name}
                      <Tooltip placement={"top-end"}
                        title={`${files.fileClassification.class} : ${files.fileClassification.subClass} ${files.size.size} ${files.size.measure}`}>
                        <IconButton
                          size="small"
                          aria-label="download"
                          onClick={() => downloadFile(files.guid, DownloadFileAsAction)}
                        >
                          <Download fontSize="small"/>
                        </IconButton>
                      </Tooltip>
                    </Typography>;
                  }) : "No Info"}
                </AccordionDetails>
                <Stack spacing={2}>
                  <TablePagination
                    count={sentFiles ? sentFiles.files.totalCount : ""}
                    page={staffPage}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onPageChange={(event, page) => handleChangePage(event, page, "staff")}
                    rowsPerPage={staffRowsPerPage}
                    onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, "staff")}
                    backIconButtonProps={{ color: "secondary" }}
                    nextIconButtonProps={{ color: "secondary" }}
                    showFirstButton={true}
                    showLastButton={true}
                  />
                </Stack>
              </Accordion>;
            })}
            <Stack spacing={2}>
              <TablePagination
                count={staffUsers ? staffUsers.totalCount : ""}
                page={staffAmountPage}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onPageChange={(event, page) => handleChangePage(event, page, "staffCount")}
                rowsPerPage={staffAmountRowsPerPage}
                onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, "staffCount")}
                backIconButtonProps={{ color: "secondary" }}
                nextIconButtonProps={{ color: "secondary" }}
                showFirstButton={true}
                showLastButton={true}
              />
            </Stack>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
    <Stack direction="row" alignItems="center" spacing={2}>
      <form>
        <label htmlFor="files">Select files:</label>
        <input type="file" id="files" name="files" multiple onChange={(item)=> staffUserUploadFilesHandler(item)}/>
      </form>
    </Stack>
    {openConfirmation === true ? <ConfirmationDialog
      openConfirmation={openConfirmation}
      confirmationDialogHandlerClose={confirmationDialogHandlerClose}
      staffUploadedFiles={staffUploadedFiles}
      requestId={params.id}
    /> : ""}
  </>;
}
