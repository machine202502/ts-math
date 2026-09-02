import { NumericalSign } from "../common/types";

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
  S extends NumericalSign | [NumericalSign, NumericalSign],
> = S extends 0 | [0, 0] | [0, 1] | [0, -1] | [1, 0] | [-1, 0]
  ? 0
  : S extends 1 | [1, 1] | [-1, -1]
    ? Abs<N>
    : Negate<Abs<N>>;

type _NumberPartsSign<N extends number> = N extends 0
  ? [sign: 0, number: 0]
  : `${N}` extends `-${infer AN extends number}`
    ? [sign: -1, number: AN]
    : [sign: 1, number: N];

type _NumberPartsSplit<N extends number> =
  `${N}` extends `${infer FixedString extends string}.${infer Float extends number}`
    ? FixedString extends `${infer Fixed extends number}`
      ? [fixed: Fixed, float: Float]
      : [fixed: 0, float: 0]
    : [fixed: N, float: 0];

type NumberParts<N extends number> =
  _NumberPartsSign<N> extends [
    infer S extends NumericalSign,
    infer AbsN extends number,
  ]
    ? [sign: S, ..._NumberPartsSplit<AbsN>]
    : [sign: 0, fixed: 0, float: 0];

type Trunc<N extends number> = _NumberPartsSplit<N>[0];

type IsOdd<N extends number> =
  `${Trunc<N>}` extends `${string}${1 | 3 | 5 | 7 | 9}` ? true : false;

type IsEven<N extends number> = IsOdd<N> extends true ? false : true;

export {
  IsInteger,
  IsFloat,
  Sign,
  Abs,
  Negate,
  Signed,
  NumberParts,
  Trunc,
  IsOdd,
  IsEven,
};
