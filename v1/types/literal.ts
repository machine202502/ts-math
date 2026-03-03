type _IsLiteral<T, Primitive> = [T] extends [Primitive]
  ? [Primitive] extends [T]
    ? false
    : true
  : false;

type IsBooleanLiteral<T> = _IsLiteral<T, boolean>;
type IsStringLiteral<T> = _IsLiteral<T, string>;
type IsNumberLiteral<T> = _IsLiteral<T, number>;
type IsBigintLiteral<T> = _IsLiteral<T, bigint>;
type IsUndefinedLiteral<T> = T extends undefined ? true : false;
type IsNullLiteral<T> = T extends null ? true : false;

type IsLiteral<T> =
  IsBooleanLiteral<T> extends true
    ? true
    : IsStringLiteral<T> extends true
      ? true
      : IsNumberLiteral<T> extends true
        ? true
        : IsBigintLiteral<T> extends true
          ? true
          : IsUndefinedLiteral<T> extends true
            ? true
            : IsNullLiteral<T> extends true
              ? true
              : false;

export {
  IsBooleanLiteral,
  IsStringLiteral,
  IsNumberLiteral,
  IsBigintLiteral,
  IsUndefinedLiteral,
  IsNullLiteral,
  IsLiteral,
};
