import {
  NumberIntegerAdd,
  NumberIntegerSubtract,
  NumberIntegerMultiply,
  NumberIntegerDivide,
  NumberIntegerPower,
  NumberIntegerClamp,
  NumberIntegerCompare,
  NumberIntegerEq,
  NumberIntegerNeq,
  NumberIntegerGt,
  NumberIntegerGte,
  NumberIntegerLt,
  NumberIntegerLte,
  NumberIntegerMax,
  NumberIntegerMin,
  Abs,
  Negate,
  IsEven,
  IsOdd,
  IsFloat,
  IsInteger,
  Trunc as TypeTrunc,
  Sign,
  ToBoolean,
  Not,
  And,
  Or,
  If,
  Signed,
  NumericalSign,
} from "./ts-overkill";

export function Trunc<N extends number>(n: N): TypeTrunc<N> {
  const result = n < 0 ? Math.ceil(n) : Math.floor(n);
  return result as any;
}

export function Add<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerAdd<L, R> {
  const result = Trunc(l) + Trunc(r);
  return result as any;
}

export function Subtract<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerSubtract<L, R> {
  const result = Trunc(l) - Trunc(r);
  return result as any;
}

export function Multiply<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerMultiply<L, R> {
  const result = Trunc(l) * Trunc(r);
  return result as any;
}

export function Divide<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerDivide<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncR == 0) {
    return null as any;
  }
  if (truncL == 0) {
    return [0, null] as any;
  }

  const quotient = Trunc(truncL / truncR) as number;
  const remainder = truncL % truncR;

  return [quotient, remainder] as any;
}

export function Power<N extends number, P extends number>(
  n: N,
  p: P,
): NumberIntegerPower<N, P> {
  const truncN = Trunc(n) as number;
  const truncP = Trunc(p) as number;

  if (truncP < 0) {
    return null as any;
  }

  const result = truncN ** truncP;
  return result as any;
}

export function Clamp<N extends number, Min extends number, Max extends number>(
  n: N,
  min: Min,
  max: Max,
): NumberIntegerClamp<N, Min, Max> {
  const truncN = Trunc(n) as number;
  const truncMin = Trunc(min) as number;
  const truncMax = Trunc(max) as number;

  const result = Math.max(Math.min(truncN, truncMax), truncMin);

  return result as any;
}

export function Compare<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerCompare<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncL == truncR) {
    return 0 as any;
  }
  if (truncL > truncR) {
    return 1 as any;
  }
  return -1 as any;
}

export function Eq<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerEq<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncL == truncR) {
    return true as any;
  }
  return false as any;
}

export function Neq<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerNeq<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncL != truncR) {
    return true as any;
  }
  return false as any;
}

export function Gt<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerGt<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncL > truncR) {
    return true as any;
  }
  return false as any;
}

export function Gte<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerGte<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncL >= truncR) {
    return true as any;
  }
  return false as any;
}

export function Lt<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerLt<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncL < truncR) {
    return true as any;
  }
  return false as any;
}

export function Lte<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerLte<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  if (truncL <= truncR) {
    return true as any;
  }
  return false as any;
}

export function Max<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerMax<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  const result = Math.max(truncL, truncR);
  return result as any;
}

export function Min<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerMin<L, R> {
  const truncL = Trunc(l) as number;
  const truncR = Trunc(r) as number;

  const result = Math.min(truncL, truncR);
  return result as any;
}

export function Abs<N extends number>(n: N): Abs<N> {
  const result = Math.abs(Trunc(n));
  return result as any;
}

export function Negate<N extends number>(n: N): Negate<N> {
  const result = -Math.abs(Trunc(n));
  return result as any;
}

export function IsEven<N extends number>(n: N): IsEven<N> {
  const result = Math.abs(Trunc(n)) % 2 == 0;
  return result as any;
}

export function IsOdd<N extends number>(n: N): IsOdd<N> {
  const result = Math.abs(Trunc(n)) % 2 == 1;
  return result as any;
}

export function IsFloat<N extends number>(n: N): IsFloat<N> {
  const result = Number.isFinite(n) && !Number.isInteger(n);
  return result as any;
}

export function IsInteger<N extends number>(n: N): IsInteger<N> {
  const result = Number.isFinite(n) && Number.isInteger(n);
  return result as any;
}

export function Sign<N extends number>(n: N): Sign<N> {
  const result = Math.sign(Trunc(n));
  return result as any;
}

export function ToBoolean<
  B extends boolean | string | number | bigint | undefined | null | object,
>(b: B): ToBoolean<B> {
  const result = !!b;
  return result as any;
}

export function Not<
  B extends boolean | string | number | bigint | undefined | null | object,
>(b: B): Not<B> {
  const result = !b;
  return result as any;
}

export function And<
  L extends boolean | string | number | bigint | undefined | null | object,
  R extends boolean | string | number | bigint | undefined | null | object,
>(l: L, r: R): And<L, R> {
  const result = Boolean(l && r);
  return result as any;
}

export function Or<
  L extends boolean | string | number | bigint | undefined | null | object,
  R extends boolean | string | number | bigint | undefined | null | object,
>(l: L, r: R): Or<L, R> {
  const result = Boolean(l || r);
  return result as any;
}

export function If<
  E extends boolean | string | number | bigint | undefined | null | object,
  T,
  F = void,
>(e: E, t: T, f?: F): If<E, T, F> {
  const result = e ? t : f;
  return result as any;
}

export function Signed<
  N extends number,
  S extends NumericalSign | [NumericalSign, NumericalSign],
>(n: N, s: S): Signed<N, S> {
  let sign: number;

  if (typeof s == "number") {
    sign = s;
  } else {
    sign = s[0] * s[1];
  }

  const result = Math.abs(Trunc(n)) * sign;
  return result as any;
}
