import {
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box, Skeleton, Chip, Tooltip
} from "@mui/material";
import s from "./style.module.scss";
import * as Icon from "@mui/icons-material";
import proptypes from "prop-types";
import { useTranslation } from "react-i18next";
import getRequestColor from "@utils/request-color";

const columns = [
  { id: "tin", label: "tin" },
  { id: "data", label: "date" },
  { id: "notification", label: "" }
];

function ThField(id, label) {
  switch (id) {
    case "notification": return <Icon.Notifications sx={{ color: "white" }}/>;
    default: return label;
  }
}

export default function RequestsTable(props) {
  const { offset, items, onChange, selected, loading, statuses } = props;
  const { t } = useTranslation();
  return <>
    <Grid id="container" className={`${s.container} ${offset > 135 ? s.fixed : ""}`} container>
      <Grid item xs={12}>
        <TextField
          className={s["text-field"]}
          label={t("search") + "..."}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon.Search/>
              </InputAdornment>
            ),
          }}/>
      </Grid>
      <Grid className={s.table} item xs={12}>
        <Box className={s["overflow-content"]}>
          <Table>
            <TableHead className={s.head}>
              <TableRow>
                {columns.map((column, index) =>
                  <TableCell key={`table-th-${index}`}>
                    {ThField(column.id, t(column.label))}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className={s.body}>
              {loading ? <>
                <TableRow>
                  {columns.map((column, index) =>
                    <TableCell key={`table-skeleton-${index}`}>
                      <Skeleton className={s.skeleton}/>
                    </TableCell>
                  )}
                </TableRow>
              </> : items.length ? items.map((item, index) => (
                <TableRow
                  className={`${s["select-area"]} ${selected === item ? s["active"] : ""}`}
                  key={`table-tr-${index}`}
                  role="checkbox"
                  tabIndex={-1}
                  onClick={() => onChange(item)}
                  hover
                >
                  <TableCell>
                    <Tooltip title={statuses.length ? statuses[item.request.requestStatus] : t("loading") + "..."}>
                      <Chip
                        size="small"
                        variant="filled"
                        style={{ marginRight: "10px", height: "15px", background: getRequestColor(item.request.requestStatus) }}
                      />
                    </Tooltip>
                    <span>
                      {item.request.companyInfo.tin}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.request.sendDate ? item.request.sendDate.substring(0, 10) : " - "}
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" href={`tel:998${item.request.phone.replace(/[^0-9]/g, "")}`}>
                      <Icon.Phone color="primary"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : <TableRow>
                <TableCell className={s.empty} colSpan={3}>
                  {t("noApplications")}...
                </TableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  </>;
}

RequestsTable.propTypes = {
  offset: proptypes.number,
  items: proptypes.array,
  loading: proptypes.bool,
  onChange: proptypes.func,
  selected: proptypes.object,
  statuses: proptypes.array
};

RequestsTable.defaultProps = {
  onChange: () => {},
  loading: false,
  items: [],
  statuses: []
};
