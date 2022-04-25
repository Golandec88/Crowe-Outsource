export default function (store, value) {
  return {
    ...store,
    ...value
  };
}
