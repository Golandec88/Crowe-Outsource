import proptypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import s from "./style.module.scss";

export default function SelectTable({ files, classifications }) {
  return <>
    <TableContainer>
      <Table>
        <TBody
          files={files}
          classifications={classifications}
        />
      </Table>
    </TableContainer>
  </>;
}

SelectTable.propTypes = {
  files: proptypes.array,
  classifications: proptypes.array
};

function TBody({ files, classifications }) {
  return <>
    <TableBody>
      {files.map((item, index) => {
        const { classification, subClass } = format(item, classifications);

        return <TableRow
          className={s.textAlign}
          hover
          tabIndex={-1}
          key={index}
        >
          <TableCell>{classification} - {subClass}</TableCell>
        </TableRow>;
      })}
    </TableBody>
  </>;
}

TBody.propTypes = {
  files: proptypes.array,
  classifications: proptypes.array
};

TBody.defaultProps = {
  files: [],
  classifications: []
};

function format({ fileClassificationId, fileName }, classifications) {
  const obj = {
    classification: null,
    subClass: null,
    fileName: null,
  };
  classifications.forEach(({ subClasses, name }) => {
    subClasses.forEach(item => {
      if (fileClassificationId === item.id) {
        return Object.assign(obj, {
          classification: name,
          subClass: item.name,
          fileName: fileName
        });
      }
    });
  });
  return obj;
}
