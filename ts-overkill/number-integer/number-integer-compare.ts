import { NumericalSign, NumericalUintStringTuple } from "../common/types";
import { NumberUintStringToTuple } from "../number-uint-string/number-uint-string-conversion";
import { NumberUintStringTupleCompare } from "../number-uint-string/number-uint-string-compare";
import { Trunc } from "../number/number";

type NumberIntegerCompare<L extends number, R extends number> = [
  NumberUintStringToTuple<L>,
  NumberUintStringToTuple<R>,
] extends [
  [
    infer LSign extends NumericalSign,
    infer LTuple extends NumericalUintStringTuple,
  ],
  [
    infer RSign extends NumericalSign,
    infer RTuple extends NumericalUintStringTuple,
  ],
]
  ? [LSign, RSign] extends [-1, 0] | [-1, 1] | [0, 1]
    ? -1
    : [LSign, RSign] extends [1, -1] | [1, 0] | [0, -1]
      ? 1
      : [LSign, RSign] extends [1, 1]
        ? NumberUintStringTupleCompare<LTuple, RTuple>
        : NumberUintStringTupleCompare<RTuple, LTuple>
  : 0;

type NumberIntegerGt<L extends number, R extends number> =
  NumberIntegerCompare<L, R> extends 1 ? true : false;

type NumberIntegerGte<L extends number, R extends number> =
  NumberIntegerCompare<L, R> extends 1 | 0 ? true : false;

type NumberIntegerLt<L extends number, R extends number> =
  NumberIntegerCompare<L, R> extends -1 ? true : false;

type NumberIntegerLte<L extends number, R extends number> =
  NumberIntegerCompare<L, R> extends -1 | 0 ? true : false;

type NumberIntegerEq<L extends number, R extends number> =
  NumberIntegerCompare<L, R> extends 0 ? true : false;

type NumberIntegerNeq<L extends number, R extends number> =
  NumberIntegerCompare<L, R> extends 1 | -1 ? true : false;

type NumberIntegerMin<L extends number, R extends number> =
  NumberIntegerLt<L, R> extends true ? Trunc<L> : Trunc<R>;

type NumberIntegerMax<L extends number, R extends number> =
  NumberIntegerGt<L, R> extends true ? Trunc<L> : Trunc<R>;

type NumberIntegerClamp<
  N extends number,
  Min extends number,
  Max extends number,
> = NumberIntegerMax<NumberIntegerMin<N, Max>, Min>;

export {
  NumberIntegerCompare,
  NumberIntegerGt,
  NumberIntegerGte,
  NumberIntegerLt,
  NumberIntegerLte,
  NumberIntegerEq,
  NumberIntegerNeq,
  NumberIntegerMin,
  NumberIntegerMax,
  NumberIntegerClamp,
};
