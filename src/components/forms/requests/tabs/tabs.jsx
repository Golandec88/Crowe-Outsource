import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserInfo from "./userInfo";
import styles from "./styles.module.scss";
import CompanyInfo from "./companyInfo";
import { styled } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-between"
  },
});

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (<>
    <Box>
      <CustomTabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab className={styles.tabItem} label="Общее" {...a11yProps(0)} />
        <Tab className={styles.tabItem} label="Оплата" {...a11yProps(1)} />
        <Tab className={styles.tabItem} label="Отчётность" {...a11yProps(2)} />
      </CustomTabs>
    </Box>
    <TabPanel value={value} index={0}>
      <UserInfo/>
      <CompanyInfo/>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <UserInfo/>
    </TabPanel>
    <TabPanel value={value} index={2}>
      <CompanyInfo/>
    </TabPanel>
  </>
  );
}
