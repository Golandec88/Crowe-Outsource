import i18n from "@services/i18n-service";

export default {
  required: (e) => Boolean(e) || i18n.t("validation.required"),
  minLength3: (e) =>
    String(e).trim().length >= 3 || i18n.t("validation.minLength3"),
  minLength5: (e) =>
    String(e).trim().length >= 5 || i18n.t("validation.minLength5"),
  tinLength: (e) =>
    String(e).trim().length === 9 ||
    String(e).trim().length === 14 ||
    i18n.t("validation.tinLength"),
};
