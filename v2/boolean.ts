type _AcceptableFrom =
  | boolean
  | string
  | number
  | bigint
  | undefined
  | null
  | object;

type ToBoolean<B extends _AcceptableFrom> = B extends
  | ""
  | 0
  | 0n
  | false
  | undefined
  | null
  ? false
  : true;

type Not<B extends _AcceptableFrom> = ToBoolean<B> extends true ? false : true;

type And<L extends _AcceptableFrom, R extends _AcceptableFrom> = [
  ToBoolean<L>,
  ToBoolean<R>,
] extends [true, true]
  ? true
  : false;

type Or<L extends _AcceptableFrom, R extends _AcceptableFrom> = [
  ToBoolean<L>,
  ToBoolean<R>,
] extends [false, true] | [true, true] | [true, false]
  ? true
  : false;

type If<C extends _AcceptableFrom, TE, EE = void> =
  ToBoolean<C> extends true ? TE : EE;

export { ToBoolean, Not, And, Or, If };
