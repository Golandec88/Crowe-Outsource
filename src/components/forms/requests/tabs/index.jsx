import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./panel";
import UserInfo from "@forms/requests/user-info";
import CompanyInfo from "@forms/requests/company-info";
import Card from "@components/card";
import s from "./style.module.css";
import proptypes from "prop-types";

export default function BasicTabs({ offset, selected, onChange }) {
  const [value, setValue] = useState(0);

  return <>
    <Box className={`${s.tabs} ${offset > 135 ? s.pl : ""}`}>
      <Tabs
        value={value}
        onChange={(_, val) => setValue(val)}
        aria-label="basic tabs example"
      >
        <Tab className={s.tab}
          id={`simple-tab-${0}`}
          aria-controls={`simple-tabpanel-${0}`}
          label="Общее"
        />
        <Tab className={s.tab}
          id={`simple-tab-${1}`}
          aria-controls={`simple-tabpanel-${1}`}
          label="Оплата"
        />
        <Tab className={s.tab}
          id={`simple-tab-${2}`}
          aria-controls={`simple-tabpanel-${2}`}
          label="Отчётность"
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Card disableElevation disableRadius="all">
          <UserInfo form={selected} onChange={onChange}/>
        </Card>
        <Card disableElevation disableRadius="top">
          <CompanyInfo form={selected} onChange={onChange}/>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card disableElevation disableRadius="top">
          <UserInfo form={selected} onChange={onChange}/>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Card disableElevation disableRadius="top">
          <CompanyInfo form={selected} onChange={onChange}/>
        </Card>
      </TabPanel>
    </Box>
  </>;
}

BasicTabs.propTypes = {
  offset: proptypes.number,
  onChange: proptypes.func,
  selected: proptypes.object
};
