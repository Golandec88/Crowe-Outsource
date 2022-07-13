import validationRules from "@utils/use-form-validation-rules";
import { registerUser } from "@modules/user/creators";
import s from "./style.module.scss";
import { t } from "i18next";
import { useForm } from "react-hook-form";

import { Box, Button, Paper } from "@mui/material";
import Field from "@components/fields/field";
import Title from "@components/title";

export default function RegisterUser() {
  const { handleSubmit, control, resetField, getValues, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  function registerNewUser(data) {
    const form = data;
    delete form.repeatPassword;
    registerUser(form, () => reset());
  }

  return (
    <>
      <Title text={t("registerUser")} />
      <Paper sx={{ mb: 3, p: 3 }}>
        <Box
          component="form"
          autoComplete="off"
          name="register-form"
          onSubmit={handleSubmit(registerNewUser)}
          className={s.form}
        >
          <Field
            required
            fullWidth
            type="text"
            label={t("pinflOrTin")}
            name="tin"
            rules={{
              ...validationRules.required,
              ...validationRules.maxLength14,
              ...validationRules.minLength9,
            }}
            control={control}
            resetField={resetField}
          />
          <Field
            className={s.field}
            required
            fullWidth
            type="tel"
            label={t("phone")}
            name="phone"
            rules={{
              ...validationRules.required,
            }}
            control={control}
            resetField={resetField}
            mask="+998(00)000 00 00"
          />
          <Field
            className={s.field}
            required
            fullWidth
            type="email"
            label={t("email")}
            name="email"
            rules={{
              ...validationRules.required,
            }}
            control={control}
            resetField={resetField}
          />
          <Field
            className={s.field}
            required
            fullWidth
            type="password"
            label={t("password")}
            name="password"
            control={control}
            resetField={resetField}
            rules={{
              validate: (value) =>
                value === getValues("repeatPassword") ||
                "" === getValues("repeatPassword") ||
                t("passwordsDoNotMatch"),
              ...validationRules.required,
              ...validationRules.minLength5,
            }}
          />
          <Field
            className={s.field}
            required
            fullWidth
            type="password"
            label={t("repeatPassword")}
            name="repeatPassword"
            control={control}
            resetField={resetField}
            rules={{
              validate: (value) =>
                value === getValues("password") ||
                getValues("password") === "" ||
                t("passwordsDoNotMatch"),
              ...validationRules.required,
              ...validationRules.minLength5,
            }}
          />
          <Button variant="contained" type="submit">
            {t("register")}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
