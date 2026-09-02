# @machine202502/types

Type-only TypeScript package with **compile-time** integer math and number utilities.
There is no runtime code — only `.d.ts` declarations.

## Install

```bash
npm install @machine202502/types
```

Requires TypeScript 4.8+ (template literal types / recursive conditional types).

## Imports

| Entry | Purpose |
|-------|---------|
| `@machine202502/types/math` | Public integer/number math types |
| `@machine202502/types/math/internal` | Lower-level helpers (digit tuples, boolean ops, string utils) |

```ts
import type {
  NumberIntegerAdd,
  NumberIntegerMultiply,
  Trunc,
  IsEven,
} from "@machine202502/types/math";

import type { And, Or, If, NumericalSign } from "@machine202502/types/math/internal";
```

## `@machine202502/types/math`

### Number helpers

| Type | Description |
|------|-------------|
| `IsFloat<N>` / `IsInteger<N>` | Whether `N` looks like a float / integer literal |
| `IsOdd<N>` / `IsEven<N>` | Parity of truncated `N` |
| `Abs<N>` / `Negate<N>` / `Sign<N>` | Absolute value, negation, sign (`-1 \| 0 \| 1`) |
| `Signed<N, S>` | Apply sign `S` (or product of two signs) to `Abs<N>` |
| `Trunc<N>` | Truncate toward zero via string split (drops fractional part) |
| `NumberParts<N>` | `[sign, fixed, float]` parts of a number literal |

### Integer compare

| Type | Description |
|------|-------------|
| `NumberIntegerCompare<L, R>` | `-1 \| 0 \| 1` |
| `NumberIntegerEq` / `Neq` / `Gt` / `Gte` / `Lt` / `Lte` | Boolean comparisons |
| `NumberIntegerMin` / `Max` / `Clamp` | Min, max, clamp (values are truncated) |

### Integer arithmetic

Operands are truncated to integers. Results are **literal number types**.

| Type | Description |
|------|-------------|
| `NumberIntegerAdd<L, R>` | `L + R` |
| `NumberIntegerSubtract<L, R>` | `L - R` |
| `NumberIntegerMultiply<L, R>` | `L * R` |
| `NumberIntegerDivide<L, R>` | `[quotient, remainder]` or `null` on divide-by-zero |
| `NumberIntegerPower<N, P>` | `N ** P` (`null` if `P < 0`) |

```ts
type A = NumberIntegerAdd<32, NumberIntegerMultiply<11, 11>>; // 153
type P = NumberIntegerPower<2, 32>; // 4294967296
type D = NumberIntegerDivide<100, 3>; // [33, 1]
type T = Trunc<-234.601>; // -234
```

## `@machine202502/types/math/internal`

Building blocks used by the public API. Prefer `@machine202502/types/math` in app code.

| Group | Types |
|-------|--------|
| Boolean | `ToBoolean`, `Not`, `And`, `Or`, `If` |
| Primitives | `NumericalDigit`, `NumericalDigitChar`, `NumericalSign`, `NumericalCompared`, `NumericalUintStringTuple` |
| String | `StringLength`, `StringToTuple` |
| Uint digit math | `NumberUintStringTupleAdd` / `Subtract` / `Multiply` / `Divide` / `Half` / `Power` / `Compare`, `NumberUintStringZeroLeftTrim`, `NumberUintStringZarr*`, conversion helpers |

## Examples

Runtime wrappers that *return* these types live in [`examples/`](./examples):

- `examples/example-module.ts` — functions whose return types are the package types
- `examples/example.ts` — end-to-end check (`npm run example`)

```ts
import type { NumberIntegerMultiply } from "@machine202502/types/math";

function Multiply<L extends number, R extends number>(
  l: L,
  r: R,
): NumberIntegerMultiply<L, R> {
  return (Math.trunc(l) * Math.trunc(r)) as NumberIntegerMultiply<L, R>;
}

const n = Multiply(11, 11);
//    ^? const n: 121
```
