import { Container, Typography } from "@mui/material";

import s from "./style.module.scss";

import AuthForm from "@forms/auth";

const Auth = () => {
  return <>
    <section className={s.layout}>
      <Container className={s.container}>
        <Typography className={s.title}>Crowe Outsource</Typography>

        <AuthForm />
      </Container>
    </section>
  </>;
};

export default Auth;
