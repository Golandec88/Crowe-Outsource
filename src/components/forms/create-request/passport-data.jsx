import { t } from "i18next";
import { useEffect, useState } from "react";
import validationRules from "@utils/validation-rules";

import Field from "@components/fields/field";
import Title from "@components/title";
import DatePickerField from "@components/fields/date";
import { Grid } from "@mui/material";

export default function PassportData({ callback }) {
  const [form, setForm] = useState({
    serialAndNumber: "",
    registration: "",
    givenDate: new Date(),
    expireDate: new Date(),
    pinfl: "",
    givenPlace: "",
  });

  function inputHadler(value, name) {
    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    callback({ passportData: form });
  }, [form]);

  return (
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 2 }}
      sx={{ width: "100%" }}
      container
    >
      <Grid item xs={12}>
        <Title text="Персональные данные (личность отправителя)" size="lg" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Field
          fullWidth
          required
          type="text"
          label={t("pinfl")}
          name="pinfl"
          value={form.pinfl}
          onInput={inputHadler}
          rules={[validationRules.required, validationRules.minLength14]}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <Field
          fullWidth
          required
          type="text"
          label={t("passportSerialNumber")}
          name="serialAndNumber"
          value={form.serialAndNumber}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={6} lg={3}>
        <DatePickerField
          value={form.givenDate}
          onChange={inputHadler}
          name="givenDate"
          label={t("givenDate")}
        />
      </Grid>
      <Grid item xs={6} lg={3}>
        <DatePickerField
          value={form.expireDate}
          onChange={inputHadler}
          name="expireDate"
          label={t("expireDate")}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          fullWidth
          required
          type="text"
          label={t("placeOfResidence")}
          name="registration"
          value={form.registration}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
    </Grid>
  );
}
