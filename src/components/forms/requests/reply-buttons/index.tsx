import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { replyOfRequest } from "@modules/request/creators";
import { setMessage } from "@modules/global/creators";
import { filesType } from "@store/types";

import Button from "@mui/material/Button";
import Dialogs from "@components/modals/reply-dialog";
import {
  colorsType,
  replyBttonsType,
} from "@forms/requests/reply-buttons/types";

const buttons = [
  {
    type: "decline",
    color: "error",
    text: "declineRequest",
  },
  {
    type: "resend",
    color: "secondary",
    text: "resendRequest",
  },
  {
    type: "accept",
    color: "primary",
    text: "acceptRequest",
  },
] as colorsType[];

const ReplyButtons: React.FC<replyBttonsType> = ({
  disabled = false,
  id,
  staffType,
  onChange,
  checkedList,
}) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [modelType, setModelType] = useState<string | null>(null);

  const openDialog = (type: string) => {
    setModelType(type);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setModelType(null);
  };

  const confirmDialog = (comment: string) => {
    replyOfRequest(
      {
        id,
        userType: staffType,
        responseType: modelType,
        comment,
        rejectedFilesList: checkedList,
      },
      callback
    );

    function callback() {
      setOpen(false);
      onChange(modelType, id);
      setModelType(null);
      setMessage({ type: "info", text: t("success") + "!" });
    }
  };

  return (
    <>
      {buttons.map(({ type, color, text }, index) => (
        <Button
          key={"#reply-button-" + index}
          variant="contained"
          color={color}
          disableElevation
          disabled={disabled}
          onClick={() => openDialog(type)}
        >
          {t(text)}
        </Button>
      ))}

      <Dialogs
        model={open}
        type={modelType}
        confirm={confirmDialog}
        close={closeDialog}
      />
    </>
  );
};

export default ReplyButtons;
