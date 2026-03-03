import * as LiteralTypes from "./literal";

type IsNumber<N> = LiteralTypes.IsNumberLiteral<N>;

type IsInteger<N> =
  IsNumber<N> extends infer R
    ? R extends boolean
      ? R extends true
        ? N extends number
          ? `${N}` extends `${number}.${number}`
            ? false
            : true
          : never
        : never
      : never
    : never;

type IsFloat<N> =
  IsNumber<N> extends infer R
    ? R extends boolean
      ? R extends true
        ? N extends number
          ? `${N}` extends `${number}.${number}`
            ? true
            : false
          : never
        : never
      : never
    : never;

type _Sign<N extends number> = N extends 0
  ? 0
  : `${N}` extends `-${number}`
    ? -1
    : 1;

type Sign<N> =
  IsNumber<N> extends infer R
    ? R extends boolean
      ? R extends true
        ? N extends number
          ? _Sign<N>
          : never
        : never
      : never
    : never;

type _AbsInferNumber<N extends number> = `-${N}`;

type _Abs<N extends number> = N extends 0
  ? 0
  : `${N}` extends _AbsInferNumber<infer X>
    ? X extends number
      ? X
      : X
    : N;

type Abs<N> =
  IsNumber<N> extends infer R
    ? R extends boolean
      ? R extends true
        ? N extends number
          ? _Abs<N>
          : never
        : never
      : never
    : never;

export { _Sign, _Abs };
export { IsNumber, IsInteger, IsFloat, Sign, Abs };
