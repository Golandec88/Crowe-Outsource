import { t } from "i18next";
import { useEffect, useState } from "react";
import validationRules from "@utils/validation-rules";
import { getInfo } from "@modules/user/creators";
import { useDispatch } from "react-redux";

import Field from "@components/fields/field";
import Title from "@components/title";
import { Grid } from "@mui/material";
import BankInfo from "./bank-info";

export default function PassportData({ callback }) {
  const dispatch = useDispatch();
  const [directorTin, setDirectorTin] = useState("");
  const [form, setForm] = useState({
    name: "",
    tin: "",
    oked: "",
    address: "",
    director: "",
    headAccountant: "",
    email: "",
    phone: "",
    bank: {
      mfo: "",
      name: "",
      account: "",
    },
  });

  function inputHadler(value, name) {
    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    callback({ companyInfo: form });
  }, [form]);

  useEffect(() => {
    if (directorTin.length === 9)
      getInfo(dispatch, directorTin, (res) => {
        setForm({ ...form, director: res.Name });
      });
  }, [directorTin]);

  useEffect(() => {
    if (form.tin.length === 9 || form.tin.length === 14)
      getInfo(dispatch, form.tin, (res) => {
        setForm({
          ...form,
          name: res.Name ? res.Name : form.name,
          oked: res.Oked ? res.Oked : form.oked,
          address: res.Address ? res.Address : form.address,
          bank: {
            ...form.bank,
            mfo: res.Mfo ? res.Mfo : form.bank.mfo,
            account: res.Account ? res.Account : form.bank.account,
          },
        });
      });
  }, [form.tin]);

  return (
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 2 }}
      sx={{ width: "100%" }}
      container
    >
      <Grid item xs={12}>
        <Title text="Информация о компании" size="lg" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Field
          fullWidth
          required
          type="text"
          label={t("tin")}
          name="tin"
          value={form.tin}
          onInput={inputHadler}
          rules={[validationRules.required, validationRules.minLength9]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="text"
          label={t("companyName")}
          name="name"
          value={form.name}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Field
          fullWidth
          required
          type="text"
          label={t("oked")}
          name="oked"
          value={form.oked}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          fullWidth
          required
          type="text"
          label={t("address")}
          name="address"
          value={form.address}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>

      <BankInfo callback={inputHadler} bank={form.bank} />

      <Grid item xs={4} md={2}>
        <Field
          fullWidth
          required
          type="text"
          label={t("directorTin")}
          name="directorTin"
          value={directorTin}
          onInput={setDirectorTin}
          rules={[validationRules.required, validationRules.minLength9]}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Field
          fullWidth
          required
          type="text"
          label={t("director")}
          name="director"
          value={form.director}
          onInput={inputHadler}
          rules={[validationRules.required]}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Field
          fullWidth
          type="text"
          label={t("chefAccountant")}
          name="headAccountant"
          value={form.headAccountant}
          onInput={inputHadler}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="tel"
          label={t("phone")}
          name="phone"
          value={form.phone}
          onInput={inputHadler}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          fullWidth
          required
          type="email"
          label={t("email")}
          name="email"
          value={form.email}
          onInput={inputHadler}
        />
      </Grid>
    </Grid>
  );
}
