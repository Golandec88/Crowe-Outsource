import { createRef, useState } from "react";
import { uploadFile } from "@modules/request/creators.js";

import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function FileField({ callback, name = undefined, ...rest }) {
  const [showClearBtn, setShowClearBtn] = useState(false);
  const fileInput = createRef();

  function inputHadler(e) {
    const formData = new FormData();
    setShowClearBtn(e.target.value && e.target.files.length > 0);

    formData.append("file", e.target.files[0]);

    uploadFile(formData, (res) => {
      callback({ [name]: res.data });
    });
  }
  function clearInput() {
    fileInput.current.value = null;
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
