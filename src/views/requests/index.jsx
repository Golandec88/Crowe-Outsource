import { Paper } from "@mui/material";
import styles from "./style.module.scss";
import BasicTabs from "../../components/forms/requests/tabs/tabs";
import FileTable from "../../components/forms/requests/filesColumn";
import RequestTable from "../../components/forms/requests/requestTable";

const RequestsPage = () => {
  return <>
    <h1 className={styles.title}>Заявки</h1>
    <Paper className={styles.mainPaper}>
      <Paper className={styles.actualRequestsPaper}>
        <RequestTable/>
      </Paper>
      <Paper className={styles.formPaper}>
        <BasicTabs/>
      </Paper>
      <Paper className={styles.formPaper}>
        <FileTable/>
      </Paper>
    </Paper>
  </>;
};


export default RequestsPage;