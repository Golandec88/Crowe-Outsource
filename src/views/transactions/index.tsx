import { getTransactions } from "@modules/request/creators";
import { useTranslation } from "react-i18next";
import Title from "@components/title";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
  TextField,
} from "@mui/material";
import s from "@components/tables/requests/appeals/style.module.scss";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { FC, useState } from "react";
import useItemsUploader from "@hooks/items-uploader";
import TableSkeleton from "@components/tables/skeleton";
import Button from "@mui/material/Button";
import { SearchRounded } from "@mui/icons-material";
import { datesType, transactionType } from "@store/types";

const Transactions: FC = () => {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [toDate, setToDate] = useState(new Date());

  const [{ items: transactions, loading }] = useItemsUploader<
    transactionType[],
    datesType
  >("request", "transactions", "transactions", getTransactions, {
    fromDate,
    toDate,
  });
  const columns = [
    "docNum",
    "debit",
    "accCo",
    "name",
    "purpose",
    "inn",
    "branch",
    "vdate",
  ];

  return (
    <>
      <Title text={t("transactions")} />
      <Paper elevation={0} className={s.filters}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            openTo="day"
            views={["day", "month", "year"]}
            label={t("dateFrom")}
            value={fromDate}
            onChange={setFromDate}
            renderInput={(params) => (
              <TextField {...params} className={s.datepicker} />
            )}
          />
          <DatePicker
            openTo="day"
            views={["day", "month", "year"]}
            label={t("dateTo")}
            value={toDate}
            onChange={setToDate}
            renderInput={(params) => (
              <TextField {...params} className={s.datepicker} />
            )}
          />
          <Button
            variant="text"
            onClick={() => getTransactions({ fromDate, toDate })}
          >
            <SearchRounded />
          </Button>
        </LocalizationProvider>
      </Paper>
      <Paper elevation={0}>
        <Table className={s.table}>
          <TableHead className={s.head}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={`table-th-${index}`}>
                  {t("transactions-statuses." + column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <CstTableBody
            loading={loading}
            transactions={transactions}
            columns={columns}
          />
        </Table>
      </Paper>
    </>
  );
};

interface ICstTableBody {
  loading: boolean;
  transactions: transactionType[];
  columns: string[];
}

const CstTableBody: FC<ICstTableBody> = (props) => {
  const { loading, transactions, columns } = props;
  const { t } = useTranslation();

  return (
    <>
      <TableBody className={s.body}>
        {loading ? (
          <TableSkeleton cols={8} />
        ) : transactions?.length ? (
          transactions.map((item: transactionType, index: number) => (
            <>
              <TableRow key={`table-tr-${index}`}>
                {columns.map((label, subIndex) => (
                  <TableCell key={`table-cell-${subIndex}`}>
                    {item[label]}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))
        ) : (
          <TableRow>
            <TableCell className={s.empty} colSpan={8}>
              {t("noTransactions")}...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default Transactions;
