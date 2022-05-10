import TableCell from "@mui/material/TableCell";
import { Skeleton } from "@mui/material";
import s from "@components/tables/skeleton/style.module.css";
import TableRow from "@mui/material/TableRow";
import proptypes from "prop-types";

export default function TableSkeleton({ limit, cols }) {
  return <>
    {[...Array(limit)].map((_, row) =>
      <TableRow key={"#table-skeleton-row-" + row}>
        {[...Array(cols)].map((_, col) =>
          <TableCell key={"#table-skeleton-col-" + col}>
            <Skeleton className={s.skeleton}/>
          </TableCell>
        )}
      </TableRow>
    )}
  </>;
}

TableSkeleton.propTypes = {
  limit: proptypes.number,
  cols: proptypes.number
};

TableSkeleton.defaultProps = {
  limit: 10,
  cols: 5
};
