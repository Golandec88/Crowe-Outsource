import Box from "@mui/material/Box";
import UserInfo from "@forms/requests/user-info";
import CompanyInfo from "@forms/requests/company-info";
import Card from "@components/cards/cards";
import s from "./style.module.scss";
import { requestType } from "@store/types";
import React from "react";
import { basicTabsType } from "@forms/requests/tabs/types";

const BasicTabs: React.FC<basicTabsType> = ({
  offset,
  selected,
}: {
  offset: number;
  selected: requestType;
}) => {
  return (
    <>
      <Box className={`${s.tabs} ${offset > 135 ? s.pl : ""}`}>
        <Card disableRadius="all">
          <UserInfo form={selected} />
        </Card>
        <Card disableRadius="top">
          <CompanyInfo form={selected} />
        </Card>
      </Box>
    </>
  );
};

export default BasicTabs;
