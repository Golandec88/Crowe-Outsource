import { useEffect, useMemo, useState } from "react";
import { getAllClassifications } from "@modules/request/creators";
import proptypes from "prop-types";

import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import FileField from "@components/fields/file";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function FilesList(props) {
  const [itemsCount, setItemsCount] = useState(1);
  const [classifications, setClassifications] = useState([]);

  useEffect(
    () => getAllClassifications((res) => setClassifications(res.data)),
    []
  );

  return [...Array(itemsCount)].map((item, index) => (
    <FilesListItem
      key={"file-list-item-" + index}
      {...props}
      setCount={setItemsCount}
      itemsCount={itemsCount}
      index={index}
      classifications={classifications}
    />
  ));
}

FilesList.proptypes = {
  addFile: proptypes.func,
  deleteFile: proptypes.func,
};

function FilesListItem({
  addFile,
  deleteFile,
  setCount,
  itemsCount,
  index,
  classifications,
}) {
  const [hideElem, setHideElem] = useState(false);
  const [classificationId, setClassificationId] = useState("");
  const [localFile, setLocalFile] = useState({});

  function localAdd(value) {
    setLocalFile(value);
    addFile(value);
  }
  function localDelete(value) {
    setLocalFile({});
    deleteFile(value);
  }

  useEffect(() => {
    setLocalFile({ ...localFile, fileClassificationId: classificationId });
  }, [classificationId]);

  useEffect(() => {
    if (
      localFile.hasOwnProperty("fileName") &&
      localFile.hasOwnProperty("fileClassificationId")
    ) {
      deleteFile(localFile, "replace");
    }
  }, [localFile]);

  const showAddBtn = useMemo(() => {
    return (
      itemsCount - 1 === index &&
      classificationId &&
      localFile.hasOwnProperty("fileClassificationId")
    );
  }, [itemsCount, index, classificationId, localFile]);

  return (
    !hideElem && (
      <Grid
        rowSpacing={1}
        columnSpacing={{ xs: 2 }}
        sx={{ width: "100%", mb: 2 }}
        container
      >
        <Grid item xs={5}>
          <FileField
            id={classificationId}
            addFile={localAdd}
            deleteFile={localDelete}
          />
        </Grid>

        <Grid item xs={itemsCount - 1 === index && !showAddBtn ? 7 : 6}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              value={classificationId}
              onChange={(e) => {
                setClassificationId(e.target.value);
              }}
              input={<OutlinedInput />}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Выберите тип</em>
              </MenuItem>
              {classifications.length > 0 &&
                classifications.map(({ subClass, id, class: newClass }) => (
                  <MenuItem key={id} value={id}>
                    {[newClass, ": ", subClass]}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={showAddBtn ? 1 : 0}
          sx={{
            my: "auto",
            display: "flex",
            justifyContent: "center",
            p: showAddBtn ? "0 0 2 0" : 0,
          }}
        >
          {showAddBtn && (
            <IconButton
              onClick={() => setCount(itemsCount + 1)}
              aria-label="add file icon"
            >
              <AddIcon />
            </IconButton>
          )}
          {itemsCount - 1 !== index && (
            <IconButton
              onClick={() => {
                localDelete(localFile);
                setHideElem(true);
              }}
              aria-label="add file icon"
              edge="end"
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    )
  );
}

FilesList.proptypes = {
  addFile: proptypes.func,
  deleteFile: proptypes.func,
  setCount: proptypes.func,
  itemsCount: proptypes.number,
  index: proptypes.number,
  classifications: proptypes.array,
};
