import Box from "@mui/material/Box";
import UserInfo from "@forms/requests/user-info";
import CompanyInfo from "@forms/requests/company-info";
import Card from "@components/cards/cards";
import s from "./style.module.css";
import proptypes from "prop-types";

export default function BasicTabs({ offset, selected, onChange }) {
  return <>
    <Box className={`${s.tabs} ${offset > 135 ? s.pl : ""}`}>
      <Card disableElevation disableRadius="all">
        <UserInfo form={selected} onChange={onChange}/>
      </Card>
      <Card disableElevation disableRadius="top">
        <CompanyInfo form={selected} onChange={onChange}/>
      </Card>
    </Box>
  </>;
}

BasicTabs.propTypes = {
  offset: proptypes.number,
  onChange: proptypes.func,
  selected: proptypes.object
};
