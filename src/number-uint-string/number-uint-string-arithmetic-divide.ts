import { NumericalUintStringTuple } from "../common/types";
import { NumberUintStringTupleCompare } from "./number-uint-string-compare";
import { NumberUintStringTupleAdd } from "./number-uint-string-arithmetic-add";
import { NumberUintStringTupleSubtract } from "./number-uint-string-arithmetic-subtract";
import { NumberUintStringTupleMultiply } from "./number-uint-string-arithmetic-multiply";
import { NumberUintStringTupleHalf } from "./number-uint-string-arithmetic-half";
import { NumberUintStringZeroLeftTrim } from "./number-uint-string-trim";

type _NumberUintStringTupleDivideBinary<
  LNT extends NumericalUintStringTuple,
  RNT extends NumericalUintStringTuple,
  LowNT extends NumericalUintStringTuple,
  HighNT extends NumericalUintStringTuple,
> =
  NumberUintStringTupleCompare<LowNT, HighNT> extends 0 | -1
    ? NumberUintStringTupleHalf<
        NumberUintStringTupleAdd<LowNT, HighNT>
      > extends infer MidNT extends NumericalUintStringTuple
      ? NumberUintStringTupleMultiply<
          MidNT,
          RNT
        > extends infer MultipliedNT extends NumericalUintStringTuple
        ? NumberUintStringTupleCompare<MultipliedNT, LNT> extends 0 | -1
          ? _NumberUintStringTupleDivideBinary<
              LNT,
              RNT,
              NumberUintStringTupleAdd<MidNT, ["1"]>,
              HighNT
            >
          : _NumberUintStringTupleDivideBinary<
              LNT,
              RNT,
              LowNT,
              NumberUintStringTupleSubtract<MidNT, ["1"]>
            >
        : never
      : never
    : [
        quotient: HighNT,
        remainder: NumberUintStringZeroLeftTrim<
          NumberUintStringTupleSubtract<
            LNT,
            NumberUintStringTupleMultiply<HighNT, RNT>
          >
        >,
      ];

type NumberUintStringTupleDivide<
  LNT extends NumericalUintStringTuple,
  RNT extends NumericalUintStringTuple,
> =
  NumberUintStringTupleCompare<RNT, ["0"]> extends 0
    ? null
    : _NumberUintStringTupleDivideBinary<LNT, RNT, ["0"], LNT>;

export { NumberUintStringTupleDivide };
