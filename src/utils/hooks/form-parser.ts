const finder = (name: string) => {
  const form = document.forms.namedItem(name);
  let result = {};

  if (form) {
    try {
      [].slice
        .call(form)
        .forEach(({ name, value }: { name: any; value: any }) => {
          return value && Object.assign(result, { [name]: value });
        });
    } catch (e) {
      throw new Error(`"Form Parcer hook error:" ${e}`);
    }
  }

  return result;
};

export default finder;
