import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import proptypes from "prop-types";
import TableSkeleton from "@components/tables/skeleton";
import s from "@components/tables/requests/appeals/style.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";




export default function ClientsTable({ items, loading },onChange,selected ) {
  const { t } = useTranslation();

  const columns = ["name" , "tin"];
  const navigate = useNavigate();
  function handleChange (id) {
    navigate("/client-info/" + id, { state: id });
  }
  return <>
    {
      <Box className={s["overflow-content"]}>
        <Table className={s.table}>
          <TableHead className={s.head}>
            <TableRow>
              {columns.map((column,index) =>
                <TableCell key={index}>
                  {column}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody className={s.body}>
            {loading ? <TableSkeleton cols={2} limit={4}/> : items.map((item,index) =>
              (
                <TableRow
                  className={`${s["select-area"]} ${selected === item ? s["active"] : ""}`}
                  key={`table-tr-${index}`}
                  role="checkbox"
                  tabIndex={-1}
                  onClick={()=> handleChange(item.request.id)}
                  hover>
                  <TableCell>
                    {item.request.companyInfo.name}
                  </TableCell>
                  <TableCell>
                    {item.request.companyInfo.tin}
                  </TableCell>
                </TableRow>
              )
            )  }
          </TableBody>
        </Table>
      </Box>
    }
  </>;
}


ClientsTable.propTypes = {
  offset: proptypes.number,
  items: proptypes.array,
  loading: proptypes.bool,
  onChange: proptypes.func,
  selected: proptypes.object,
  statuses: proptypes.array
};

ClientsTable.defaultProps = {
  onChange: () => {},
  loading: false,
  items: [],
  statuses: []
};



// const [staffModal, setStaffModal] = useState(false);
// function open() {
//   setStaffModal(true);
// }
// function close() {
//   setStaffModal(false);
// }
// <Dialog
//   open={staffModal}
//   fullScreen={true}
//   TransitionComponent={Transition}
// >
//   <DialogTitle>
//     {t("clientInfo")}
//     <IconButton
//       aria-label="close"
//       onClick={close}
//       sx={{
//         position: "absolute",
//         right: 8,
//         top: 8,
//         color: theme => theme.palette.grey[500],
//       }}
//     >
//       <CloseIcon/>
//     </IconButton>
//   </DialogTitle>
//   <DialogContent>
//
//
//   </DialogContent>
// </Dialog>;
