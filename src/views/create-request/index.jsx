import { t } from "i18next";
import { useState } from "react";

import s from "./style.module.scss";

import Title from "@components/title";
import Field from "@components/fields/field";
import FileField from "@components/fields/file";
import { Box, Button, Grid, TextField } from "@mui/material";
import CompanyInfo from "@components/forms/create-request/company-info";
import PassportData from "@components/forms/create-request/passport-data";

export default function CreateRequest() {
  const [form, setForm] = useState({
    tin: { value: "", error: false, helperText: "" },
    phone: { value: "", error: false, helperText: "" },
    email: { value: "", error: false, helperText: "" },
    password: { value: "", error: false, helperText: "" },
    repeatPassword: { value: "", error: false, helperText: "" },
  });

  function childrenCallback(value) {
    setForm({ ...form, ...value });
  }

  function handler(e) {}
  console.log(form);
  return (
    <div>
      <Title text={t("create-request")} />
      <Box
        component="form"
        autoComplete="off"
        name="register-form"
        // onSubmit={createRequest}
        className={s.form}
      >
        {/* <Field
          required
          fullWidth
          type="number"
          label={t("pinflOrTin")}
          name="tin"
          value={form.tin.value}
          // onInput={(e) =>
          //   inputHadler(e, "tin", [
          //     (validationRules.required, validationRules.minLength9),
          //   ])
          // }
        /> */}
        <PassportData callback={childrenCallback} />
        <CompanyInfo callback={childrenCallback} />
        <Grid
          rowSpacing={1}
          columnSpacing={{ xs: 2 }}
          sx={{ width: "100%" }}
          container
        >
          <Grid item xs={12}>
            <Title text="Общие" size="lg" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileField
              fullWidth
              name="fileName"
              variant="outlined"
              callback={childrenCallback}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileField
              fullWidth
              name="fileName2"
              variant="outlined"
              callback={childrenCallback}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          Создать
        </Button>
      </Box>
    </div>
  );
}
