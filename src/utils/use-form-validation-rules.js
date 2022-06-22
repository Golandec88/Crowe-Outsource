import { t } from "i18next";

export default {
  required: {
    required: t("validation.required"),
  },
  length5: {
    minLength: {
      value: 5,
      message: t("validation.minLength5"),
    },
    maxLength: {
      value: 5,
      message: t("validation.maxLength5"),
    },
  },
  minLength5: {
    minLength: {
      value: 5,
      message: t("validation.minLength5"),
    },
  },
  length9: {
    minLength: {
      value: 9,
      message: t("validation.minLength9"),
    },
    maxLength: {
      value: 9,
      message: t("validation.maxLength9"),
    },
  },
  length14: {
    minLength: {
      value: 14,
      message: t("validation.minLength14"),
    },
    maxLength: {
      value: 14,
      message: t("validation.maxLength14"),
    },
  },
  length20: {
    minLength: {
      value: 20,
      message: t("validation.minLength20"),
    },
    maxLength: {
      value: 20,
      message: t("validation.maxLength20"),
    },
  },
};
