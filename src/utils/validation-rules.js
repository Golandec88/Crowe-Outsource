export default {
  required: (e) => Boolean(e) || "Обязательное поле",
  minLength3: (e) => String(e).trim().length >= 3 || "Миниммум 3 символа",
  minLength5: (e) => String(e).trim().length >= 5 || "Миниммум 5 символов",
  minLength9: (e) => String(e).trim().length >= 9 || "Миниммум 9 символов",
};
