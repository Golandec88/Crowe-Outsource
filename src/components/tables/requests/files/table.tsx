import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import FileItem from "./file-item";

import s from "./style.module.scss";

import { downloadFile as downloadFileAction } from "@modules/request/creators";
import downloadFile from "@utils/download-file";
import React, { useState } from "react";
import { classificationsType, filesType, requestType } from "@store/types";
import { selectTableType } from "@components/tables/requests/files/types";

const SelectTable: React.FC<selectTableType> = ({
  files,
  classifications,
  status,
  checkedList,
  setCheckList,
}) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TBody
            files={files}
            classifications={classifications}
            status={status}
            checkedList={checkedList}
            setCheckList={setCheckList}
          />
        </Table>
      </TableContainer>
    </>
  );
};

const TBody: React.FC<selectTableType> = ({
  files,
  classifications,
  status,
  checkedList,
  setCheckList,
}) => {
  const [localCheckList, setLocalCheckList] = useState<string[]>([]);

  function onChangeFile(index: number, value: string) {
    const result = Array.from(localCheckList);
    result[index] = value;

    setLocalCheckList(result);
    setCheckList([...checkedList, ...[files[index]]]);

    if (value === "downloaded") {
      const id = files[index].fileName;
      downloadFileAction(id, downloadFile);
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
                    fileName,
                    fileClassificationId,
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
};

export default SelectTable;
