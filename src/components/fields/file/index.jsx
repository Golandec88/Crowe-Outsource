import { createRef, useState } from "react";
import { uploadFile, deleteFiles } from "@modules/request/creators.ts";
import proptypes from "prop-types";

import s from "./style.module.scss";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function FileField({
  addFile,
  deleteFile,
  id = "",
  label = "",
  accept = "",
  ...rest
}) {
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [name, setName] = useState("");
  const fileInput = createRef();
  const key = Math.random();

  function inputHadler(e) {
    const formData = new FormData();
    setShowClearBtn(e.target.value && e.target.files.length > 0);

    formData.append("file", e.target.files[0]);

    uploadFile(formData, (res) => {
      addFile({
        fileName: res.data,
        fileClassificationId: id,
      });
      setName(res.data);
    });
  }

  function clearInput() {
    deleteFiles([name]);
    fileInput.current.value = null;
    deleteFile({ fileName: name, fileClassificationId: id });
    setShowClearBtn(false);
  }

  return (
    <FormControl fullWidth className={s["file-field"]} variant="outlined">
      <InputLabel htmlFor={"file-field" + key}>{label}</InputLabel>
      <OutlinedInput
        id={"file-field-" + key}
        inputRef={fileInput}
        onChange={inputHadler}
        type="file"
        label={label}
        {...rest}
        inputProps={(accept = { accept })}
        startAdornment={
          <InputAdornment position="start" sx={{ marginLeft: -2 }}>
            <IconButton
              aria-label="file icon"
              edge="end"
              onClick={() => {
                fileInput.current.click();
              }}
            >
              <AttachFileIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {showClearBtn && (
              <IconButton
                onClick={clearInput}
                aria-label="toggle password visibility"
                edge="end"
              >
                <Close />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

FileField.proptypes = {
  addFile: proptypes.func,
  deleteFile: proptypes.func,
  id: proptypes.string,
  label: proptypes.string,
  accept: proptypes.string,
};
