import * as Utils from "./utils";

type IsNumber<N> = N extends number ? true : false;

type IsInteger<N extends number> = `${N}` extends `${number}.${number}`
  ? false
  : true;

type IsFloat<N extends number> = `${N}` extends `${number}.${number}`
  ? true
  : false;

type Sign<N extends number> = N extends 0
  ? 0
  : `${N}` extends `-${number}`
    ? -1
    : 1;

type _AbsInfer<N extends number> = `-${N}`;

type Abs<N extends number> = N extends 0
  ? 0
  : `${N}` extends _AbsInfer<infer X>
    ? X
    : N;

type _NegateInfer<N extends number> = `${N}`;

type Negate<N extends number> = N extends 0
  ? 0
  : `-${N}` extends _NegateInfer<infer A>
    ? A
    : `${N}` extends _AbsInfer<infer A>
      ? A
      : N;

type Signed<
  N extends number,
  S extends Utils.Signed | [Utils.Signed, Utils.Signed],
> = S extends 0 | [0, 0] | [0, 1] | [0, -1] | [1, 0] | [-1, 0]
  ? 0
  : S extends 1 | [1, 1] | [-1, -1]
    ? Abs<N>
    : Negate<Abs<N>>;

export { IsNumber, IsInteger, IsFloat, Sign, Abs, Negate, Signed };
