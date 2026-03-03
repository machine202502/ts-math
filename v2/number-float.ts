import * as String from "./string";
import * as Utils from "./utils";
import * as NumberIntegerCompare from "./number-integer-compare";
import * as NumberIntegerArithmetic from "./number-integer-arithmetic";
import * as NumberIntegerUtils from "./number-integer-utils";
import * as Number from "./number";
import * as Integer from "./number-integer";

type _SizeMax = 6;
type _SizeZeros = _SizeZerosFactory<0, _SizeMax>;

type _SizeZerosFactory<
  I extends number,
  Max extends number,
  Zeros extends 0[] = [],
> =
  NumberIntegerCompare.IntegerEq<I, Max> extends true
    ? Zeros
    : _SizeZerosFactory<
        NumberIntegerArithmetic.IntegerAdd<I, 1>,
        Max,
        [0, ...Zeros]
      >;

type _StringSlice<
  NS extends string,
  Size extends any[] = _SizeZeros,
  NNS extends string = "",
> = NS extends ""
  ? NNS
  : Size extends NS
    ? NS
    : Size extends [any, ...infer Size]
      ? NS extends `${infer D}${infer RNS}`
        ? D extends `${Utils.Digit}`
          ? _StringSlice<RNS, Size, `${NNS}${D}`>
          : RNS
        : NNS
      : NNS;

type _FloatToString<N extends number> = `${N}`;

type _FloatLength<N extends number> = `${N}` extends `${number}.${infer F}`
  ? NumberIntegerCompare.IntegerClamp<String.StringLength<F>, 0, _SizeMax>
  : 0;

type _NumberFromString<NS extends string> =
  _StringRemoveFirstZeros<
    _StringRemoveLastZeros<NS>
  > extends `${infer N extends number}`
    ? N
    : 0;

type _StringSplitLeftDigit<S extends string> =
  S extends `${Utils.Digit}${infer Pad}`
    ? S extends `${infer D}${Pad}`
      ? D extends `${Utils.Digit}`
        ? [Pad, D]
        : ["", ""]
      : ["", ""]
    : ["", ""];

type _StringSplitRightDigit<S extends string> =
  S extends `${infer Pad}${Utils.Digit}`
    ? S extends `${Pad}${infer D}`
      ? D extends `${Utils.Digit}`
        ? [Pad, D]
        : ["", ""]
      : ["", ""]
    : ["", ""];

type _StringFloatJoin<L extends string, R extends string> = L extends ""
  ? `0.${R}`
  : R extends ""
    ? L
    : `${L}.${R}`;

type _StringRemoveFirstZeros<S extends string> =
  S extends `0${infer D extends Utils.Digit}${infer SS extends string}`
    ? _StringRemoveFirstZeros<`${D}${SS}`>
    : S;

type _StringRemoveLastZeros<S extends string> =
  S extends `${infer Fixed extends string}.${infer Float extends string}0`
    ? _StringRemoveLastZeros<`${Fixed}.${Float}`>
    : S extends `${infer Fixed extends string}.`
      ? `${Fixed}`
      : S;

type _FloatPointMoveRightPush<
  Fixed extends string,
  Float extends string,
  Size extends 0[] = [],
> = Float extends ""
  ? _StringFloatJoin<Fixed, Float>
  : Size extends []
    ? _StringFloatJoin<Fixed, Float>
    : Size extends [0, ...infer NewSize extends 0[]]
      ? _StringSplitLeftDigit<Float> extends [
          infer PadFloat extends string,
          infer PadFixed extends string,
        ]
        ? _FloatPointMoveRightPush<`${Fixed}${PadFixed}`, PadFloat, NewSize>
        : ""
      : "";

type _FloatPointMoveRight<
  N extends number,
  S extends number,
> = `${N}` extends `${infer Fixed extends string}.${infer Float extends string}`
  ? _FloatPointMoveRightPush<
      Fixed,
      Float,
      _SizeZerosFactory<0, S, []>
    > extends infer MovedString extends string
    ? _NumberFromString<MovedString>
    : N
  : N;

type _FloatPointMoveLeftPush<
  Fixed extends string,
  Float extends string,
  Size extends 0[] = [],
> = Size extends []
  ? _StringFloatJoin<Fixed, Float>
  : Size extends [0, ...infer NewSize extends 0[]]
    ? Fixed extends ""
      ? _FloatPointMoveLeftPush<Fixed, `0${Float}`, NewSize>
      : _StringSplitRightDigit<Fixed> extends [
            infer PadFixed extends string,
            infer PadFloat extends string,
          ]
        ? _FloatPointMoveLeftPush<PadFixed, `${PadFloat}${Float}`, NewSize>
        : ""
    : "";

type _FloatPointMoveLeft<
  N extends number,
  S extends number,
> = `${N}` extends `${infer Fixed extends string}.${infer Float extends string}`
  ? _FloatPointMoveLeftPush<
      Fixed,
      Float,
      _SizeZerosFactory<0, S, []>
    > extends infer MovedString extends string
    ? _NumberFromString<MovedString>
    : N
  : _NumberFromString<
      _FloatPointMoveLeftPush<`${N}`, "", _SizeZerosFactory<0, S, []>>
    >;

type FloatFromNumber<N extends number> =
  Number.IsInteger<N> extends true
    ? N
    : `${N}` extends `${infer Fixed}.${infer Float}`
      ? `${Fixed}.${_StringSlice<Float>}` extends _FloatToString<
          infer NF extends number
        >
        ? NF
        : 0
      : 0;

type _FloatUseIntegerSingle<N extends number> =
  FloatFromNumber<Number.Abs<N>> extends infer Float extends number
    ? _FloatLength<N> extends infer Length extends number
      ? _FloatPointMoveRight<Float, Length> extends infer MovedFloat extends
          number
        ? [float_signs: Length, integer: MovedFloat]
        : never
      : never
    : never;

type _IntegerTenFactory<B extends number> =
  _SizeZerosFactory<0, B> extends infer Array extends 0[]
    ? Array extends []
      ? 0
      : Array extends [0, ...infer R extends 0[]]
        ? NumberIntegerUtils.IntegerFromDigitTuple<[1, 0, ...R]>
        : 0
    : 0;

type _FloatUseInteger<L extends number, R extends number> =
  _FloatUseIntegerSingle<L> extends [
    infer LeftSize extends number,
    infer LeftInteger extends number,
  ]
    ? _FloatUseIntegerSingle<R> extends [
        infer RightSize extends number,
        infer RightInteger extends number,
      ]
      ? NumberIntegerCompare.IntegerEq<LeftSize, RightSize> extends true
        ? [
            max_signs: LeftSize,
            sum_signs: NumberIntegerArithmetic.IntegerAdd<LeftSize, LeftSize>,
            left_integer: LeftInteger,
            right_integer: RightInteger,
            left_scaled: LeftInteger,
            right_scaled: RightInteger,
          ]
        : NumberIntegerCompare.IntegerGt<LeftSize, RightSize> extends true
          ? [
              max_signs: LeftSize,
              sum_signs: NumberIntegerArithmetic.IntegerAdd<
                LeftSize,
                RightSize
              >,
              left_integer: LeftInteger,
              right_integer: RightInteger,
              left_scaled: LeftInteger,
              right_scaled: NumberIntegerArithmetic.IntegerMultiply<
                RightInteger,
                _IntegerTenFactory<
                  NumberIntegerArithmetic.IntegerSubtract<LeftSize, RightSize>
                >
              >,
            ]
          : [
              max_signs: RightSize,
              sum_signs: NumberIntegerArithmetic.IntegerAdd<
                LeftSize,
                RightSize
              >,
              left_integer: LeftInteger,
              right_integer: RightInteger,
              left_scaled: NumberIntegerArithmetic.IntegerMultiply<
                LeftInteger,
                _IntegerTenFactory<
                  NumberIntegerArithmetic.IntegerSubtract<RightSize, LeftSize>
                >
              >,
              right_scaled: RightInteger,
            ]
      : never
    : never;

type FloatAdd<L extends number, R extends number> =
  _FloatUseInteger<L, R> extends [
    infer MaxSigns extends number,
    infer SumSigns extends number,
    infer LeftInteger extends number,
    infer RightInteger extends number,
    infer LeftScaled extends number,
    infer RightScaled extends number,
  ]
    ? [Number.Sign<L>, Number.Sign<R>] extends [
        infer LS extends Utils.Signed,
        infer RS extends Utils.Signed,
      ]
      ? NumberIntegerArithmetic.IntegerAdd<
          Number.Signed<LeftScaled, LS>,
          Number.Signed<RightScaled, RS>
        > extends infer Sum extends number
        ? Number.Signed<
            _FloatPointMoveLeft<Number.Abs<Sum>, MaxSigns>,
            Number.Sign<Sum>
          >
        : never
      : never
    : never;

type FloatSubtract<L extends number, R extends number> = FloatAdd<
  L,
  Number.Negate<R>
>;

type FloatToString<N extends number> = `${FloatFromNumber<N>}`;

type FloatFromString<S extends string> = _NumberFromString<S>;

type FloatMultiply<L extends number, R extends number> =
  _FloatUseInteger<L, R> extends [
    infer MaxSigns extends number,
    infer SumSigns extends number,
    infer LeftInteger extends number,
    infer RightInteger extends number,
    infer LeftScaled extends number,
    infer RightScaled extends number,
  ]
    ? [Number.Sign<L>, Number.Sign<R>] extends [
        infer LS extends Utils.Signed,
        infer RS extends Utils.Signed,
      ]
      ? NumberIntegerArithmetic.IntegerMultiply<
          LeftInteger,
          RightInteger
        > extends infer Multiplied extends number
        ? Number.Signed<_FloatPointMoveLeft<Multiplied, SumSigns>, [LS, RS]>
        : never
      : never
    : never;

type FloatDivide<L extends number, R extends number> =
  _FloatUseInteger<L, R> extends [
    infer MaxSigns extends number,
    infer SumSigns extends number,
    infer LeftInteger extends number,
    infer RightInteger extends number,
    infer LeftScaled extends number,
    infer RightScaled extends number,
  ]
    ? _FloatUseIntegerSingle<L> extends [
        infer LeftSize extends number,
        infer _ extends number,
      ]
      ? _FloatUseIntegerSingle<R> extends [
          infer RightSize extends number,
          infer _ extends number,
        ]
        ? NumberIntegerArithmetic.IntegerSubtract<
            RightSize,
            LeftSize
          > extends infer Diff extends number
          ? NumberIntegerArithmetic.IntegerAdd<
              Diff,
              _SizeMax
            > extends infer Power extends number
            ? _IntegerTenFactory<Power> extends infer TenPower extends number
              ? NumberIntegerArithmetic.IntegerMultiply<
                  LeftInteger,
                  TenPower
                > extends infer Scaled extends number
                ? NumberIntegerArithmetic.IntegerDivide<
                    Scaled,
                    RightInteger
                  > extends [
                    infer Divided extends number,
                    infer _ extends number,
                  ]
                  ? [Number.Sign<L>, Number.Sign<R>] extends [
                      infer LS extends Utils.Signed,
                      infer RS extends Utils.Signed,
                    ]
                    ? Number.Signed<
                        _FloatPointMoveLeft<Divided, _SizeMax>,
                        [LS, RS]
                      >
                    : never
                  : never
                : never
              : never
            : never
          : never
        : never
      : never
    : never;

export {
  FloatFromNumber,
  FloatToString,
  FloatFromString,
  FloatAdd,
  FloatSubtract,
  FloatMultiply,
  FloatDivide,
};
