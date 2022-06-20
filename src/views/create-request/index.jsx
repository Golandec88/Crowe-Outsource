import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createRequest,
  getMainClassificationsId,
} from "@modules/request/creators";
import { setMessage } from "@modules/global/creators";
import validationRules from "@utils/validation-rules";
import { Controller, useForm } from "react-hook-form";

import s from "./style.module.scss";

import Title from "@components/title";
import Field from "@components/fields/field/ver2";
import FileField from "@components/fields/file";
import FilesList from "@components/fields/file/files-list";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import CompanyInfo from "@components/forms/create-request/company-info";
import PassportData from "@components/forms/create-request/passport-data";

export default function CreateRequest() {
  const { handleSubmit, watch, control, resetField, setValue, getValues } =
    useForm();
  const [files, setFiles] = useState([]);

  // useEffect(() => {
  //   console.log(watch("directorTin"));
  // }, [watch("directorTin")]);
  console.log(watch("form"));
  // console.log(watch("directorTin"));
  const dispatch = useDispatch();
  const [mainClassifications, setClassifications] = useState({});
  const localValidation = {
    required: {
      required: t("validation.required"),
    },
    minLength5: {
      minLength: {
        value: 5,
        message: t("validation.minLength5"),
      },
    },
    minLength9: {
      minLength: {
        value: 9,
        message: t("validation.minLength9"),
      },
    },
    minLength14: {
      minLength: {
        value: 14,
        message: t("validation.minLength14"),
      },
    },
  };

  useEffect(() => {
    getMainClassificationsId((res) => {
      setClassifications(res.data);
    });
  }, []);

  function addFile(value) {
    setFiles([...files, value]);
  }

  function deleteFile(value, replace) {
    const filteredArray = files.filter(
      (item) => value.fileName !== item.fileName
    );
    setFiles(!!replace ? [...filteredArray, value] : [...filteredArray]);
  }

  function createNewRequest(data) {
    createRequest(
      { ...data.form, files },
      setMessage(dispatch, {
        text: t("successAddingRequest"),
        type: "success",
      })
    );
  }

  return (
    <div>
      <Title text={t("create-request")} />
      <Paper sx={{ mb: 3 }}>
        <Box
          component="form"
          autoComplete="off"
          name="register-form"
          onSubmit={handleSubmit(createNewRequest)}
          className={s.form}
        >
          <CompanyInfo
            control={control}
            resetField={resetField}
            rules={localValidation}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 2 }}
            sx={{ width: "100%", pt: 1 }}
            container
          >
            <Grid item xs={12} md={7}>
              <FileField
                required
                fullWidth
                id={mainClassifications.pinflKeyClassificationId}
                variant="outlined"
                addFile={addFile}
                deleteFile={deleteFile}
                label="ЭЦП ключ компании"
                accept=".pfx"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Field
                control={control}
                label={t("password")}
                name="form.pinflKeyPassword"
                rules={{
                  ...localValidation.required,
                }}
                resetField={resetField}
                type="password"
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <PassportData
            control={control}
            resetField={resetField}
            rules={localValidation}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />

          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 2 }}
            sx={{ width: "100%", pt: 1 }}
            container
          >
            <Grid item xs={12} md={6}>
              <Field
                control={control}
                label={t("phone")}
                name="form.phone"
                resetField={resetField}
                type="tel"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                control={control}
                label={t("email")}
                name="form.email"
                resetField={resetField}
                type="tel"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <FileField
                required
                fullWidth
                variant="outlined"
                id={mainClassifications.tinKeyClassificationId}
                addFile={addFile}
                deleteFile={deleteFile}
                label="Физический ЭЦП ключ"
                accept=".pfx"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Field
                control={control}
                label={t("password")}
                name="form.tinKeyPassword"
                rules={{
                  ...localValidation.required,
                }}
                resetField={resetField}
                type="password"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Title text="Файлы для отправки" size="lg" />
            </Grid>
            <Grid item xs={12}>
              <FilesList addFile={addFile} deleteFile={deleteFile} />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ mb: 1 }}>
            Создать
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
