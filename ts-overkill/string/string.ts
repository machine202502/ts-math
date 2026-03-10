type StringLength<S extends string> = _StringToTuple<S, []>["length"];

type _StringToTuple<
  S extends string,
  Tuple extends string[],
> = S extends `${infer _Head extends string}${infer Tail extends string}`
  ? _StringToTuple<Tail, [...Tuple, _Head]>
  : Tuple;

type StringToTuple<S extends string> = _StringToTuple<S, []>;

export { StringLength, StringToTuple };
