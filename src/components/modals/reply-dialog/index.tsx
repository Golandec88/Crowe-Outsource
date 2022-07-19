import React, { useState } from "react";
import proptypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { dialogsType } from "@components/modals/reply-dialog/types";

const Dialogs: React.FC<dialogsType> = (props) => {
  const { model, confirm, close, type, text = "" } = props;

  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  const closeHandler = () => {
    setComment("");
    close();
  };

  return (
    <>
      <Dialog
        fullWidth
        onClose={closeHandler}
        aria-labelledby="customized-dialog-title"
        open={model}
      >
        <DialogTitle>
          {t("confirmAction")}
          <IconButton
            aria-label="close"
            onClick={closeHandler}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>{text}</DialogContentText>
          <TextField
            multiline
            rows={4}
            fullWidth
            id="outlined-textarea"
            placeholder={type === "reject" ? t("rejectReason") : t("comment")}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            helperText={"* " + t("requiredField")}
            required={!!type}
          />
        </DialogContent>
        <DialogActions style={{ margin: "10px" }}>
          <Button
            size="medium"
            variant="contained"
            color="error"
            disableElevation
            onClick={closeHandler}
          >
            {t("close")}
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            disableElevation
            disabled={!comment}
            onClick={() => confirm(comment)}
          >
            {t("send")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dialogs;
