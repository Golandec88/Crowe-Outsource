export default {
  required: (e) => Boolean(e) || "Обязательное поле",
  minLength3: (e) => String(e).trim().length >= 3 || "Миниммум 3 символа"
};