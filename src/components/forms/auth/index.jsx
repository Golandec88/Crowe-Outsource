import Generator from "@forms/generator";
import useDispatcher from "@hooks/dispatcher";
import useFormParser from "@hooks/form-parser";
import useLocalStorage from "@hooks/local-storage";
import { authUser } from "@modules/user/creators";
import { Box } from "@mui/material";
import validationRules from "@utils/validation-rules";
import { useNavigate } from "react-router-dom";
import s from "./style.module.scss";

const AuthForm = () => {
  const redirect = useNavigate();
  const setToken = useLocalStorage("token").setItem;

  const auth = useDispatcher(authUser, useFormParser("auth-form"), (token, { role }) => {
    setToken(token);
    redirect(role === 3 ? "/requests" : "/");
  });

  const submitHandler = (e) => {
    e.preventDefault();
    auth();
  };

  return <>
    <Box
      className={s.form}
      component="form"
      autoComplete="off"
      name="auth-form"
      onSubmit={submitHandler}
    >
      <Generator schema={[
        {
          cols: 12,
          child: [{
            type: "text",
            props: {
              name: "login",
              required: true,
              size: "small",
              label: "Логин",
              fullWidth: true,
              rules: [validationRules.required]
            }
          }, {
            type: "text",
            props: {
              name: "password",
              required: true,
              size: "small",
              label: "Пароль",
              fullWidth: true,
              type: "password",
              rules: [validationRules.required, validationRules.minLength3]
            }
          }, {
            type: "button-sign",
            props: {
              variant: "contained",
              type: "submit",
              disableElevation: true,
              children: "Войти",
              fullWidth: true
            }
          }]
        }
      ]}/>
    </Box>
  </>;
};

export default AuthForm;
