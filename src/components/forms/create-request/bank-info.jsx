import { useEffect } from "react";
import { t } from "i18next";
import validationRules from "@utils/validation-rules";
import { getBankByMfo } from "@modules/request/creators.js";

import { Grid } from "@mui/material";
import Field from "@components/fields/field";

export default function BankInfo({ callback, bank }) {
  function inputHadler(value, name) {
    callback({ ...bank, [name]: value }, "bank");
  }

  useEffect(() => {
    if (bank.mfo.length === 5) {
      getBankByMfo(bank.mfo, (res) => {
        if (!!res) callback({ ...bank, name: res.data.name || "" }, "bank");
      });
    }
  }, [bank.mfo]);

  return (
    <>
      <Grid item xs={6} md={2}>
        <Field
          fullWidth
          required
          type="text"
          label={t("mfo")}
          name="mfo"
          value={bank.mfo}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("bank")}
          name="name"
          value={bank.name}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <Field
          fullWidth
          required
          type="text"
          label={t("bankAccount")}
          name="account"
          value={bank.account}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
    </>
  );
}
