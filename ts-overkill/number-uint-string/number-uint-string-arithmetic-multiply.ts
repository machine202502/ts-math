import { NumericalDigitChar, NumericalUintStringTuple } from "../common/types";
import {
  NumberUintAddMap,
  NumberUintStringTupleAdd,
} from "./number-uint-string-arithmetic-add";

interface NumberUintMultiplyMap {
  "0,0": ["0", "0"];
  "0,1": ["0", "0"];
  "0,2": ["0", "0"];
  "0,3": ["0", "0"];
  "0,4": ["0", "0"];
  "0,5": ["0", "0"];
  "0,6": ["0", "0"];
  "0,7": ["0", "0"];
  "0,8": ["0", "0"];
  "0,9": ["0", "0"];
  "1,0": ["0", "0"];
  "1,1": ["0", "1"];
  "1,2": ["0", "2"];
  "1,3": ["0", "3"];
  "1,4": ["0", "4"];
  "1,5": ["0", "5"];
  "1,6": ["0", "6"];
  "1,7": ["0", "7"];
  "1,8": ["0", "8"];
  "1,9": ["0", "9"];
  "2,0": ["0", "0"];
  "2,1": ["0", "2"];
  "2,2": ["0", "4"];
  "2,3": ["0", "6"];
  "2,4": ["0", "8"];
  "2,5": ["1", "0"];
  "2,6": ["1", "2"];
  "2,7": ["1", "4"];
  "2,8": ["1", "6"];
  "2,9": ["1", "8"];
  "3,0": ["0", "0"];
  "3,1": ["0", "3"];
  "3,2": ["0", "6"];
  "3,3": ["0", "9"];
  "3,4": ["1", "2"];
  "3,5": ["1", "5"];
  "3,6": ["1", "8"];
  "3,7": ["2", "1"];
  "3,8": ["2", "4"];
  "3,9": ["2", "7"];
  "4,0": ["0", "0"];
  "4,1": ["0", "4"];
  "4,2": ["0", "8"];
  "4,3": ["1", "2"];
  "4,4": ["1", "6"];
  "4,5": ["2", "0"];
  "4,6": ["2", "4"];
  "4,7": ["2", "8"];
  "4,8": ["3", "2"];
  "4,9": ["3", "6"];
  "5,0": ["0", "0"];
  "5,1": ["0", "5"];
  "5,2": ["1", "0"];
  "5,3": ["1", "5"];
  "5,4": ["2", "0"];
  "5,5": ["2", "5"];
  "5,6": ["3", "0"];
  "5,7": ["3", "5"];
  "5,8": ["4", "0"];
  "5,9": ["4", "5"];
  "6,0": ["0", "0"];
  "6,1": ["0", "6"];
  "6,2": ["1", "2"];
  "6,3": ["1", "8"];
  "6,4": ["2", "4"];
  "6,5": ["3", "0"];
  "6,6": ["3", "6"];
  "6,7": ["4", "2"];
  "6,8": ["4", "8"];
  "6,9": ["5", "4"];
  "7,0": ["0", "0"];
  "7,1": ["0", "7"];
  "7,2": ["1", "4"];
  "7,3": ["2", "1"];
  "7,4": ["2", "8"];
  "7,5": ["3", "5"];
  "7,6": ["4", "2"];
  "7,7": ["4", "9"];
  "7,8": ["5", "6"];
  "7,9": ["6", "3"];
  "8,0": ["0", "0"];
  "8,1": ["0", "8"];
  "8,2": ["1", "6"];
  "8,3": ["2", "4"];
  "8,4": ["3", "2"];
  "8,5": ["4", "0"];
  "8,6": ["4", "8"];
  "8,7": ["5", "6"];
  "8,8": ["6", "4"];
  "8,9": ["7", "2"];
  "9,0": ["0", "0"];
  "9,1": ["0", "9"];
  "9,2": ["1", "8"];
  "9,3": ["2", "7"];
  "9,4": ["3", "6"];
  "9,5": ["4", "5"];
  "9,6": ["5", "4"];
  "9,7": ["6", "3"];
  "9,8": ["7", "2"];
  "9,9": ["8", "1"];
}

type _NumberUintStringTupleMultiplyOnDigit<
  LNT extends NumericalUintStringTuple,
  RD extends NumericalDigitChar,
  ResultNT extends NumericalUintStringTuple,
  ResultChargeDigit extends NumericalDigitChar,
> = LNT extends []
  ? [ResultChargeDigit, ...ResultNT]
  : LNT extends [
        ...infer LNTRest extends NumericalUintStringTuple,
        infer LNTDigit extends NumericalDigitChar,
      ]
    ? NumberUintMultiplyMap[`${LNTDigit},${RD}`] extends [
        infer MultiplySecondCharge extends NumericalDigitChar,
        infer MultiplyFirstCharge extends NumericalDigitChar,
      ]
      ? NumberUintAddMap[`${MultiplyFirstCharge},${ResultChargeDigit},0`] extends [
          infer AddCharge extends NumericalDigitChar,
          infer AddDigit extends NumericalDigitChar,
        ]
        ? NumberUintAddMap[`${MultiplySecondCharge},${AddCharge},0`][1] extends infer TwoAddSecondCharge extends
            NumericalDigitChar
          ? _NumberUintStringTupleMultiplyOnDigit<
              LNTRest,
              RD,
              [AddDigit, ...ResultNT],
              TwoAddSecondCharge
            >
          : []
        : []
      : []
    : [];

type NumberUintStringTupleMultiplyOnDigit<
  LNT extends NumericalUintStringTuple,
  RD extends NumericalDigitChar,
> = _NumberUintStringTupleMultiplyOnDigit<LNT, RD, [], "0">;

type _NumberUintStringTupleMultiplyOnEachDigit<
  LNT extends NumericalUintStringTuple,
  RNT extends NumericalUintStringTuple,
  Zarr extends "0"[],
  ResultNT extends NumericalUintStringTuple[],
> = RNT extends [
  ...infer RNTRest extends NumericalUintStringTuple,
  infer RNTDigit extends NumericalDigitChar,
]
  ? _NumberUintStringTupleMultiplyOnEachDigit<
      LNT,
      RNTRest,
      ["0", ...Zarr],
      [
        ...ResultNT,
        [...NumberUintStringTupleMultiplyOnDigit<LNT, RNTDigit>, ...Zarr],
      ]
    >
  : ResultNT;

type NumberUintStringTupleMultiplyOnEachDigit<
  LNT extends NumericalUintStringTuple,
  RNT extends NumericalUintStringTuple,
> = _NumberUintStringTupleMultiplyOnEachDigit<LNT, RNT, [], []>;

type _NumberUintStringTupleAllSum<
  ANT extends NumericalUintStringTuple[],
  ResultNT extends NumericalUintStringTuple,
> = ANT extends [
  ...infer ANTRest extends NumericalUintStringTuple[],
  infer NT extends NumericalUintStringTuple,
]
  ? _NumberUintStringTupleAllSum<
      ANTRest,
      NumberUintStringTupleAdd<ResultNT, NT>
    >
  : ResultNT;

type NumberUintStringTupleMultiply<
  LNT extends NumericalUintStringTuple,
  RNT extends NumericalUintStringTuple,
> = _NumberUintStringTupleAllSum<
  NumberUintStringTupleMultiplyOnEachDigit<LNT, RNT>,
  []
>;

export {
  NumberUintStringTupleMultiplyOnDigit,
  NumberUintStringTupleMultiplyOnEachDigit,
};
export { NumberUintMultiplyMap, NumberUintStringTupleMultiply };
