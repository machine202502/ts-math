import * as Math from "./math";

const expected = {
  a: 153 as const,
  b: 5 as const,
  power: 4294967296 as const,
  divide: [33, 1] as [33, 1],
  cmp: 1 as const,
  cmp2: -1 as const,
  trunc: -234 as const,
  even: true as const,
  or: true as const,
  if: -32 as const,
};

const result: typeof expected = {
  a: Math.Add(32, Math.Multiply(11, 11)),
  b: Math.Max(5, -236),
  power: Math.Power(2, 32),
  divide: Math.Divide(100, 3),
  cmp: Math.Compare(-31, -100),
  cmp2: Math.Compare(31, 100),
  trunc: Math.Trunc(-234.601),
  even: Math.IsEven(206),
  or: Math.Or(undefined, -1),
  if: Math.If(Math.And(1, "hello"), Math.Subtract(1, 33)),
} as const;

const isCompared = JSON.stringify(expected) == JSON.stringify(result);

console.log(isCompared, result);
