import { NumericalDigitChar, NumericalUintStringTuple } from "../common/types";
import { NumberUintStringTupleCompare } from "./number-uint-string-compare";
import { NumberUintStringTupleSubtract } from "./number-uint-string-arithmetic-subtract";
import {
  NumberUintZarrMap,
  NumberUintZarrTenMap,
} from "./number-uint-string-zarr-maps";

type _NumberUintStringZarrIterationMethod<
  NT extends NumericalUintStringTuple,
  ZR extends "0"[] = [],
> =
  NumberUintStringTupleCompare<NT, ["0"]> extends 1
    ? _NumberUintStringZarrIterationMethod<
        NumberUintStringTupleSubtract<NT, ["1"]>,
        ["0", ...ZR]
      >
    : ZR;

type NumberUintStringZarrIterationMethod<NT extends NumericalUintStringTuple> =
  _NumberUintStringZarrIterationMethod<NT, []>;

type NumberUintStringZarrFixedMethod<NT extends NumericalUintStringTuple> = [
  ...["0", "0"],
  ...NT,
] extends [
  ...NumericalUintStringTuple,
  infer Tm extends NumericalDigitChar,
  infer Um extends NumericalDigitChar,
]
  ? [...NumberUintZarrTenMap[Tm], ...NumberUintZarrMap[Um]]
  : [];

type NumberUintStringZarr<NT extends NumericalUintStringTuple> =
  NumberUintStringTupleCompare<NT, ["9", "9"]> extends 1
    ? NumberUintStringZarrIterationMethod<NT>
    : NumberUintStringZarrFixedMethod<NT>;

export {
  NumberUintStringZarrIterationMethod,
  NumberUintStringZarrFixedMethod,
  NumberUintStringZarr,
};
