import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { getClassifications } from "@modules/request/creators";
import useItemsUploader from "@hooks/items-uploader";
import FormControl from "@mui/material/FormControl";

import { useState } from "react";


export default function ConfirmationDialog(props) {
  const { openConfirmation, confirmationDialogHandlerClose, staffUploadedFiles,requestId } = props;
  const [{ items: classifications }] = useItemsUploader("request", "classifications", "classifications", getClassifications);


  const [selected, setSelected] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const selectedClassHandler = (event) => {

    setSelected(event.target.value);
  };

  const selectedSubClassHandler =(event) => {

    setSelectedSub(event.target.value);
  };

  return <>
    <Dialog open={openConfirmation} fullWidth>
      <DialogTitle>Uploaded Files</DialogTitle>
      <DialogContent>
        {staffUploadedFiles.map((item, index) => {
          return <DialogContentText key={index}>
            <FormControl size={"small"}>
              <ListItem> {item.name}</ListItem>
              <Select size={"medium"} value={selected} onChange={selectedClassHandler}>
                {classifications.map((el,elIndex) => {
                  return <MenuItem key={elIndex} value={el.name}>{el.name}</MenuItem>;
                })}
              </Select>
              {selected?.length ? <Select size={"medium"} value={selectedSub} onChange={selectedSubClassHandler}>
                {classifications.map((element,elementIndex) => selected === element.name ? element.subClasses.map((sub) => {
                  return <MenuItem key={elementIndex} value={sub.name}>{sub.name}</MenuItem>;
                }) : "")}
              </Select> : ""}
            </FormControl>

          </DialogContentText>;
        })}
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={() => confirmationDialogHandlerClose()}>Cancel</Button>
        <Button variant={"outlined"}>Send</Button>
      </DialogActions>
    </Dialog>
  </>;
}

ConfirmationDialog.propTypes = {
  openConfirmation: PropTypes.bool,
  confirmationDialogHandlerClose: PropTypes.func,
  staffUploadedFiles: PropTypes.array,
  requestId : PropTypes.string
};
