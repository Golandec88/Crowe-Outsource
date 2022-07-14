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

  //TODO Во первых вопрос такой - нужно ли при каждом вызове useItemsUploader передавать типы, во вторых не получается передать корректно getTransactions в этот хук

  const [{ items: transactions, loading }] = useItemsUploader<
    datesType,
    (dates: datesType) => void,
    transactionType[]
  >("request", "transactions", "transactions", getTransactions, {
    fromDate,
    toDate,
  });
  const columns: string[] = [
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
          <TableBody className={s.body}>
            {loading ? (
              <TableSkeleton cols={8} />
            ) : transactions?.length ? (
              transactions.map((item, index) => (
                <TableRow key={`table-tr-${index}`}>
                  {columns.map((label, subIndex) => (
                    <TableCell key={`table-cell-${subIndex}`}>
                      {/*TODO ну и тут посмотри))) */}
                      {item[label]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className={s.empty} colSpan={8}>
                  {t("noTransactions")}...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default Transactions;
