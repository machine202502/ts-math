import * as NumberTypes from "./number";
import * as BooleanTypes from "./boolean";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface DigitCompareMap {
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

type _IntegerComparePositiveS2Compare<
  TL extends Digit[],
  TR extends Digit[],
  BS = 0,
> = TL extends []
  ? TR extends []
    ? BS
    : -1
  : TR extends []
    ? 1
    : TL extends [...infer TLR, infer TLV]
      ? TR extends [...infer TRR, infer TRV]
        ? TLR extends Digit[]
          ? TRR extends Digit[]
            ? TLV extends Digit
              ? TRV extends Digit
                ? DigitCompareMap[`${TLV},${TRV}`] extends infer CR
                  ? CR extends 0
                    ? _IntegerComparePositiveS2Compare<TLR, TRR, BS>
                    : _IntegerComparePositiveS2Compare<TLR, TRR, CR>
                  : never
                : never
              : never
            : never
          : never
        : never
      : never;

type _IntegerComparePositiveS1ExtractDigit<D extends Digit> = `${D}${string}`;
type _IntegerComparePositiveS1DeleteDigit<S extends string> =
  S extends `${Digit}${infer S}` ? S : never;

type _IntegerComparePositiveS1StringNumberToTuple<
  NS extends string,
  T extends number[],
> = NS extends ""
  ? T
  : NS extends _IntegerComparePositiveS1ExtractDigit<infer D>
    ? _IntegerComparePositiveS1StringNumberToTuple<
        _IntegerComparePositiveS1DeleteDigit<NS>,
        [...T, D]
      >
    : never;

type _IntegerComparePositive<L extends number, R extends number> =
  _IntegerComparePositiveS1StringNumberToTuple<`${L}`, []> extends infer SL
    ? _IntegerComparePositiveS1StringNumberToTuple<`${R}`, []> extends infer SR
      ? SL extends Digit[]
        ? SR extends Digit[]
          ? _IntegerComparePositiveS2Compare<SL, SR>
          : never
        : never
      : never
    : never;

type _IntegerCompare<L extends number, R extends number> = L extends R
  ? 0
  : [NumberTypes._Sign<L>, NumberTypes._Sign<R>] extends infer S
    ? S extends [-1, 0] | [-1, 1]
      ? -1
      : S extends [1, -1] | [1, 0]
        ? 1
        : S extends [1, 1]
          ? _IntegerComparePositive<L, R>
          : _IntegerComparePositive<NumberTypes.Abs<R>, NumberTypes.Abs<L>>
    : never;

type IntegerCompare<L, R> =
  BooleanTypes.And<
    NumberTypes.IsInteger<L>,
    NumberTypes.IsInteger<R>
  > extends infer Type
    ? Type extends boolean
      ? Type extends true
        ? L extends number
          ? R extends number
            ? _IntegerCompare<L, R>
            : never
          : never
        : never
      : never
    : never;

type IntegerGt<L, R> =
  BooleanTypes.And<
    NumberTypes.IsInteger<L>,
    NumberTypes.IsInteger<R>
  > extends infer Type
    ? Type extends boolean
      ? Type extends true
        ? L extends number
          ? R extends number
            ? _IntegerCompare<L, R> extends 1
              ? true
              : false
            : never
          : never
        : never
      : never
    : never;

type IntegerGte<L, R> =
  BooleanTypes.And<
    NumberTypes.IsInteger<L>,
    NumberTypes.IsInteger<R>
  > extends infer Type
    ? Type extends boolean
      ? Type extends true
        ? L extends number
          ? R extends number
            ? _IntegerCompare<L, R> extends 1 | 0
              ? true
              : false
            : never
          : never
        : never
      : never
    : never;

type IntegerLt<L, R> =
  BooleanTypes.And<
    NumberTypes.IsInteger<L>,
    NumberTypes.IsInteger<R>
  > extends infer Type
    ? Type extends boolean
      ? Type extends true
        ? L extends number
          ? R extends number
            ? _IntegerCompare<L, R> extends -1
              ? true
              : false
            : never
          : never
        : never
      : never
    : never;

type IntegerLte<L, R> =
  BooleanTypes.And<
    NumberTypes.IsInteger<L>,
    NumberTypes.IsInteger<R>
  > extends infer Type
    ? Type extends boolean
      ? Type extends true
        ? L extends number
          ? R extends number
            ? _IntegerCompare<L, R> extends -1 | 0
              ? true
              : false
            : never
          : never
        : never
      : never
    : never;

type IntegerEq<L, R> =
  BooleanTypes.And<
    NumberTypes.IsInteger<L>,
    NumberTypes.IsInteger<R>
  > extends infer Type
    ? Type extends boolean
      ? Type extends true
        ? L extends number
          ? R extends number
            ? L extends R
              ? true
              : false
            : never
          : never
        : never
      : never
    : never;

type IntegerNeq<L, R> =
  BooleanTypes.And<
    NumberTypes.IsInteger<L>,
    NumberTypes.IsInteger<R>
  > extends infer Type
    ? Type extends boolean
      ? Type extends true
        ? L extends number
          ? R extends number
            ? L extends R
              ? false
              : true
            : never
          : never
        : never
      : never
    : never;

export { _IntegerCompare };
export {
  IntegerCompare,
  IntegerGt,
  IntegerGte,
  IntegerLt,
  IntegerLte,
  IntegerEq,
  IntegerNeq,
};
