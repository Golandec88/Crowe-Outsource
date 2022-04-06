import React from "react";
import { Switch } from "antd";

const SwitchButton = ({ onChangeLanguage }) => {
  return (
    <div>
      <Switch
        checkedChildren="EN"
        unCheckedChildren="RU"
        defaultChecked
        onChange={onChangeLanguage}
      />
    </div>
  );
};

export default SwitchButton;