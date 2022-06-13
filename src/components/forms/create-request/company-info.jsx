import { t } from "i18next";
import { useState } from "react";
import validationRules from "@utils/validation-rules";

import Field from "@components/fields/field";
import Title from "@components/title";
import { Grid } from "@mui/material";

export default function PassportData({ callback }) {
  const [form, setForm] = useState({
    name: "",
    oked: "",
    address: "",
    director: "",
    headAccountant: "",
    email: "",
    phone: "",
  });

  function inputHadler(value, name) {
    setForm({ ...form, [name]: value });
  }

  return (
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 2 }}
      sx={{ width: "100%" }}
      container
      onChange={() => callback({ companyInfo: form })}
    >
      <Grid item xs={12}>
        <Title text="Компания" size="lg" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("passportSerialNumber")}
          name="name"
          value={form.name}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("placeOfResidence")}
          name="oked"
          value={form.oked}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("director")}
          name="director"
          value={form.director}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("address")}
          name="address"
          value={form.address}
          onInput={inputHadler}
          rules={[validationRules.required, validationRules.minLength14]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("headAccountant")}
          name="headAccountant"
          value={form.headAccountant}
          onInput={inputHadler}
          rules={[validationRules.required, validationRules.minLength14]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="tel"
          label={t("phone")}
          name="phone"
          value={form.phone}
          onInput={inputHadler}
          rules={[validationRules.required, validationRules.minLength14]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="email"
          label={t("email")}
          name="email"
          value={form.email}
          onInput={inputHadler}
          rules={[validationRules.required, validationRules.minLength14]}
        />
      </Grid>
    </Grid>
  );
}
