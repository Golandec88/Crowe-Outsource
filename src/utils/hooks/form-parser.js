const finder = (name) => {
  const form = document.forms[name];
  let result = {};

  if(form) {
    try {
      [].slice
        .call(form)
        .forEach(({ name, value }) => {
          return value && Object.assign(result, { [name]: value });
        });
    } catch(e) {
      throw new Error("Form Parcer hook error:", e);
    }
  }

  return result;
};

export default (name) => () => finder(name);