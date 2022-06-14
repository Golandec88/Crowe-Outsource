import { createRef, useState } from "react";
import { uploadFile, deleteFiles } from "@modules/request/creators.js";

import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function FileField({ addFile, deleteFile, name = "", ...rest }) {
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [id, setId] = useState("");
  const fileInput = createRef();

  function inputHadler(e) {
    const formData = new FormData();
    setShowClearBtn(e.target.value && e.target.files.length > 0);

    formData.append("file", e.target.files[0]);

    uploadFile(formData, (res) => {
      addFile({
        fileName: name,
        fileClassificationId: res.data,
      });
      setId(res.data);
    });
  }

  function clearInput() {
    deleteFiles([id]);
    fileInput.current.value = null;
    deleteFile({ fileName: name });
    setShowClearBtn(false);
  }

  return (
    <OutlinedInput
      inputRef={fileInput}
      onChange={inputHadler}
      type="file"
      {...rest}
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
  );
}
