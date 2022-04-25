import { Generator } from "@forms";
import useDispatcher from "@hooks/dispatcher";
import useFormParser from "@hooks/form-parser";
import useLocalStorage from "@hooks/local-storage";
import { authUser } from "@modules/user/creators";
import { Box } from "@mui/material";
import validationRules from "@utils/validation-rules";
import { useNavigate } from "react-router-dom";
import s from "./style.module.scss";
import { useSelector } from "react-redux";

export default function AuthForm() {
  const redirect = useNavigate();
  const setToken = useLocalStorage("ABV_CRM.token").setItem;
  const loading = useSelector(({ global }) => global.loadingFields.authorization);

  const auth = useDispatcher(authUser, useFormParser("auth-form"), (token, { role }) => {
    setToken(token);
    redirect(role === 3 ? "/requests" : "/");
  });

  const submitHandler = event => {
    event.preventDefault();
    auth();
  };

  return <>
    <Box
      className={s.form}
      component="form"
      autoComplete="on"
      name="auth-form"
      onSubmit={submitHandler}
    >
      <Generator schema={[
        {
          cols: 12,
          child: [{
            type: "text",
            flat: true,
            props: {
              name: "login",
              required: true,
              size: "small",
              label: "Логин",
              fullWidth: true,
              rounded: true,
              autoComplete: "on",
              loading,
              rules: [validationRules.required]
            }
          }]
        }, {
          cols: 12,
          child: [{
            type: "text",
            flat: true,
            props: {
              name: "password",
              required: true,
              size: "small",
              label: "Пароль",
              fullWidth: true,
              type: "password",
              rounded: true,
              autoComplete: "on",
              loading,
              rules: [validationRules.required, validationRules.minLength3]
            }
          }]
        }, {
          cols: 12,
          child: [{
            type: "button-sign",
            flat: true,
            props: {
              variant: "contained",
              type: "submit",
              disableElevation: true,
              children: "Войти",
              fullWidth: true,
              loading
            }
          }]
        }
      ]}/>
    </Box>
  </>;
}
