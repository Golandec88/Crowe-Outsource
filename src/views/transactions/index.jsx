import { getTransactions } from "@modules/request/creators";
import { useTranslation } from "react-i18next";
import Title from "@components/title";
import { TableBody, TableCell, TableHead, TableRow, Table, Paper } from "@mui/material";
import s from "@components/tables/requests/appeals/style.module.scss";

import useItemsUploader from "@hooks/items-uploader";
import TableSkeleton from "@components/tables/skeleton";

export default function Transactions() {
  const { t } = useTranslation();
  const [{ items: transactions, loading }] = useItemsUploader("request", "transactions", "transactions", getTransactions);

  const columns = ["docNum", "debit", "accCo", "name", "purpose", "inn", "branch", "vdate"];

  return <>
    <Title text={t("transactions")}/>
    <Paper elevation={0} className={s.main}>
      <Table className={s.table}>
        <TableHead className={s.head}>
          <TableRow>
            {columns.map((column, index) =>
              <TableCell key={`table-th-${index}`}>
                {t("transactions-statuses." + column)}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody className={s.body}>
          {loading ? <TableSkeleton cols={8}/> : transactions?.length ? transactions.map((item, index) => (
            <TableRow key={`table-tr-${index}`}>
              {columns.map((label, subIndex) =>
                <TableCell key={`table-cell-${subIndex}`}>
                  {item[label]}
                </TableCell>
              )}
            </TableRow>
          )) :
            <TableRow>
              <TableCell className={s.empty} colSpan={8}>
                {t("noTransactions")}...
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </Paper>
  </>;
}
