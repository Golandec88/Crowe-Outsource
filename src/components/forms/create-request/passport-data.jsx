import { t } from "i18next";
import proptypes from "prop-types";
import { getInfoByPinfl } from "@modules/user/creators.js";

import Field from "@components/fields/field/ver2";
import Title from "@components/title";
import DatePickerField from "@components/fields/date";
import { Grid } from "@mui/material";
import { useEffect } from "react";

export default function PassportData({
  control,
  resetField,
  rules,
  watch,
  setValue,
  getValues,
}) {
  useEffect(() => {
    const pinfl = getValues("form.passportData.pinfl");
    if (pinfl?.toString().length === 9 || pinfl?.toString().length === 14) {
      getInfoByPinfl(pinfl, ({ data }) => {
        data.Address &&
          setValue("form.passportData.registration", data.Address);
        data.PassSeries &&
          data.PassNumber &&
          setValue(
            "form.passportData.serialAndNumber",
            data.PassSeries + data.PassNumber
          );
        data.PassIssueDate &&
          setValue("form.passportData.givenDate", data.PassIssueDate);
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
          type="text"
          label={t("pinfl")}
          name="form.passportData.pinfl"
          rules={{
            ...rules.required,
            ...rules.minLength14,
            ...rules.minLength9,
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
          rules={{ ...rules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
      <Grid item xs={6} lg={3}>
        <DatePickerField
          rules={{ ...rules.required }}
          control={control}
          name="form.passportData.givenDate"
          label={t("givenDate")}
        />
      </Grid>
      <Grid item xs={6} lg={3}>
        <DatePickerField
          rules={{ ...rules.required }}
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
          rules={{ ...rules.required }}
          control={control}
          resetField={resetField}
        />
      </Grid>
    </Grid>
  );
}

// PassportData.proptypes = {
//   callback: proptypes.func,
//   passportData: proptypes.object,
// };
