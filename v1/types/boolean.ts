import * as LiteralTypes from "./literal";

type ToBoolean<B> =
  LiteralTypes.IsLiteral<B> extends true
    ? B extends "" | 0 | 0n | false | undefined | null
      ? false
      : true
    : B extends object
      ? true
      : never;

type Not<B> =
  ToBoolean<B> extends infer R
    ? R extends boolean
      ? R extends true
        ? false
        : true
      : never
    : never;

type And<L, R> =
  ToBoolean<L> extends infer RL
    ? ToBoolean<R> extends infer RR
      ? RL extends boolean
        ? RR extends boolean
          ? [RL, RR] extends [true, true]
            ? true
            : false
          : never
        : never
      : never
    : never;

type Or<L, R> =
  ToBoolean<L> extends infer RL
    ? ToBoolean<R> extends infer RR
      ? RL extends boolean
        ? RR extends boolean
          ? [RL, RR] extends [false, true] | [true, true] | [true, false]
            ? true
            : false
          : never
        : never
      : never
    : never;

type If<C, TE, EE = void> =
  ToBoolean<C> extends infer R
    ? R extends boolean
      ? R extends true
        ? TE
        : EE
      : never
    : never;

export { ToBoolean, Not, And, Or, If };
