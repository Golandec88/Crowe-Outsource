import { useEffect } from "react";
import { t } from "i18next";
import validationRules from "@utils/validation-rules";
import { getBankByMfo } from "@modules/request/creators.js";
import proptypes from "prop-types";

import { Grid } from "@mui/material";
import Field from "@components/fields/field/ver2";

export default function BankInfo({
  control,
  resetField,
  rules,
  watch,
  setValue,
  getValues,
}) {
  useEffect(() => {
    const bankMfo = getValues("form.companyInfo.bank.mfo");
    if (bankMfo?.length === 5) {
      getBankByMfo(bankMfo, (res) => {
        if (!!res && res.data?.name)
          setValue("form.companyInfo.bank.name", res.data.name);
      });
    }
  }, [watch("form.companyInfo.bank.mfo")]);

  return (
    <>
      <Grid item xs={6} md={2}>
        <Field
          fullWidth
          required
          type="text"
          label={t("mfo")}
          name="form.companyInfo.bank.mfo"
          rules={{ ...rules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("bank")}
          name="form.companyInfo.bank.name"
          rules={{ ...rules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <Field
          fullWidth
          required
          type="text"
          label={t("bankAccount")}
          name="form.companyInfo.bank.account"
          rules={{ ...rules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
    </>
  );
}

// BankInfo.proptypes = {
//   callback: proptypes.func,
//   bank: proptypes.object,
// };
