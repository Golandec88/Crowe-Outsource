import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  MenuItem,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { getClassifications } from "@modules/request/creators";
import useItemsUploader from "@hooks/items-uploader";
import FormControl from "@mui/material/FormControl";
import s from "./style.module.css";
import { useState } from "react";

export default function ConfirmationDialog(props) {
  const {
    openConfirmation,
    confirmationDialogHandlerClose,
    staffUploadedFiles,
    onSubmit,
  } = props;
  const [{ items: classifications }] = useItemsUploader(
    "request",
    "classifications",
    "classifications",
    getClassifications
  );
  const [selected, setSelected] = useState([]);
  const [selectedSub, setSelectedSub] = useState([]);

  const handlerClassification = (index, value, type) => {
    switch (type) {
      case "sub": {
        const newValue = Array.from(selectedSub);
        newValue[index] = value;
        setSelectedSub(newValue);
        return;
      }
      default: {
        const newValue = Array.from(selected);
        newValue[index] = value;
        setSelected(newValue);
      }
    }
  };

  return (
    <>
      <Dialog
        onClose={confirmationDialogHandlerClose}
        open={openConfirmation}
        maxWidth={"xl"}
      >
        <DialogTitle>Uploaded Files</DialogTitle>
        <DialogContent className={s.dialog}>
          {staffUploadedFiles?.length &&
            staffUploadedFiles.map((item, index) => (
              <Grid
                key={index}
                container
                justifyContent={"space-between"}
                className={s.grid}
              >
                <Grid item xs>
                  <ListItem className={s.listItem}>{item.name}</ListItem>
                </Grid>
                <Grid item xs>
                  <FormControl size={"medium"} sx={{ m: 1, width: 250 }}>
                    <TextField
                      label={"Класс"}
                      fullWidth={true}
                      select
                      onChange={({ target }) =>
                        handlerClassification(index, target.value)
                      }
                      className={s.select}
                    >
                      {classifications.map(({ name }) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                {selected && (
                  <Grid item xs>
                    <FormControl size={"medium"} sx={{ m: 1, width: 250 }}>
                      <TextField
                        label={"Тип"}
                        fullWidth={true}
                        select
                        onChange={({ target }) =>
                          handlerClassification(index, target.value, "sub")
                        }
                        className={s.select}
                      >
                        {classifications.map((element) => {
                          return (
                            selected[index] === element.name &&
                            element.subClasses.map((sub) => (
                              <MenuItem value={sub} key={sub.name}>
                                {sub.name}
                              </MenuItem>
                            ))
                          );
                        })}
                      </TextField>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(item, index) =>
              confirmationDialogHandlerClose(item, index)
            }
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => onSubmit(selected, selectedSub)}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ConfirmationDialog.propTypes = {
  openConfirmation: PropTypes.bool,
  confirmationDialogHandlerClose: PropTypes.func,
  staffUploadedFiles: PropTypes.array,
  requestId: PropTypes.string,
  onSubmit: PropTypes.func,
};
