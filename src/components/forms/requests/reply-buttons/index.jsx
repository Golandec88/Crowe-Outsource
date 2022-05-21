import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Dialogs from "@components/modals/reply-dialog";
import proptypes from "prop-types";
import { useState } from "react";
import { replyOfRequest } from "@modules/request/creators";
import { setMessage } from "@modules/global/creators";
import { useDispatch } from "react-redux";

const buttons = [{
  type: "decline", color: "error", text: "declineRequest"
}, {
  type: "resend", color: "secondary", text: "resendRequest"
}, {
  type: "accept", color: "primary", text: "acceptRequest"
}];

export default function ReplyButtons({ disabled, id, staffType, onChange, checkedList }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [modelType, setModelType] = useState(null);

  const openDialog = type => {
    setModelType(type);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setModelType(null);
  };

  const confirmDialog = comment => {
    replyOfRequest(dispatch, {
      id, userType: staffType, responseType: modelType, comment, rejectedFilesList: checkedList
    }, () => {
      setMessage(dispatch, t("success") + "!");
      setOpen(false);
      onChange(modelType, id);
      setModelType(null);
    });
  };

  return <>
    {buttons.map(({ type, color, text }, index) => <Button
      key={"#reply-button-" + index}
      variant="contained"
      color={color}
      disableElevation
      disabled={disabled}
      onClick={() => openDialog(type)}
    >
      {t(text)}
    </Button>)}

    <Dialogs
      model={open}
      setModel={setOpen}
      type={modelType}
      confirm={confirmDialog}
      close={closeDialog}
    />
  </>;
}

ReplyButtons.propTypes = {
  staffType: proptypes.oneOf(["call-center", "manager"]),
  disabled: proptypes.bool,
  id: proptypes.string,
  onChange: proptypes.func,
  checkedList: proptypes.array
};

ReplyButtons.defaultProps = {
  disabled: false, onChange: () => {
  }, checkedList: []
};
