import { t } from "i18next";
import { useEffect } from "react";
import { getInfoByTin } from "@modules/user/creators";
import validationRules from "@utils/use-form-validation-rules";
import proptypes from "prop-types";

import Field from "@fields/field";
import Title from "@components/title";
import { Grid } from "@mui/material";
import BankInfo from "./bank-info";

export default function CompanyInfo({
  control,
  resetField,
  watch,
  setValue,
  getValues,
}) {
  useEffect(() => {
    const companyTin = getValues("form.companyInfo.tin");

    if (companyTin?.length === 9) {
      getInfoByTin(companyTin, ({ data }) => {
        data.mfo && setValue("form.companyInfo.bank.mfo", data.mfo);
        data.name && setValue("form.companyInfo.name", data.name);
        data.oked && setValue("form.companyInfo.oked", data.oked);
        data.address && setValue("form.companyInfo.address", data.address);
        data.director && setValue("form.companyInfo.director", data.director);
        data.accountant &&
          setValue("form.companyInfo.headAccountant", data.accountant);
        data.director && setValue("form.companyInfo.director", data.director);
        data.account && setValue("form.companyInfo.bank.account", data.account);
        data.directorTin && setValue("directorTin", data.directorTin);
        data.directorPinfl &&
          setValue("form.passportData.pinfl", data.directorPinfl);
      });
    }
  }, [watch("form.companyInfo.tin")]);

  return (
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 2 }}
      sx={{ width: "100%" }}
      container
    >
      <Grid item xs={12}>
        <Title text="Информация о компании" size="lg" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Field
          fullWidth
          required
          type="number"
          label={t("tin")}
          name="form.companyInfo.tin"
          rules={{ ...validationRules.required, ...validationRules.length9 }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("companyName")}
          name="form.companyInfo.name"
          rules={{ ...validationRules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Field
          fullWidth
          required
          type="number"
          label={t("oked")}
          name="form.companyInfo.oked"
          rules={{ ...validationRules.required, ...validationRules.length5 }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          fullWidth
          required
          type="text"
          label={t("address")}
          name="form.companyInfo.address"
          rules={{ ...validationRules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>

      <BankInfo
        rules={validationRules}
        control={control}
        resetField={resetField}
        watch={watch}
        setValue={setValue}
        getValues={getValues}
      />

      <Grid item xs={4} md={2}>
        <Field
          fullWidth
          required
          type="number"
          label={t("directorTin")}
          name="directorTin"
          rules={{ ...validationRules.required, ...validationRules.length9 }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Field
          fullWidth
          required
          type="text"
          label={t("director")}
          name="form.companyInfo.director"
          rules={{ ...validationRules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Field
          fullWidth
          type="text"
          label={t("chefAccountant")}
          name="form.companyInfo.headAccountant"
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="tel"
          label={t("phone")}
          name="form.companyInfo.phone"
          control={control}
          resetField={resetField}
          mask="+998(00)000 00 00"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="email"
          label={t("email")}
          name="form.companyInfo.email"
          control={control}
          resetField={resetField}
        />
      </Grid>
    </Grid>
  );
}

CompanyInfo.proptypes = {
  control: proptypes.object,
  resetField: proptypes.func,
  watch: proptypes.func,
  setValue: proptypes.func,
  getValues: proptypes.func,
};
