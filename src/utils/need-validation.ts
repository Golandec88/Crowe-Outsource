export default (type: string) => {
  const fieldName = type.split("-")[0];
  const list = ["button"];

  return list.find((item) => item !== fieldName);
};
