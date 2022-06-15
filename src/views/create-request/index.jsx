import { t } from "i18next";
import { useEffect, useState } from "react";
import validationRules from "@utils/validation-rules";
import { createRequest } from "@store/modules/request/creators";

import s from "./style.module.scss";

import Title from "@components/title";
import Field from "@components/fields/field";
import FileField from "@components/fields/file";
import FilesList from "@components/fields/file/files-list";
import { Box, Button, Grid, Paper } from "@mui/material";
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
  const tinKeyClassification = "6295b3cedb714f41b4550529";
  const pinflKeyClassification = "6295b3cedb714f41b4550528";

  function childrenCallback(value) {
    setForm({ ...form, ...value });
  }

  function addFile(value) {
    setForm({ ...form, files: [...form.files, value] });
  }

  function deleteFile(value) {
    const index = form.files.findIndex(
      (item) => value.fileClassificationId === item.fileClassificationId
    );
    form.files.splice(index, 1);
  }

  function createNewRequest(e) {
    e.preventDefault();
    createRequest(form, (ev) => console.log(ev));
  }
  console.log(form);

  return (
    <div>
      <Title text={t("create-request")} />
      <Paper>
        <Box
          component="form"
          autoComplete="off"
          name="register-form"
          onSubmit={createNewRequest}
          className={s.form}
        >
          <CompanyInfo callback={childrenCallback} />
          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 2 }}
            sx={{ width: "100%", pt: 1 }}
            container
          >
            <Grid item xs={12} md={7}>
              <FileField
                fullWidth
                id={pinflKeyClassification}
                variant="outlined"
                addFile={addFile}
                deleteFile={deleteFile}
                label="ЭЦП ключ компании"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Field
                fullWidth
                required
                type="password"
                label={t("password")}
                name="pinflKeyPassword"
                value={form.pinflKeyPassword}
                onInput={(value, name) => childrenCallback({ [name]: value })}
                rules={[validationRules.required]}
              />
            </Grid>
          </Grid>

          <PassportData callback={childrenCallback} />

          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 2 }}
            sx={{ width: "100%", pt: 1 }}
            container
          >
            <Grid item xs={12} md={6}>
              <Field
                fullWidth
                required={false}
                type="tel"
                label={t("phone")}
                name="phone"
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
            <Grid item xs={12} md={7}>
              <FileField
                fullWidth
                variant="outlined"
                id={tinKeyClassification}
                addFile={addFile}
                deleteFile={deleteFile}
                label="Физический ЭЦП ключ"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Field
                fullWidth
                required
                type="password"
                label={t("password")}
                name="tinKeyPassword"
                value={form.tinKeyPassword}
                onInput={(value, name) => childrenCallback({ [name]: value })}
                rules={[validationRules.required]}
              />
            </Grid>
            <Grid item xs={12}>
              <Title text="Файлы для отправки" size="lg" />
            </Grid>
            <Grid item xs={12}>
              <FilesList addFile={addFile} deleteFile={deleteFile} />
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
