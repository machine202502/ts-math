import {
  NumericalSign,
  NumericalUintStringTuple,
  NumericalDigitChar,
} from "../common/types";
import { Signed, NumberParts } from "../number/number";
import { StringToTuple } from "../string/string";
import { NumberUintStringZeroLeftTrim } from "./number-uint-string-trim";

type NumberUintStringToTuple<N extends number> =
  NumberParts<N> extends [
    infer NSign extends NumericalSign,
    infer NAbs extends number,
    number,
  ]
    ? [sing: NSign, tuple: StringToTuple<`${NAbs}`>]
    : [0, 0];

type _NumberUintStringTupleToNumber<
  NT extends NumericalUintStringTuple,
  NS extends string,
> = NT extends []
  ? NS extends `${infer N extends number}`
    ? N
    : 0
  : NT extends [
        infer NTDigit extends NumericalDigitChar,
        ...infer NTRest extends NumericalUintStringTuple,
      ]
    ? _NumberUintStringTupleToNumber<NTRest, `${NS}${NTDigit}`>
    : 0;

type NumberUintStringTupleToNumber<
  T extends [sign: NumericalSign, tuple: NumericalUintStringTuple],
> = Signed<
  _NumberUintStringTupleToNumber<NumberUintStringZeroLeftTrim<T[1]>, "">,
  T[0]
>;

export { NumberUintStringToTuple, NumberUintStringTupleToNumber };
