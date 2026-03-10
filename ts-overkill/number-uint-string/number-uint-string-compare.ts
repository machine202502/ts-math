import {
  NumericalCompared,
  NumericalDigitChar,
  NumericalUintStringTuple,
} from "../common/types";
import { NumberUintStringZeroLeftTrim } from "./number-uint-string-trim";

interface NumberUintStringCompareMap {
  "0,0": 0;
  "0,1": -1;
  "0,2": -1;
  "0,3": -1;
  "0,4": -1;
  "0,5": -1;
  "0,6": -1;
  "0,7": -1;
  "0,8": -1;
  "0,9": -1;
  "1,0": 1;
  "1,1": 0;
  "1,2": -1;
  "1,3": -1;
  "1,4": -1;
  "1,5": -1;
  "1,6": -1;
  "1,7": -1;
  "1,8": -1;
  "1,9": -1;
  "2,0": 1;
  "2,1": 1;
  "2,2": 0;
  "2,3": -1;
  "2,4": -1;
  "2,5": -1;
  "2,6": -1;
  "2,7": -1;
  "2,8": -1;
  "2,9": -1;
  "3,0": 1;
  "3,1": 1;
  "3,2": 1;
  "3,3": 0;
  "3,4": -1;
  "3,5": -1;
  "3,6": -1;
  "3,7": -1;
  "3,8": -1;
  "3,9": -1;
  "4,0": 1;
  "4,1": 1;
  "4,2": 1;
  "4,3": 1;
  "4,4": 0;
  "4,5": -1;
  "4,6": -1;
  "4,7": -1;
  "4,8": -1;
  "4,9": -1;
  "5,0": 1;
  "5,1": 1;
  "5,2": 1;
  "5,3": 1;
  "5,4": 1;
  "5,5": 0;
  "5,6": -1;
  "5,7": -1;
  "5,8": -1;
  "5,9": -1;
  "6,0": 1;
  "6,1": 1;
  "6,2": 1;
  "6,3": 1;
  "6,4": 1;
  "6,5": 1;
  "6,6": 0;
  "6,7": -1;
  "6,8": -1;
  "6,9": -1;
  "7,0": 1;
  "7,1": 1;
  "7,2": 1;
  "7,3": 1;
  "7,4": 1;
  "7,5": 1;
  "7,6": 1;
  "7,7": 0;
  "7,8": -1;
  "7,9": -1;
  "8,0": 1;
  "8,1": 1;
  "8,2": 1;
  "8,3": 1;
  "8,4": 1;
  "8,5": 1;
  "8,6": 1;
  "8,7": 1;
  "8,8": 0;
  "8,9": -1;
  "9,0": 1;
  "9,1": 1;
  "9,2": 1;
  "9,3": 1;
  "9,4": 1;
  "9,5": 1;
  "9,6": 1;
  "9,7": 1;
  "9,8": 1;
  "9,9": 0;
}

type _NumberUintStringTupleCompare<
  LNT extends NumericalUintStringTuple,
  RNT extends NumericalUintStringTuple,
  BC extends NumericalCompared,
> = [LNT, RNT] extends [
  [
    ...infer LNTRest extends NumericalUintStringTuple,
    infer LNTDigit extends NumericalDigitChar,
  ],
  [
    ...infer RNTRest extends NumericalUintStringTuple,
    infer RNTDigit extends NumericalDigitChar,
  ],
]
  ? NumberUintStringCompareMap[`${LNTDigit},${RNTDigit}`] extends infer RC extends
      NumericalCompared
    ? RC extends 0
      ? _NumberUintStringTupleCompare<LNTRest, RNTRest, BC>
      : _NumberUintStringTupleCompare<LNTRest, RNTRest, RC>
    : BC
  : NumberUintStringZeroLeftTrim<[...LNT, ...RNT]> extends []
    ? BC
    : RNT extends []
      ? 1
      : -1;

type NumberUintStringTupleCompare<
  LNT extends NumericalUintStringTuple,
  RNT extends NumericalUintStringTuple,
> = _NumberUintStringTupleCompare<LNT, RNT, 0>;

export { NumberUintStringCompareMap };
export { NumberUintStringTupleCompare };
