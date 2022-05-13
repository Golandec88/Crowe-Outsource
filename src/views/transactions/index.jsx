import { getTransactions } from "@modules/manager/creators";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "@components/title";
import { TableBody, TableCell, TableHead, TableRow, Table, Paper } from "@mui/material";
import s from "@components/tables/requests/appeals/style.module.scss";


export default function TransactionsPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.manager.classifications);

  useEffect(() => {
    getTransactions(dispatch);
  }, [dispatch]);


  const columns = [
    { id: "docNum", label: "docNum" },
    { id: "debit", label: "debit" },
    { id: "accCo", label: "accCo" },
    { id: "name", label: "name" },
    { id: "purpose", label: "purpose" },
    { id: "inn", label: "inn" },
    { id: "branch", label: "branch" },
    { id: "vdate", label: "vdate" }
  ];

  return <>
    <Title text={t("transactions")}/>
    <Paper className={s.main}>

      <Table className={s.table}>
        <TableHead className={s.head}>
          <TableRow>
            {columns.map((column, index) =>
              <TableCell key={`table-th-${index}`}>
                {t(column.label)}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {transactions?.length ? transactions.map((item, index) => (
            <TableRow key={`table-tr-${index}`}>
              {columns.map(({ label }, subIndex) =>
                <TableCell key={`table-cell-${subIndex}`}>
                  {item[label]}
                </TableCell>
              )}
            </TableRow>
          )) :
            <TableRow>
              <TableCell className={s.empty} colSpan={3}>
                {t("noTransactions")}...
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </Paper>

  </>
  ;
}


