import { BBoxOwners } from '../scenegraph';
export type Dim = "left" | "top" | "centerX" | "centerY" | "right" | "bottom" | "width" | "height";
export type Axis = "x" | "y";
export declare const axisMap: {
    [key in Dim]: "x" | "y";
};
export type BBox = {
    [key in Dim]?: number;
};
export declare const from: (bboxes: BBox[]) => BBox;
export declare const dimVecs: {
    readonly x: {
        readonly left: readonly [1, -0.5];
        readonly right: readonly [1, 0.5];
        readonly centerX: readonly [1, 0];
        readonly width: readonly [0, 1];
    };
    readonly y: {
        readonly top: readonly [1, -0.5];
        readonly bottom: readonly [1, 0.5];
        readonly centerY: readonly [1, 0];
        readonly height: readonly [0, 1];
    };
};
export declare const solveSystem: (e1: [readonly [number, number], number], e2: [readonly [number, number], number]) => [number, number];
export declare const checkLinearEq: (eq: [readonly [number, number], number], vec: readonly [number, number], tolerance?: number) => boolean;
export declare const computeLinearExpr: (eq: readonly [number, number], vec: readonly [number, number]) => number;
export declare const createLinSysBBox: () => {
    bbox: BBox;
    owners: BBoxOwners;
};
//# sourceMappingURL=bbox.d.ts.map