type IntegerToString<N extends number> = `${N}`;

type IntegerFromString<S extends string> =
  S extends IntegerToString<infer N> ? N : never;

export { IntegerToString, IntegerFromString };
