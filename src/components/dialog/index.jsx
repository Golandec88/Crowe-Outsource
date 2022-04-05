import { useState } from "react";
import proptypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


export default function Dialogs({
  dialog,
  closeDialog,
  confirm,
  decline,
  type,
  text
}) {
  const [getComment, setComment] = useState("");
  const handleComments = (val) => setComment(val);

  return <>
    <Dialog
      fullWidth={"md"}
      onClose={closeDialog}
      aria-labelledby="customized-dialog-title"
      open={dialog}
    >
      <DialogTitle>
        Подтвердите действие!
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {text ? <DialogContentText gutterBottom>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> : null
        }
        <TextField
          multiline
          rows={4}
          fullWidth={true}
          id="outlined-textarea"
          placeholder={type ? "Опишите причину отказа" : "Напишите комментарии"}
          value={getComment}
          onChange={event => handleComments(event.target.value)}
          helperText={type ? "Обязательное поле для заполнения" : ""}
          required={type}
        />
      </DialogContent>
      <DialogActions style={{ margin: "10px" }}>
        {type ?
          <Button size={"medium"} variant="contained" color="error" disableElevation disabled={!getComment}
            onClick={() => decline(getComment)}>
            Отклонить заявку
          </Button>
          :
          <Button size={"medium"} variant="contained" color="primary" disableElevation
            onClick={() => confirm(getComment)}>
            Подтведрить заявку
          </Button>
        }
      </DialogActions>
    </Dialog>
  </>;
}

Dialogs.propTypes = {
  dialog: proptypes.bool.isRequired,
  type: proptypes.bool,
  closeDialog: proptypes.func.isRequired,
  confirm: proptypes.func,
  decline: proptypes.func,
  text: proptypes.string,
};
