import { t } from "i18next";
import proptypes from "prop-types";
import { getInfoByPinfl } from "@modules/user/creators.ts";
import validationRules from "@utils/use-form-validation-rules";

import Field from "@fields/field";
import Title from "@components/title";
import DatePickerField from "@components/fields/date";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function PassportData({
  control,
  resetField,
  watch,
  setValue,
  getValues,
}) {
  const dispatch = useDispatch();

  function getIsoDate(date) {
    let newDate = "";
    if (date) {
      try {
        newDate = new Date(date).toISOString();
      } catch {
        newDate = date;
      }
    }
    return newDate;
  }
  function getExpireDate(date) {
    const year = new Date(date).getFullYear() + 10;
    let newDate = new Date(date);
    newDate.setFullYear(year);

    if (date) {
      try {
        newDate = newDate.toISOString();
      } catch {}
    }
    return newDate;
  }

  useEffect(() => {
    const pinfl = getValues("form.passportData.pinfl");
    if (pinfl?.toString().length === 14) {
      getInfoByPinfl(pinfl, ({ data }) => {
        data.Address &&
          setValue("form.passportData.registration", data.Address);
        data.PassSeries &&
          data.PassNumber &&
          setValue(
            "form.passportData.serialAndNumber",
            data.PassSeries + data.PassNumber
          );
        if (data.PassIssueDate) {
          setValue(
            "form.passportData.givenDate",
            getIsoDate(data.PassIssueDate)
          );
          setValue(
            "form.passportData.expireDate",
            getExpireDate(data.PassIssueDate)
          );
        }
      });
    }
  }, [watch("form.passportData.pinfl")]);

  return (
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 2 }}
      sx={{ width: "100%" }}
      container
    >
      <Grid item xs={12}>
        <Title text="Персональные данные (личность отправителя)" size="lg" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Field
          fullWidth
          required
          type="number"
          label={t("pinfl")}
          name="form.passportData.pinfl"
          rules={{
            ...validationRules.required,
            ...validationRules.length14,
          }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <Field
          fullWidth
          required
          type="text"
          label={t("passportSerialNumber")}
          name="form.passportData.serialAndNumber"
          rules={{ ...validationRules.required }}
          control={control}
          resetField={resetField}
          mask="aa0000000"
        />
      </Grid>
      <Grid item xs={6} lg={3}>
        <DatePickerField
          control={control}
          name="form.passportData.givenDate"
          label={t("givenDate")}
        />
      </Grid>
      <Grid item xs={6} lg={3}>
        <DatePickerField
          control={control}
          name="form.passportData.expireDate"
          label={t("expireDate")}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          fullWidth
          required
          type="text"
          label={t("placeOfResidence")}
          name="form.passportData.registration"
          rules={{ ...validationRules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
    </Grid>
  );
}

PassportData.proptypes = {
  control: proptypes.object,
  resetField: proptypes.func,
  watch: proptypes.func,
  setValue: proptypes.func,
  getValues: proptypes.func,
};
