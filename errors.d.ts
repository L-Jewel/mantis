import { BBox, Id, Inferred, Transform } from './scenegraph';
export type BluefishError = {
    type: string;
    source: Id;
    display: (resolveScopeName: (name: Id) => Id) => string;
};
export type DimUnownedError = {
    type: "DimUnownedError";
    name: Id;
    dim: keyof BBox;
} & BluefishError;
export declare const dimUnownedError: ({ source, name, dim, }: {
    source: Id;
    name: Id;
    dim: keyof BBox;
}) => DimUnownedError;
export type DimAlreadyOwnedError = {
    type: "DimAlreadyOwnedError";
    name: Id;
    owner: Id | Inferred;
    dim: keyof BBox;
    value: number;
} & BluefishError;
export declare const dimAlreadyOwnedError: ({ source, name, owner, dim, value, }: {
    source: Id;
    name: Id;
    owner: Id | Inferred;
    dim: keyof BBox;
    value: number;
}) => DimAlreadyOwnedError;
export type TranslateAlreadyOwnedError = {
    type: "TranslateAlreadyOwnedError";
    name: Id;
    owner: Id | Inferred;
    axis: keyof Transform["translate"];
    value: number;
} & BluefishError;
export declare const translateAlreadyOwnedError: ({ source, name, owner, axis, value, }: {
    source: Id;
    name: Id;
    owner: Id | Inferred;
    axis: keyof Transform["translate"];
    value: number;
}) => TranslateAlreadyOwnedError;
export type AccumulatedTransformUndefinedError = {
    type: "AccumulatedTransformUndefinedError";
    name: Id;
    dim: keyof BBox;
    axis: keyof Transform["translate"];
    value: number;
} & BluefishError;
export declare const accumulatedTransformUndefinedError: ({ source, name, dim, axis, value, }: {
    source: Id;
    name: Id;
    dim: keyof BBox;
    axis: keyof Transform["translate"];
    value: number;
}) => AccumulatedTransformUndefinedError;
export type DimNaNError = {
    type: "DimNaNError";
    name: Id;
    dim: keyof BBox;
} & BluefishError;
export declare const dimNaNError: ({ source, name, dim, }: {
    source: Id;
    name: Id;
    dim: keyof BBox;
}) => DimNaNError;
export type DimSetUndefinedError = {
    type: "DimSetUndefinedError";
    name: Id;
    dim: keyof BBox;
} & BluefishError;
export declare const dimSetUndefinedError: ({ source, name, dim, }: {
    source: Id;
    name: Id;
    dim: keyof BBox;
}) => DimSetUndefinedError;
export type IdNotFoundError = {
    type: "IdNotFoundError";
    caller: string;
} & BluefishError;
export declare const idNotFoundError: ({ source, caller, }: {
    source: Id;
    caller: string;
}) => IdNotFoundError;
export type ParentRefError = {
    type: "ParentRefError";
    caller: string;
    child: Id;
} & BluefishError;
export declare const parentRefError: ({ source, caller, child, }: {
    source: Id;
    caller: string;
    child: Id;
}) => ParentRefError;
//# sourceMappingURL=errors.d.ts.map