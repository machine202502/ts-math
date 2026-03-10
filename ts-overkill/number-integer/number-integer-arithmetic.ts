import { NumericalSign, NumericalUintStringTuple } from "../common/types";
import {
  NumberUintStringToTuple,
  NumberUintStringTupleToNumber,
} from "../number-uint-string/number-uint-string-conversion";
import { NumberUintStringTupleAdd } from "../number-uint-string/number-uint-string-arithmetic-add";
import { NumberUintStringTupleSubtract } from "../number-uint-string/number-uint-string-arithmetic-subtract";
import { NumberUintStringTupleMultiply } from "../number-uint-string/number-uint-string-arithmetic-multiply";
import { NumberUintStringTupleDivide } from "../number-uint-string/number-uint-string-arithmetic-divide";
import { NumberUintStringTupleCompare } from "../number-uint-string/number-uint-string-compare";
import { NumberUintStringTuplePower } from "../number-uint-string/number-uint-string-arithmetic-power";
import { Negate, Trunc } from "../number/number";
import { IsEven } from "../number/number";
import { NumberUintStringZarr } from "../number-uint-string/number-uint-string-zarr";

type NumberIntegerAdd<L extends number, R extends number> = [
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
  ? [LSign, RSign] extends [0, 1 | -1] | [0, 0]
    ? Trunc<R>
    : [LSign, RSign] extends [1 | -1, 0]
      ? Trunc<L>
      : [LSign, RSign] extends [1, 1] | [-1, -1]
        ? NumberUintStringTupleToNumber<
            [1, NumberUintStringTupleAdd<LTuple, RTuple>]
          >
        : NumberUintStringTupleCompare<LTuple, RTuple> extends 1
          ? NumberUintStringTupleToNumber<
              [LSign, NumberUintStringTupleSubtract<LTuple, RTuple>]
            >
          : NumberUintStringTupleToNumber<
              [RSign, NumberUintStringTupleSubtract<RTuple, LTuple>]
            >
  : 0;

type NumberIntegerSubtract<
  L extends number,
  R extends number,
> = NumberIntegerAdd<L, Negate<R>>;

type NumberIntegerMultiply<L extends number, R extends number> = [
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
  ? [LSign, RSign] extends [0, 0] | [1 | -1, 0] | [0, 1 | -1]
    ? 0
    : [LSign, RSign] extends [1, 1] | [-1, -1]
      ? NumberUintStringTupleToNumber<
          [1, NumberUintStringTupleMultiply<LTuple, RTuple>]
        >
      : NumberUintStringTupleToNumber<
          [-1, NumberUintStringTupleMultiply<LTuple, RTuple>]
        >
  : 0;

type NumberIntegerDivide<L extends number, R extends number> = [
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
  ? [LSign, RSign] extends [0, 0] | [1 | -1, 0]
    ? null
    : [LSign, RSign] extends [0, 1 | -1]
      ? [0, null]
      : NumberUintStringTupleDivide<LTuple, RTuple> extends [
            infer QuotientNT extends NumericalUintStringTuple,
            infer RemainderNT extends NumericalUintStringTuple,
          ]
        ? [LSign, RSign] extends [1, 1] | [-1, -1]
          ? [
              quotient: NumberUintStringTupleToNumber<[1, QuotientNT]>,
              remainder: NumberUintStringTupleToNumber<[LSign, RemainderNT]>,
            ]
          : [
              quotient: NumberUintStringTupleToNumber<[-1, QuotientNT]>,
              remainder: NumberUintStringTupleToNumber<[LSign, RemainderNT]>,
            ]
        : never
  : never;

type NumberIntegerPower<N extends number, P extends number> = [
  NumberUintStringToTuple<N>,
  NumberUintStringToTuple<P>,
] extends [
  [
    infer NSign extends NumericalSign,
    infer NTuple extends NumericalUintStringTuple,
  ],
  [
    infer PSign extends NumericalSign,
    infer PTuple extends NumericalUintStringTuple,
  ],
]
  ? PSign extends -1
    ? null
    : PSign extends 0
      ? 1
      : IsEven<P> extends true
        ? NumberUintStringTupleToNumber<
            [
              1,
              NumberUintStringTuplePower<NTuple, NumberUintStringZarr<PTuple>>,
            ]
          >
        : NumberUintStringTupleToNumber<
            [
              NSign,
              NumberUintStringTuplePower<NTuple, NumberUintStringZarr<PTuple>>,
            ]
          >
  : 0;

export {
  NumberIntegerAdd,
  NumberIntegerSubtract,
  NumberIntegerMultiply,
  NumberIntegerDivide,
  NumberIntegerPower,
};
