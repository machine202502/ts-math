import * as Number from "./number";
import * as NumberIntegerCompare from "./number-integer-compare";
import * as NumberIntegerUtils from "./number-integer-utils";
import * as Utils from "./utils";

type IntegerAdd<L extends number, R extends number> =
  Number.Sign<L> extends infer SnL
    ? Number.Sign<R> extends infer SnR
      ? NumberIntegerUtils.IntegerToDigitTuple<L> extends infer TL
        ? NumberIntegerUtils.IntegerToDigitTuple<R> extends infer TR
          ? SnL extends Utils.Signed
            ? SnR extends Utils.Signed
              ? TL extends Utils.Digit[]
                ? TR extends Utils.Digit[]
                  ? [SnL, SnR] extends [0, 0]
                    ? 0
                    : [SnL, SnR] extends [0, 1]
                      ? R
                      : [SnL, SnR] extends [1, 0]
                        ? L
                        : [SnL, SnR] extends [-1, 0]
                          ? L
                          : [SnL, SnR] extends [0, -1]
                            ? R
                            : [SnL, SnR] extends [1, 1] | [-1, -1]
                              ? NumberIntegerUtils.IntegerFromDigitTuple<
                                  NumberIntegerUtils.IntegerDigitTupleAdd<
                                    TL,
                                    TR
                                  >,
                                  NumberIntegerCompare.IntegerEq<SnL, -1>
                                >
                              : [SnL, SnR] extends [1, -1] | [-1, 1]
                                ? NumberIntegerCompare.IntegerGt<
                                    Number.Abs<L>,
                                    Number.Abs<R>
                                  > extends true
                                  ? NumberIntegerUtils.IntegerFromDigitTuple<
                                      NumberIntegerUtils.IntegerDigitTupleSubtract<
                                        TL,
                                        TR
                                      >,
                                      NumberIntegerCompare.IntegerEq<SnL, -1>
                                    >
                                  : NumberIntegerUtils.IntegerFromDigitTuple<
                                      NumberIntegerUtils.IntegerDigitTupleSubtract<
                                        TR,
                                        TL
                                      >,
                                      NumberIntegerCompare.IntegerEq<SnR, -1>
                                    >
                                : 0
                  : 0
                : 0
              : 0
            : 0
          : 0
        : 0
      : 0
    : 0;

type IntegerSubtract<L extends number, R extends number> = IntegerAdd<
  L,
  Number.Negate<R>
>;

type IntegerMultiply<L extends number, R extends number> =
  NumberIntegerUtils.IntegerToDigitTuple<L> extends infer TL
    ? NumberIntegerUtils.IntegerToDigitTuple<R> extends infer TR
      ? TL extends Utils.Digit[]
        ? TR extends Utils.Digit[]
          ? NumberIntegerUtils.IntegerFromDigitTuple<
              NumberIntegerUtils.IntegerDigitTupleMultiply<TL, TR>,
              [Number.Sign<L>, Number.Sign<R>] extends [-1, 1] | [1, -1]
                ? true
                : false
            >
          : 0
        : 0
      : 0
    : 0;

type IntegerHalf<N extends number> = _IntegerHalf<N>;

type _IntegerHalf<N extends number, Acc extends number = 0> =
  NumberIntegerCompare.IntegerGte<N, 8192> extends true
    ? _IntegerHalf<IntegerSubtract<N, 8192>, IntegerAdd<Acc, 4096>>
    : NumberIntegerCompare.IntegerGte<N, 4096> extends true
      ? _IntegerHalf<IntegerSubtract<N, 4096>, IntegerAdd<Acc, 2048>>
      : NumberIntegerCompare.IntegerGte<N, 2048> extends true
        ? _IntegerHalf<IntegerSubtract<N, 2048>, IntegerAdd<Acc, 1024>>
        : NumberIntegerCompare.IntegerGte<N, 1024> extends true
          ? _IntegerHalf<IntegerSubtract<N, 1024>, IntegerAdd<Acc, 512>>
          : NumberIntegerCompare.IntegerGte<N, 512> extends true
            ? _IntegerHalf<IntegerSubtract<N, 512>, IntegerAdd<Acc, 256>>
            : NumberIntegerCompare.IntegerGte<N, 256> extends true
              ? _IntegerHalf<IntegerSubtract<N, 256>, IntegerAdd<Acc, 128>>
              : NumberIntegerCompare.IntegerGte<N, 128> extends true
                ? _IntegerHalf<IntegerSubtract<N, 128>, IntegerAdd<Acc, 64>>
                : NumberIntegerCompare.IntegerGte<N, 64> extends true
                  ? _IntegerHalf<IntegerSubtract<N, 64>, IntegerAdd<Acc, 32>>
                  : NumberIntegerCompare.IntegerGte<N, 32> extends true
                    ? _IntegerHalf<IntegerSubtract<N, 32>, IntegerAdd<Acc, 16>>
                    : NumberIntegerCompare.IntegerGte<N, 16> extends true
                      ? _IntegerHalf<IntegerSubtract<N, 16>, IntegerAdd<Acc, 8>>
                      : NumberIntegerCompare.IntegerGte<N, 8> extends true
                        ? _IntegerHalf<
                            IntegerSubtract<N, 8>,
                            IntegerAdd<Acc, 4>
                          >
                        : NumberIntegerCompare.IntegerGte<N, 4> extends true
                          ? _IntegerHalf<
                              IntegerSubtract<N, 4>,
                              IntegerAdd<Acc, 2>
                            >
                          : NumberIntegerCompare.IntegerGte<N, 2> extends true
                            ? IntegerAdd<Acc, 1>
                            : Acc;

type IntegerMid<L extends number, H extends number> = IntegerHalf<
  IntegerAdd<L, H>
>;

type _IntegerDivideBinary<
  L extends number,
  R extends number,
  Low extends number,
  High extends number,
> =
  NumberIntegerCompare.IntegerLte<Low, High> extends true
    ? IntegerMid<Low, High> extends infer Mid extends number
      ? IntegerMultiply<Mid, R> extends infer Prod extends number
        ? NumberIntegerCompare.IntegerLte<Prod, L> extends true
          ? _IntegerDivideBinary<L, R, IntegerAdd<Mid, 1>, High>
          : _IntegerDivideBinary<L, R, Low, IntegerSubtract<Mid, 1>>
        : never
      : never
    : [High, IntegerSubtract<L, IntegerMultiply<High, R>>];

type IntegerDivide<L extends number, R extends number> =
  NumberIntegerCompare.IntegerEq<R, 0> extends true
    ? never
    : _IntegerDivideBinary<L, R, 0, L>;

type IntegerWrap<X extends number, S extends number, E extends number> =
  IntegerSubtract<E, S> extends infer Range extends number
    ? IntegerSubtract<X, S> extends infer Shifted extends number
      ? IntegerDivide<Shifted, Range> extends [
          infer _Q extends number,
          infer R extends number,
        ]
        ? Number.Sign<R> extends -1
          ? IntegerAdd<S, IntegerAdd<R, Range>>
          : IntegerAdd<S, R>
        : never
      : never
    : never;

export {
  IntegerAdd,
  IntegerSubtract,
  IntegerMultiply,
  IntegerDivide,
  IntegerHalf,
  IntegerMid,
  IntegerWrap,
};
