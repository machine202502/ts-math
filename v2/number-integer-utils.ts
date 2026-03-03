import * as Number from "./number";
import * as Utils from "./utils";

interface IntegerDigitCompareMap {
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

type _IntegerStringToDigitTupleExtractDigit<D extends Utils.Digit> =
  `${D}${string}`;

type IntegerToDigitTupleDeleteDigit<S extends string> =
  S extends `${Utils.Digit}${infer S}` ? S : "";

type _IntegerStringToDigitTuple<
  NS extends string,
  T extends Utils.Digit[],
> = NS extends ""
  ? T
  : NS extends _IntegerStringToDigitTupleExtractDigit<infer D>
    ? _IntegerStringToDigitTuple<IntegerToDigitTupleDeleteDigit<NS>, [...T, D]>
    : [];

type IntegerToDigitTuple<N extends number> = _IntegerStringToDigitTuple<
  `${Number.Abs<N>}`,
  []
>;

type _IntegerFromDigitTupleInfer<N extends number> = `${N}`;

type _IntegerFromDigitTuple<
  TN extends Utils.Digit[],
  NS extends string,
> = TN extends []
  ? NS extends _IntegerFromDigitTupleInfer<infer N>
    ? N
    : 0
  : TN extends [infer NV, ...infer TNR]
    ? NV extends Utils.Digit
      ? TNR extends Utils.Digit[]
        ? `${NS}${NV}` extends `0${string}`
          ? _IntegerFromDigitTuple<TNR, NS>
          : _IntegerFromDigitTuple<TNR, `${NS}${NV}`>
        : 0
      : 0
    : 0;

type IntegerFromDigitTuple<
  N extends Utils.Digit[],
  IsNegate extends boolean = false,
> = IsNegate extends true
  ? Number.Negate<_IntegerFromDigitTuple<N, "">>
  : _IntegerFromDigitTuple<N, "">;

type _IntegerDigitTupleCompare<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
  BS extends Utils.Compared,
> = TL extends []
  ? TR extends []
    ? BS
    : -1
  : TR extends []
    ? 1
    : TL extends [...infer TLR, infer TLV]
      ? TR extends [...infer TRR, infer TRV]
        ? TLR extends Utils.Digit[]
          ? TRR extends Utils.Digit[]
            ? TLV extends Utils.Digit
              ? TRV extends Utils.Digit
                ? IntegerDigitCompareMap[`${TLV},${TRV}`] extends infer CR
                  ? CR extends Utils.Compared
                    ? CR extends 0
                      ? _IntegerDigitTupleCompare<TLR, TRR, BS>
                      : _IntegerDigitTupleCompare<TLR, TRR, CR>
                    : 0
                  : 0
                : 0
              : 0
            : 0
          : 0
        : 0
      : 0;

type IntegerDigitTupleCompare<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
> = _IntegerDigitTupleCompare<TL, TR, 0>;

interface IntegerAddMap {
  "0,0,0": [0, 0];
  "0,0,1": [0, 1];
  "0,1,0": [0, 1];
  "0,1,1": [0, 2];
  "0,2,0": [0, 2];
  "0,2,1": [0, 3];
  "0,3,0": [0, 3];
  "0,3,1": [0, 4];
  "0,4,0": [0, 4];
  "0,4,1": [0, 5];
  "0,5,0": [0, 5];
  "0,5,1": [0, 6];
  "0,6,0": [0, 6];
  "0,6,1": [0, 7];
  "0,7,0": [0, 7];
  "0,7,1": [0, 8];
  "0,8,0": [0, 8];
  "0,8,1": [0, 9];
  "0,9,0": [0, 9];
  "0,9,1": [1, 0];
  "1,0,0": [0, 1];
  "1,0,1": [0, 2];
  "1,1,0": [0, 2];
  "1,1,1": [0, 3];
  "1,2,0": [0, 3];
  "1,2,1": [0, 4];
  "1,3,0": [0, 4];
  "1,3,1": [0, 5];
  "1,4,0": [0, 5];
  "1,4,1": [0, 6];
  "1,5,0": [0, 6];
  "1,5,1": [0, 7];
  "1,6,0": [0, 7];
  "1,6,1": [0, 8];
  "1,7,0": [0, 8];
  "1,7,1": [0, 9];
  "1,8,0": [0, 9];
  "1,8,1": [1, 0];
  "1,9,0": [1, 0];
  "1,9,1": [1, 1];
  "2,0,0": [0, 2];
  "2,0,1": [0, 3];
  "2,1,0": [0, 3];
  "2,1,1": [0, 4];
  "2,2,0": [0, 4];
  "2,2,1": [0, 5];
  "2,3,0": [0, 5];
  "2,3,1": [0, 6];
  "2,4,0": [0, 6];
  "2,4,1": [0, 7];
  "2,5,0": [0, 7];
  "2,5,1": [0, 8];
  "2,6,0": [0, 8];
  "2,6,1": [0, 9];
  "2,7,0": [0, 9];
  "2,7,1": [1, 0];
  "2,8,0": [1, 0];
  "2,8,1": [1, 1];
  "2,9,0": [1, 1];
  "2,9,1": [1, 2];
  "3,0,0": [0, 3];
  "3,0,1": [0, 4];
  "3,1,0": [0, 4];
  "3,1,1": [0, 5];
  "3,2,0": [0, 5];
  "3,2,1": [0, 6];
  "3,3,0": [0, 6];
  "3,3,1": [0, 7];
  "3,4,0": [0, 7];
  "3,4,1": [0, 8];
  "3,5,0": [0, 8];
  "3,5,1": [0, 9];
  "3,6,0": [0, 9];
  "3,6,1": [1, 0];
  "3,7,0": [1, 0];
  "3,7,1": [1, 1];
  "3,8,0": [1, 1];
  "3,8,1": [1, 2];
  "3,9,0": [1, 2];
  "3,9,1": [1, 3];
  "4,0,0": [0, 4];
  "4,0,1": [0, 5];
  "4,1,0": [0, 5];
  "4,1,1": [0, 6];
  "4,2,0": [0, 6];
  "4,2,1": [0, 7];
  "4,3,0": [0, 7];
  "4,3,1": [0, 8];
  "4,4,0": [0, 8];
  "4,4,1": [0, 9];
  "4,5,0": [0, 9];
  "4,5,1": [1, 0];
  "4,6,0": [1, 0];
  "4,6,1": [1, 1];
  "4,7,0": [1, 1];
  "4,7,1": [1, 2];
  "4,8,0": [1, 2];
  "4,8,1": [1, 3];
  "4,9,0": [1, 3];
  "4,9,1": [1, 4];
  "5,0,0": [0, 5];
  "5,0,1": [0, 6];
  "5,1,0": [0, 6];
  "5,1,1": [0, 7];
  "5,2,0": [0, 7];
  "5,2,1": [0, 8];
  "5,3,0": [0, 8];
  "5,3,1": [0, 9];
  "5,4,0": [0, 9];
  "5,4,1": [1, 0];
  "5,5,0": [1, 0];
  "5,5,1": [1, 1];
  "5,6,0": [1, 1];
  "5,6,1": [1, 2];
  "5,7,0": [1, 2];
  "5,7,1": [1, 3];
  "5,8,0": [1, 3];
  "5,8,1": [1, 4];
  "5,9,0": [1, 4];
  "5,9,1": [1, 5];
  "6,0,0": [0, 6];
  "6,0,1": [0, 7];
  "6,1,0": [0, 7];
  "6,1,1": [0, 8];
  "6,2,0": [0, 8];
  "6,2,1": [0, 9];
  "6,3,0": [0, 9];
  "6,3,1": [1, 0];
  "6,4,0": [1, 0];
  "6,4,1": [1, 1];
  "6,5,0": [1, 1];
  "6,5,1": [1, 2];
  "6,6,0": [1, 2];
  "6,6,1": [1, 3];
  "6,7,0": [1, 3];
  "6,7,1": [1, 4];
  "6,8,0": [1, 4];
  "6,8,1": [1, 5];
  "6,9,0": [1, 5];
  "6,9,1": [1, 6];
  "7,0,0": [0, 7];
  "7,0,1": [0, 8];
  "7,1,0": [0, 8];
  "7,1,1": [0, 9];
  "7,2,0": [0, 9];
  "7,2,1": [1, 0];
  "7,3,0": [1, 0];
  "7,3,1": [1, 1];
  "7,4,0": [1, 1];
  "7,4,1": [1, 2];
  "7,5,0": [1, 2];
  "7,5,1": [1, 3];
  "7,6,0": [1, 3];
  "7,6,1": [1, 4];
  "7,7,0": [1, 4];
  "7,7,1": [1, 5];
  "7,8,0": [1, 5];
  "7,8,1": [1, 6];
  "7,9,0": [1, 6];
  "7,9,1": [1, 7];
  "8,0,0": [0, 8];
  "8,0,1": [0, 9];
  "8,1,0": [0, 9];
  "8,1,1": [1, 0];
  "8,2,0": [1, 0];
  "8,2,1": [1, 1];
  "8,3,0": [1, 1];
  "8,3,1": [1, 2];
  "8,4,0": [1, 2];
  "8,4,1": [1, 3];
  "8,5,0": [1, 3];
  "8,5,1": [1, 4];
  "8,6,0": [1, 4];
  "8,6,1": [1, 5];
  "8,7,0": [1, 5];
  "8,7,1": [1, 6];
  "8,8,0": [1, 6];
  "8,8,1": [1, 7];
  "8,9,0": [1, 7];
  "8,9,1": [1, 8];
  "9,0,0": [0, 9];
  "9,0,1": [1, 0];
  "9,1,0": [1, 0];
  "9,1,1": [1, 1];
  "9,2,0": [1, 1];
  "9,2,1": [1, 2];
  "9,3,0": [1, 2];
  "9,3,1": [1, 3];
  "9,4,0": [1, 3];
  "9,4,1": [1, 4];
  "9,5,0": [1, 4];
  "9,5,1": [1, 5];
  "9,6,0": [1, 5];
  "9,6,1": [1, 6];
  "9,7,0": [1, 6];
  "9,7,1": [1, 7];
  "9,8,0": [1, 7];
  "9,8,1": [1, 8];
  "9,9,0": [1, 8];
  "9,9,1": [1, 9];
}

type _IntegerDigitTupleAddFinally<
  TF extends Utils.Digit[],
  TRs extends Utils.Digit[],
  RR extends 0 | 1,
> = RR extends 0
  ? [...TF, ...TRs]
  : TF extends []
    ? [1, ...TRs]
    : _IntegerDigitTupleAdd<TF, [1], TRs, 0>;

type _IntegerDigitTupleAdd<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
  TRs extends Utils.Digit[],
  RR extends 0 | 1,
> = TL extends []
  ? _IntegerDigitTupleAddFinally<TR, TRs, RR>
  : TR extends []
    ? _IntegerDigitTupleAddFinally<TL, TRs, RR>
    : TL extends [...infer TLR, infer TLV]
      ? TR extends [...infer TRR, infer TRV]
        ? TLR extends Utils.Digit[]
          ? TRR extends Utils.Digit[]
            ? TLV extends Utils.Digit
              ? TRV extends Utils.Digit
                ? IntegerAddMap[`${TLV},${TRV},${RR}`] extends [
                    infer ARR,
                    infer ARD,
                  ]
                  ? ARD extends Utils.Digit
                    ? ARR extends 0 | 1
                      ? _IntegerDigitTupleAdd<TLR, TRR, [ARD, ...TRs], ARR>
                      : []
                    : []
                  : []
                : []
              : []
            : []
          : []
        : []
      : [];

type IntegerDigitTupleAdd<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
> = _IntegerDigitTupleAdd<TL, TR, [], 0>;

interface IntegerSubtractMap {
  "0,0,0": [0, 0];
  "0,0,1": [1, 9];
  "0,1,0": [1, 9];
  "0,1,1": [1, 8];
  "0,2,0": [1, 8];
  "0,2,1": [1, 7];
  "0,3,0": [1, 7];
  "0,3,1": [1, 6];
  "0,4,0": [1, 6];
  "0,4,1": [1, 5];
  "0,5,0": [1, 5];
  "0,5,1": [1, 4];
  "0,6,0": [1, 4];
  "0,6,1": [1, 3];
  "0,7,0": [1, 3];
  "0,7,1": [1, 2];
  "0,8,0": [1, 2];
  "0,8,1": [1, 1];
  "0,9,0": [1, 1];
  "0,9,1": [1, 0];

  "1,0,0": [0, 1];
  "1,0,1": [0, 0];
  "1,1,0": [0, 0];
  "1,1,1": [1, 9];
  "1,2,0": [1, 9];
  "1,2,1": [1, 8];
  "1,3,0": [1, 8];
  "1,3,1": [1, 7];
  "1,4,0": [1, 7];
  "1,4,1": [1, 6];
  "1,5,0": [1, 6];
  "1,5,1": [1, 5];
  "1,6,0": [1, 5];
  "1,6,1": [1, 4];
  "1,7,0": [1, 4];
  "1,7,1": [1, 3];
  "1,8,0": [1, 3];
  "1,8,1": [1, 2];
  "1,9,0": [1, 2];
  "1,9,1": [1, 1];

  "2,0,0": [0, 2];
  "2,0,1": [0, 1];
  "2,1,0": [0, 1];
  "2,1,1": [0, 0];
  "2,2,0": [0, 0];
  "2,2,1": [1, 9];
  "2,3,0": [1, 9];
  "2,3,1": [1, 8];
  "2,4,0": [1, 8];
  "2,4,1": [1, 7];
  "2,5,0": [1, 7];
  "2,5,1": [1, 6];
  "2,6,0": [1, 6];
  "2,6,1": [1, 5];
  "2,7,0": [1, 5];
  "2,7,1": [1, 4];
  "2,8,0": [1, 4];
  "2,8,1": [1, 3];
  "2,9,0": [1, 3];
  "2,9,1": [1, 2];

  "3,0,0": [0, 3];
  "3,0,1": [0, 2];
  "3,1,0": [0, 2];
  "3,1,1": [0, 1];
  "3,2,0": [0, 1];
  "3,2,1": [0, 0];
  "3,3,0": [0, 0];
  "3,3,1": [1, 9];
  "3,4,0": [1, 9];
  "3,4,1": [1, 8];
  "3,5,0": [1, 8];
  "3,5,1": [1, 7];
  "3,6,0": [1, 7];
  "3,6,1": [1, 6];
  "3,7,0": [1, 6];
  "3,7,1": [1, 5];
  "3,8,0": [1, 5];
  "3,8,1": [1, 4];
  "3,9,0": [1, 4];
  "3,9,1": [1, 3];

  "4,0,0": [0, 4];
  "4,0,1": [0, 3];
  "4,1,0": [0, 3];
  "4,1,1": [0, 2];
  "4,2,0": [0, 2];
  "4,2,1": [0, 1];
  "4,3,0": [0, 1];
  "4,3,1": [0, 0];
  "4,4,0": [0, 0];
  "4,4,1": [1, 9];
  "4,5,0": [1, 9];
  "4,5,1": [1, 8];
  "4,6,0": [1, 8];
  "4,6,1": [1, 7];
  "4,7,0": [1, 7];
  "4,7,1": [1, 6];
  "4,8,0": [1, 6];
  "4,8,1": [1, 5];
  "4,9,0": [1, 5];
  "4,9,1": [1, 4];

  "5,0,0": [0, 5];
  "5,0,1": [0, 4];
  "5,1,0": [0, 4];
  "5,1,1": [0, 3];
  "5,2,0": [0, 3];
  "5,2,1": [0, 2];
  "5,3,0": [0, 2];
  "5,3,1": [0, 1];
  "5,4,0": [0, 1];
  "5,4,1": [0, 0];
  "5,5,0": [0, 0];
  "5,5,1": [1, 9];
  "5,6,0": [1, 9];
  "5,6,1": [1, 8];
  "5,7,0": [1, 8];
  "5,7,1": [1, 7];
  "5,8,0": [1, 7];
  "5,8,1": [1, 6];
  "5,9,0": [1, 6];
  "5,9,1": [1, 5];

  "6,0,0": [0, 6];
  "6,0,1": [0, 5];
  "6,1,0": [0, 5];
  "6,1,1": [0, 4];
  "6,2,0": [0, 4];
  "6,2,1": [0, 3];
  "6,3,0": [0, 3];
  "6,3,1": [0, 2];
  "6,4,0": [0, 2];
  "6,4,1": [0, 1];
  "6,5,0": [0, 1];
  "6,5,1": [0, 0];
  "6,6,0": [0, 0];
  "6,6,1": [1, 9];
  "6,7,0": [1, 9];
  "6,7,1": [1, 8];
  "6,8,0": [1, 8];
  "6,8,1": [1, 7];
  "6,9,0": [1, 7];
  "6,9,1": [1, 6];

  "7,0,0": [0, 7];
  "7,0,1": [0, 6];
  "7,1,0": [0, 6];
  "7,1,1": [0, 5];
  "7,2,0": [0, 5];
  "7,2,1": [0, 4];
  "7,3,0": [0, 4];
  "7,3,1": [0, 3];
  "7,4,0": [0, 3];
  "7,4,1": [0, 2];
  "7,5,0": [0, 2];
  "7,5,1": [0, 1];
  "7,6,0": [0, 1];
  "7,6,1": [0, 0];
  "7,7,0": [0, 0];
  "7,7,1": [1, 9];
  "7,8,0": [1, 9];
  "7,8,1": [1, 8];
  "7,9,0": [1, 8];
  "7,9,1": [1, 7];

  "8,0,0": [0, 8];
  "8,0,1": [0, 7];
  "8,1,0": [0, 7];
  "8,1,1": [0, 6];
  "8,2,0": [0, 6];
  "8,2,1": [0, 5];
  "8,3,0": [0, 5];
  "8,3,1": [0, 4];
  "8,4,0": [0, 4];
  "8,4,1": [0, 3];
  "8,5,0": [0, 3];
  "8,5,1": [0, 2];
  "8,6,0": [0, 2];
  "8,6,1": [0, 1];
  "8,7,0": [0, 1];
  "8,7,1": [0, 0];
  "8,8,0": [0, 0];
  "8,8,1": [1, 9];
  "8,9,0": [1, 9];
  "8,9,1": [1, 8];

  "9,0,0": [0, 9];
  "9,0,1": [0, 8];
  "9,1,0": [0, 8];
  "9,1,1": [0, 7];
  "9,2,0": [0, 7];
  "9,2,1": [0, 6];
  "9,3,0": [0, 6];
  "9,3,1": [0, 5];
  "9,4,0": [0, 5];
  "9,4,1": [0, 4];
  "9,5,0": [0, 4];
  "9,5,1": [0, 3];
  "9,6,0": [0, 3];
  "9,6,1": [0, 2];
  "9,7,0": [0, 2];
  "9,7,1": [0, 1];
  "9,8,0": [0, 1];
  "9,8,1": [0, 0];
  "9,9,0": [0, 0];
  "9,9,1": [1, 9];
}

type _IntegerDigitTupleSubtractFinally<
  TF extends Utils.Digit[],
  TRs extends Utils.Digit[],
  RR extends 0 | 1,
> = RR extends 0
  ? [...TF, ...TRs]
  : TF extends []
    ? []
    : _IntegerDigitTupleSubtract<TF, [1], TRs, 0>;

type _IntegerDigitTupleSubtract<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
  TRs extends Utils.Digit[],
  RR extends 0 | 1,
> = TL extends []
  ? _IntegerDigitTupleSubtractFinally<TR, TRs, RR>
  : TR extends []
    ? _IntegerDigitTupleSubtractFinally<TL, TRs, RR>
    : TL extends [...infer TLR, infer TLV]
      ? TR extends [...infer TRR, infer TRV]
        ? TLR extends Utils.Digit[]
          ? TRR extends Utils.Digit[]
            ? TLV extends Utils.Digit
              ? TRV extends Utils.Digit
                ? IntegerSubtractMap[`${TLV},${TRV},${RR}`] extends [
                    infer ARR,
                    infer ARD,
                  ]
                  ? ARD extends Utils.Digit
                    ? ARR extends 0 | 1
                      ? _IntegerDigitTupleSubtract<TLR, TRR, [ARD, ...TRs], ARR>
                      : []
                    : []
                  : []
                : []
              : []
            : []
          : []
        : []
      : [];

type IntegerDigitTupleSubtract<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
> = _IntegerDigitTupleSubtract<TL, TR, [], 0>;

interface IntegerMultiplyMap {
  "0,0": [0, 0];
  "0,1": [0, 0];
  "0,2": [0, 0];
  "0,3": [0, 0];
  "0,4": [0, 0];
  "0,5": [0, 0];
  "0,6": [0, 0];
  "0,7": [0, 0];
  "0,8": [0, 0];
  "0,9": [0, 0];

  "1,0": [0, 0];
  "1,1": [0, 1];
  "1,2": [0, 2];
  "1,3": [0, 3];
  "1,4": [0, 4];
  "1,5": [0, 5];
  "1,6": [0, 6];
  "1,7": [0, 7];
  "1,8": [0, 8];
  "1,9": [0, 9];

  "2,0": [0, 0];
  "2,1": [0, 2];
  "2,2": [0, 4];
  "2,3": [0, 6];
  "2,4": [0, 8];
  "2,5": [1, 0];
  "2,6": [1, 2];
  "2,7": [1, 4];
  "2,8": [1, 6];
  "2,9": [1, 8];

  "3,0": [0, 0];
  "3,1": [0, 3];
  "3,2": [0, 6];
  "3,3": [0, 9];
  "3,4": [1, 2];
  "3,5": [1, 5];
  "3,6": [1, 8];
  "3,7": [2, 1];
  "3,8": [2, 4];
  "3,9": [2, 7];

  "4,0": [0, 0];
  "4,1": [0, 4];
  "4,2": [0, 8];
  "4,3": [1, 2];
  "4,4": [1, 6];
  "4,5": [2, 0];
  "4,6": [2, 4];
  "4,7": [2, 8];
  "4,8": [3, 2];
  "4,9": [3, 6];

  "5,0": [0, 0];
  "5,1": [0, 5];
  "5,2": [1, 0];
  "5,3": [1, 5];
  "5,4": [2, 0];
  "5,5": [2, 5];
  "5,6": [3, 0];
  "5,7": [3, 5];
  "5,8": [4, 0];
  "5,9": [4, 5];

  "6,0": [0, 0];
  "6,1": [0, 6];
  "6,2": [1, 2];
  "6,3": [1, 8];
  "6,4": [2, 4];
  "6,5": [3, 0];
  "6,6": [3, 6];
  "6,7": [4, 2];
  "6,8": [4, 8];
  "6,9": [5, 4];

  "7,0": [0, 0];
  "7,1": [0, 7];
  "7,2": [1, 4];
  "7,3": [2, 1];
  "7,4": [2, 8];
  "7,5": [3, 5];
  "7,6": [4, 2];
  "7,7": [4, 9];
  "7,8": [5, 6];
  "7,9": [6, 3];

  "8,0": [0, 0];
  "8,1": [0, 8];
  "8,2": [1, 6];
  "8,3": [2, 4];
  "8,4": [3, 2];
  "8,5": [4, 0];
  "8,6": [4, 8];
  "8,7": [5, 6];
  "8,8": [6, 4];
  "8,9": [7, 2];

  "9,0": [0, 0];
  "9,1": [0, 9];
  "9,2": [1, 8];
  "9,3": [2, 7];
  "9,4": [3, 6];
  "9,5": [4, 5];
  "9,6": [5, 4];
  "9,7": [6, 3];
  "9,8": [7, 2];
  "9,9": [8, 1];
}

type _IntegerDigitTupleMultiplyOnDigitSum<
  L extends Utils.Digit,
  R extends Utils.Digit,
> =
  IntegerDigitTupleAdd<[L], [R]> extends infer SR
    ? SR extends Utils.Digit[]
      ? SR extends [Utils.Digit]
        ? [0, SR[0]]
        : SR
      : []
    : [];

type _IntegerDigitTupleMultiplyOnDigitFilterZero<TF extends Utils.Digit[]> =
  TF extends []
    ? []
    : TF extends [Utils.Digit]
      ? TF
      : TF extends [0, ...infer TFs]
        ? TFs extends Utils.Digit[]
          ? _IntegerDigitTupleMultiplyOnDigitFilterZero<TFs>
          : []
        : TF;

type _IntegerDigitTupleMultiplyOnDigit<
  TL extends Utils.Digit[],
  R extends Utils.Digit,
  TRs extends Utils.Digit[],
  RR extends Utils.Digit,
> = TL extends []
  ? _IntegerDigitTupleMultiplyOnDigitFilterZero<[RR, ...TRs]>
  : TL extends [...infer TLR, infer TLV]
    ? TLR extends Utils.Digit[]
      ? TLV extends Utils.Digit
        ? IntegerMultiplyMap[`${TLV},${R}`] extends [infer ARR, infer ARD]
          ? ARD extends Utils.Digit
            ? ARR extends Utils.Digit
              ? _IntegerDigitTupleMultiplyOnDigitSum<ARD, RR> extends [
                  infer SDA,
                  infer SDD,
                ]
                ? SDA extends Utils.Digit
                  ? SDD extends Utils.Digit
                    ? _IntegerDigitTupleMultiplyOnDigitSum<
                        ARR,
                        SDA
                      >[1] extends infer LDA
                      ? LDA extends Utils.Digit
                        ? _IntegerDigitTupleMultiplyOnDigit<
                            TLR,
                            R,
                            [SDD, ...TRs],
                            LDA
                          >
                        : []
                      : []
                    : []
                  : []
                : []
              : []
            : []
          : []
        : []
      : []
    : [];

type IntegerDigitTupleMultiplyOnDigit<
  TL extends Utils.Digit[],
  R extends Utils.Digit,
> = _IntegerDigitTupleMultiplyOnDigit<TL, R, [], 0>;

type _IntegerDigitTupleMultiplyEachLOnR<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
  TZ extends 0[],
  TRs extends Utils.Digit[][],
> = TR extends []
  ? TRs
  : TR extends [...infer TRR, infer TRV]
    ? TRR extends Utils.Digit[]
      ? TRV extends Utils.Digit
        ? _IntegerDigitTupleMultiplyEachLOnR<
            TL,
            TRR,
            [0, ...TZ],
            [...TRs, [...IntegerDigitTupleMultiplyOnDigit<TL, TRV>, ...TZ]]
          >
        : []
      : []
    : [];

type _IntegerDigitTupleMultiplyAllSum<
  TA extends Utils.Digit[][],
  TR extends Utils.Digit[],
> = TA extends []
  ? TR
  : TA extends [...infer TAR, infer TAV]
    ? TAR extends Utils.Digit[][]
      ? TAV extends Utils.Digit[]
        ? _IntegerDigitTupleMultiplyAllSum<TAR, IntegerDigitTupleAdd<TR, TAV>>
        : []
      : []
    : [];

type IntegerDigitTupleMultiply<
  TL extends Utils.Digit[],
  TR extends Utils.Digit[],
> = _IntegerDigitTupleMultiplyAllSum<
  _IntegerDigitTupleMultiplyEachLOnR<TL, TR, [], []>,
  [0]
>;

export {
  IntegerToDigitTuple,
  IntegerFromDigitTuple,
  IntegerDigitTupleCompare,
  IntegerDigitTupleAdd,
  IntegerDigitTupleSubtract,
  IntegerDigitTupleMultiplyOnDigit,
  IntegerDigitTupleMultiply,
};
