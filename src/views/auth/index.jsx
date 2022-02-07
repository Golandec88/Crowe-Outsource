import AuthForm from "@forms/auth";
import { Container, Typography } from "@mui/material";
import s from "./style.module.scss";

const Auth = () => {
  return <>
    <section className={s.layout}>
      <Container className={s.container}>
        <Typography className={s.title}>ABV Outsource</Typography>

        <AuthForm />
      </Container>
    </section>
  </>;
};

export default Auth;
