import { Generator } from "@forms";
import validationRules from "@utils/validation-rules";
import { useTranslation } from "react-i18next";
import s from "@forms/auth/style.module.scss";
import { Box } from "@mui/material";
import proptypes from "prop-types";

export default function RegisterOperator({ submit }) {
  const { t } = useTranslation();

  return <>
    <Box
      className={s.form}
      component="form"
      autoComplete="off"
      name="register-form"
      onSubmit={submit}
    >
      <Generator schema={[
        {
          cols: 12,
          child: [{
            type: "text",
            props: {
              name: "login",
              required: true,
              label: t("login"),
              fullWidth: true,
              rules: [validationRules.required]
            }
          }]
        }, {
          cols: 12,
          child: [{
            type: "text",
            props: {
              name: "password",
              required: true,
              label: t("password"),
              fullWidth: true,
              rules: [validationRules.required, validationRules.minLength3]
            }
          }]
        }, {
          cols: 12,
          child: [{
            type: "text",
            props: {
              name: "fullName",
              required: true,
              label: t("fullName"),
              fullWidth: true,
              rules: [validationRules.required]
            }
          }]
        }, {
          cols: 12,
          child: [{
            type: "text",
            props: {
              name: "phoneNumber",
              required: true,
              label: t("phone"),
              fullWidth: true,
              rules: [validationRules.required]
            }
          }]
        }, {
          cols: 12,
          child: [{
            type: "text",
            props: {
              name: "email",
              required: true,
              label: t("email"),
              fullWidth: true,
              rules: [validationRules.required]
            }
          }]
        }, {
          cols: 12,
          child: [{
            type: "button",
            props: {
              variant: "contained",
              disableElevation: true,
              children: t("create"),
              type: "submit"
            }
          }]
        }
      ]} />
    </Box>
  </>;
}

RegisterOperator.propTypes = {
  submit: proptypes.func
};
