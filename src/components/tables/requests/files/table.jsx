import proptypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import s from "./style.module.scss";
import FileItem from "./file-item";
import { downloadFile as downloadFileAction } from "@modules/request/creators.ts";
import downloadFile from "@utils/download-file.ts";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function SelectTable({
  files,
  classifications,
  status,
  selected,
  checkedList,
  setCheckList,
}) {
  return (
    <>
      <TableContainer>
        <Table>
          <TBody
            files={files}
            classifications={classifications}
            status={status}
            selected={selected}
            checkedList={checkedList}
            setCheckList={setCheckList}
          />
        </Table>
      </TableContainer>
    </>
  );
}

SelectTable.propTypes = {
  files: proptypes.array,
  classifications: proptypes.array,
  status: proptypes.string,
  selected: proptypes.object,
  checkedList: proptypes.array,
  setCheckList: proptypes.func,
};

function TBody({
  files,
  classifications,
  status,
  selected,
  checkedList,
  setCheckList,
}) {
  const [localCheckList, setLocalCheckList] = useState([]);
  const dispatch = useDispatch();

  function onChangeFile(index, value) {
    const result = Array.from(localCheckList);
    result[index] = value;

    setLocalCheckList(result);
    setCheckList([...checkedList, ...[files[index]]]);

    if (value === "downloaded") {
      const id = files[index].fileName;
      downloadFileAction(dispatch, id, downloadFile);
    }
  }

  return (
    <>
      <TableBody>
        {files.map(({ fileName, fileClassificationId }, index) => {
          return (
            <TableRow className={s.textAlign} hover tabIndex={-1} key={index}>
              <TableCell className={s.cell}>
                <FileItem
                  info={{
                    name: fileName,
                    classificationId: fileClassificationId,
                  }}
                  classifications={classifications}
                  type={localCheckList[index] ?? "wait"}
                  counter={index + 1}
                  key={`#file-item-${index}`}
                  status={status}
                  onChange={onChangeFile}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
}

TBody.propTypes = {
  files: proptypes.array,
  classifications: proptypes.array,
  status: proptypes.string,
  selected: proptypes.object,
  checkedList: proptypes.array,
  setCheckList: proptypes.func,
};

TBody.defaultProps = {
  files: [],
  classifications: [],
};

function format({ fileClassificationId, fileName }, classifications) {
  const obj = {
    classification: null,
    subClass: null,
    fileName: null,
  };
  classifications.forEach(({ subClasses, name }) => {
    subClasses.forEach((item) => {
      if (fileClassificationId === item.id) {
        return Object.assign(obj, {
          classification: name,
          subClass: item.name,
          fileName: fileName,
        });
      }
    });
  });
  return obj;
}
