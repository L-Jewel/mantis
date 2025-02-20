export type Address = number;
export type Pointer = {
    type: "pointer";
    value: Address;
};
export declare const pointer: (value: Address) => Pointer;
export type Value = string | number | Pointer;
export type StackSlot = {
    variable: string;
    value: Value;
};
export declare const formatValue: (value: Value) => string | number;
export declare const stackSlot: (variable: string, value: Value) => StackSlot;
export type Tuple = {
    type: "tuple";
    values: Value[];
};
export declare const tuple: (values: Value[]) => Tuple;
export type HeapObject = Tuple;
//# sourceMappingURL=types.d.ts.map