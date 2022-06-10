import { useTranslation } from "react-i18next";
import validationRules from "@utils/validation-rules";
import { registerUser } from "@modules/user/creators";
import { useState } from "react";
import s from "./style.module.scss";
import { setMessage } from "@modules/global/creators";
import { useDispatch } from "react-redux";

import { Box, Button } from "@mui/material";
import Field from "@components/fields/field";
import Title from "@components/title";

export default function RegisterUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    tin: { value: "", error: false, helperText: "" },
    phone: { value: "", error: false, helperText: "" },
    email: { value: "", error: false, helperText: "" },
    password: { value: "", error: false, helperText: "" },
    repeatPassword: { value: "", error: false, helperText: "" },
  });

  function inputHadler(value, name, rules) {
    let error = false;
    let helperText = "";

    if (rules && rules.length) {
      rules.forEach((rule) => {
        const ruleValue = rule(value);

        error = error ? true : ruleValue !== true;
        helperText = helperText
          ? helperText
          : ruleValue !== true
          ? ruleValue
          : "";
      });
    }

    setForm({
      ...form,
      [name]: {
        value,
        error,
        helperText,
      },
    });
  }

  const samePasswordValidation = () => {
    return form.password.value === form.repeatPassword.value
      ? true
      : t("passwordsDoNotMatch");
  };

  function registerNewUser(e) {
    e.preventDefault();
    const passValidation = samePasswordValidation();
    if (passValidation === true) {
      const request = {
        tin: form.tin.value,
        password: form.password.value,
        phone: form.phone.value,
        email: form.email.value,
      };
      registerUser(request, () => {
        setMessage(dispatch, { type: "info", text: t("success") + "!" });
        setForm({
          tin: { value: "", error: false, helperText: "" },
          phone: { value: "", error: false, helperText: "" },
          email: { value: "", error: false, helperText: "" },
          password: { value: "", error: false, helperText: "" },
          repeatPassword: { value: "", error: false, helperText: "" },
        });
      });
    } else {
      setForm({
        ...form,
        password: {
          value: form.password.value,
          error: true,
          helperText: passValidation,
        },
        repeatPassword: {
          value: form.repeatPassword.value,
          error: true,
          helperText: passValidation,
        },
      });
    }
  }

  return (
    <>
      <Title text={t("registerUser")} />
      <Box
        component="form"
        autoComplete="off"
        name="register-form"
        onSubmit={registerNewUser}
        className={s.form}
      >
        <Field
          required
          fullWidth
          type="number"
          label={t("pinflOrTin")}
          name="tin"
          value={form.tin.value}
          onInput={(e) =>
            inputHadler(e, "tin", [
              (validationRules.required, validationRules.tinLength),
            ])
          }
          error={form.tin.error}
          helperText={form.tin.helperText}
        />
        <Field
          className={s.field}
          required
          fullWidth
          type="tel"
          label={t("phone")}
          name="phone"
          value={form.phone.value}
          onInput={(e) => inputHadler(e, "phone", [validationRules.required])}
          error={form.phone.error}
          helperText={form.phone.helperText}
        />
        <Field
          className={s.field}
          required
          fullWidth
          type="email"
          label={t("email")}
          name="email"
          value={form.email.value}
          onInput={(e) => inputHadler(e, "email", [validationRules.required])}
          error={form.email.error}
          helperText={form.email.helperText}
        />
        <Field
          className={s.field}
          required
          fullWidth
          type="password"
          label={t("password")}
          name="password"
          value={form.password.value}
          onInput={(e) =>
            inputHadler(e, "password", [
              (validationRules.required, validationRules.minLength5),
            ])
          }
          error={form.password.error}
          helperText={form.password.helperText}
        />
        <Field
          className={s.field}
          required
          fullWidth
          type="password"
          label={t("repeatPassword")}
          name="repeatPassword"
          value={form.repeatPassword.value}
          onInput={(e) =>
            inputHadler(e, "repeatPassword", [
              (validationRules.required, validationRules.minLength5),
            ])
          }
          error={form.repeatPassword.error}
          helperText={form.repeatPassword.helperText}
        />
        <Button variant="contained" type="submit">
          {t("register")}
        </Button>
      </Box>
    </>
  );
}
