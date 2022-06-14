import { t } from "i18next";
import { useState } from "react";
import validationRules from "@utils/validation-rules";

import s from "./style.module.scss";

import Title from "@components/title";
import Field from "@components/fields/field";
import FileField from "@components/fields/file";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import CompanyInfo from "@components/forms/create-request/company-info";
import PassportData from "@components/forms/create-request/passport-data";

export default function CreateRequest() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    tinKeyPassword: "",
    pinflKeyPassword: "",
    files: [],
  });

  function childrenCallback(value) {
    setForm({ ...form, ...value });
  }

  function addFile(value) {
    setForm({ ...form, files: [...form.files, value] });
  }

  function deleteFile(value) {
    const index = form.files.findIndex(
      (item) => value.fileName === item.fileName
    );
    form.files.splice(index, 1);
  }

  function handler(e) {}
  console.log(form);
  return (
    <div>
      <Title text={t("create-request")} />
      <Paper>
        <Box
          component="form"
          autoComplete="off"
          name="register-form"
          // onSubmit={createRequest}
          className={s.form}
        >
          <CompanyInfo callback={childrenCallback} />
          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 2 }}
            sx={{ width: "100%", paddingTop: 1 }}
            container
          >
            <Grid item xs={12} md={6}>
              <FileField
                fullWidth
                name="tinKey"
                variant="outlined"
                addFile={addFile}
                deleteFile={deleteFile}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                fullWidth
                required
                type="text"
                label={t("tinKeyPassword")}
                name="tinKeyPassword"
                value={form.tinKeyPassword}
                onInput={childrenCallback}
                rules={[validationRules.required]}
              />
            </Grid>
          </Grid>

          <PassportData callback={childrenCallback} />

          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 2 }}
            sx={{ width: "100%", paddingTop: 1 }}
            container
          >
            <Grid item xs={12} md={6}>
              <Field
                fullWidth
                type="tel"
                label={t("phone")}
                name="givenPlace"
                value={form.phone}
                onInput={(value, name) => childrenCallback({ [name]: value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                fullWidth
                type="email"
                label={t("email")}
                name="email"
                value={form.email}
                onInput={(value, name) => childrenCallback({ [name]: value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileField
                fullWidth
                name="pinflKey"
                variant="outlined"
                addFile={addFile}
                deleteFile={deleteFile}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                fullWidth
                required
                type="text"
                label={t("pinflKeyPassword")}
                name="pinflKeyPassword"
                value={form.pinflKeyPassword}
                onInput={childrenCallback}
                rules={[validationRules.required]}
              />
            </Grid>
            <Grid item xs={12}>
              <Title text="Файлы" size="lg" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileField
                fullWidth
                name="fileName"
                variant="outlined"
                addFile={addFile}
                deleteFile={deleteFile}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileField
                fullWidth
                name="fileName2"
                variant="outlined"
                addFile={addFile}
                deleteFile={deleteFile}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained">
            Создать
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
