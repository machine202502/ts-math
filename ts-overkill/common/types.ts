type NumericalDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type NumericalCompared = -1 | 0 | 1;
type NumericalSign = -1 | 0 | 1;

type NumericalDigitChar = `${NumericalDigit}`;
type NumericalUintStringTuple = NumericalDigitChar[];

export { NumericalDigit, NumericalCompared, NumericalSign };
export { NumericalDigitChar, NumericalUintStringTuple };
