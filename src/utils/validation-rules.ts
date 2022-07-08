import { t } from "i18next";

export default {
  required: (e: string | number) => Boolean(e) || t("validation.required"),
  minLength3: (e: string | number) =>
    String(e).trim().length >= 3 || t("validation.minLength3"),
  minLength5: (e: string | number) =>
    String(e).trim().length >= 5 || t("validation.minLength5"),
  minLength9: (e: string | number) =>
    String(e).trim().length >= 9 || t("validation.minLength9"),
  minLength14: (e: string | number) =>
    String(e).trim().length >= 14 || t("validation.minLength14"),
  tinLength: (e: string | number) =>
    String(e).trim().length === 9 ||
    String(e).trim().length === 14 ||
    t("validation.tinLength"),
};
