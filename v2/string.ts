type StringLength<
  S extends string,
  Count extends any[] = [],
> = S extends `${infer _Head}${infer Tail}`
  ? StringLength<Tail, [any, ...Count]>
  : Count["length"];

export { StringLength };
