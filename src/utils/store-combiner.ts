export default function <S, V>(store: S, value: V): S {
  return {
    ...store,
    ...value,
  };
}
