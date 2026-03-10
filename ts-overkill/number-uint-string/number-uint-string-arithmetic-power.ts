import { NumericalUintStringTuple } from "../common/types";
import { NumberUintStringTupleMultiply } from "./number-uint-string-arithmetic-multiply";
import { NumberUintStringZeroLeftTrim } from "./number-uint-string-trim";

type _NumberUintStringTuplePower<
  RNT extends NumericalUintStringTuple,
  Zarr extends "0"[],
  SNT extends NumericalUintStringTuple,
> = Zarr extends ["0", ...infer ZarrRest extends "0"[]]
  ? _NumberUintStringTuplePower<
      NumberUintStringZeroLeftTrim<NumberUintStringTupleMultiply<SNT, RNT>>,
      ZarrRest,
      SNT
    >
  : RNT;

type NumberUintStringTuplePower<
  NT extends NumericalUintStringTuple,
  Zarr extends "0"[],
> = _NumberUintStringTuplePower<["1"], Zarr, NT>;

export { NumberUintStringTuplePower };
