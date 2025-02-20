import { BBox, Dim, Axis, axisMap } from './util/bbox';
import { JSX } from 'solid-js';
export type Id = string;
export type Inferred = {
    inferred: true;
};
export declare const inferred: Inferred;
export type { BBox, Dim, Axis };
export { axisMap };
export type BBoxOwners = {
    [key in Dim]?: Id | Inferred;
};
export type Transform = {
    translate: {
        x?: number;
        y?: number;
    };
};
export type RequiredTransform = {
    translate: {
        x: number;
        y: number;
    };
};
export type TransformOwners = {
    translate: {
        x?: Id;
        y?: Id;
    };
};
export type ChildNode = {
    name: Id;
    bbox: BBox;
    owned: {
        [key in Dim]: boolean;
    };
};
export type ScenegraphNode = {
    type: "node";
    bbox: BBox;
    bboxOwners: BBoxOwners;
    transform: Transform;
    transformOwners: TransformOwners;
    children: Id[];
    parent: Id | null;
    customData?: any;
    layout: () => void;
} | {
    type: "ref";
    refId: Id;
    parent: Id | null;
};
export declare const UNSAFE_asNode: (node: ScenegraphNode) => ScenegraphNode & {
    type: "node";
};
export declare const UNSAFE_asRef: (node: ScenegraphNode) => ScenegraphNode & {
    type: "ref";
};
export declare const isNode: (node: ScenegraphNode) => node is ScenegraphNode & {
    type: "node";
};
export declare const isRef: (node: ScenegraphNode) => node is ScenegraphNode & {
    type: "ref";
};
export type Scenegraph = {
    [key: Id]: ScenegraphNode;
};
export type ScenegraphElement = {
    jsx: JSX.Element;
    layout: (parentId: Id | null) => void;
};
export declare const resolveScenegraphElements: (unresolved: unknown) => ScenegraphElement[];
export declare const createScenegraph: () => ScenegraphContextType;
export type ScenegraphContextType = {
    scenegraph: Scenegraph;
    createNode: (id: Id, parentId: Id | null) => void;
    createRef: (id: Id, refId: Id, parentId: Id) => void;
    resolveRef: (id: Id, mode: "read" | "write" | "check") => {
        id: Id;
        transform: Transform;
    };
    mergeBBoxAndTransform: (owner: Id, id: Id, bbox: BBox, transform: Transform) => void;
    getBBox: (id: Id) => BBox;
    setBBox: (owner: Id, id: Id, bbox: BBox) => void;
    ownedByOther: (id: Id, check: Id, dim: Dim) => boolean;
    createChildRepr: (owner: Id, childId: Id) => ChildNode;
};
export declare const ScenegraphContext: import('solid-js').Context<ScenegraphContextType | null>;
export declare const useScenegraph: () => {
    getBBox: (id: Id) => BBox;
    setBBox: (owner: Id, id: Id, bbox: BBox) => void;
    ownedByOther: (id: Id, check: Id, dim: Dim) => boolean;
};
export declare const UNSAFE_useScenegraph: () => ScenegraphContextType;
export type LayoutFn = (childNodes: ChildNode[]) => {
    bbox: Partial<BBox>;
    transform: Transform;
    customData?: any;
};
//# sourceMappingURL=scenegraph.d.ts.map