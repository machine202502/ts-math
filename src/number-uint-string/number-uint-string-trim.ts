import { NumericalUintStringTuple } from "../common/types";

type NumberUintStringZeroLeftTrim<NT extends NumericalUintStringTuple> =
  NT extends ["0", ...infer NTRest extends NumericalUintStringTuple]
    ? NumberUintStringZeroLeftTrim<NTRest>
    : NT extends []
      ? []
      : NT;

export { NumberUintStringZeroLeftTrim };
