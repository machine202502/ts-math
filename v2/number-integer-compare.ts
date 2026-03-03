import * as Number from "./number";
import * as NumberIntegerUtils from "./number-integer-utils";
import * as Utils from "./utils";

type _IntegerPositiveCompare<L extends number, R extends number> =
  NumberIntegerUtils.IntegerToDigitTuple<L> extends infer TL
    ? NumberIntegerUtils.IntegerToDigitTuple<R> extends infer TR
      ? TL extends Utils.Digit[]
        ? TR extends Utils.Digit[]
          ? NumberIntegerUtils.IntegerDigitTupleCompare<TL, TR>
          : 0
        : 0
      : 0
    : 0;

type IntegerCompare<L extends number, R extends number> = L extends R
  ? 0
  : [Number.Sign<L>, Number.Sign<R>] extends infer S
    ? S extends [-1, 0] | [-1, 1] | [0, 1]
      ? -1
      : S extends [1, -1] | [1, 0] | [0, -1]
        ? 1
        : S extends [1, 1]
          ? _IntegerPositiveCompare<L, R>
          : _IntegerPositiveCompare<Number.Abs<R>, Number.Abs<L>>
    : 0;

type IntegerGt<L extends number, R extends number> =
  IntegerCompare<L, R> extends 1 ? true : false;

type IntegerGte<L extends number, R extends number> =
  IntegerCompare<L, R> extends 1 | 0 ? true : false;

type IntegerLt<L extends number, R extends number> =
  IntegerCompare<L, R> extends -1 ? true : false;

type IntegerLte<L extends number, R extends number> =
  IntegerCompare<L, R> extends -1 | 0 ? true : false;

type IntegerEq<L, R> = L extends R ? true : false;

type IntegerNeq<L extends number, R extends number> = L extends R
  ? false
  : true;

type IntegerMin<L extends number, R extends number> =
  IntegerLt<L, R> extends true ? L : R;

type IntegerMax<L extends number, R extends number> =
  IntegerGt<L, R> extends true ? L : R;

type IntegerClamp<
  N extends number,
  Min extends number,
  Max extends number,
> = IntegerMax<IntegerMin<N, Max>, Min>;

export {
  IntegerCompare,
  IntegerGt,
  IntegerGte,
  IntegerLt,
  IntegerLte,
  IntegerEq,
  IntegerNeq,
  IntegerMin,
  IntegerMax,
  IntegerClamp,
};
