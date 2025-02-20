import { JSX, ParentProps } from 'solid-js';
import { Id } from './scenegraph';
export type Alignment2D = "topLeft" | "topCenter" | "topRight" | "centerLeft" | "center" | "centerRight" | "bottomLeft" | "bottomCenter" | "bottomRight";
export type Alignment2DObjs = {
    [K in Alignment2D]: {
        [k in K]: boolean;
    };
}[Alignment2D];
export type AlignmentVertical = "top" | "centerY" | "bottom";
export type AlignmentHorizontal = "left" | "centerX" | "right";
export type Alignment1D = AlignmentVertical | AlignmentHorizontal;
export type Alignment1DObjs = {
    [K in Alignment1D]: {
        [k in K]: boolean;
    };
}[Alignment1D];
export declare const verticalAlignment: (alignment: Alignment2D | Alignment1D) => AlignmentVertical | undefined;
export declare const horizontalAlignment: (alignment: Alignment2D | Alignment1D) => AlignmentHorizontal | undefined;
export declare const splitAlignment: (alignment: Alignment2D | Alignment1D) => [AlignmentVertical | undefined, AlignmentHorizontal | undefined];
export type AlignProps = ParentProps<{
    name: Id;
    x?: number;
    y?: number;
    alignment: Alignment2D | Alignment1D;
}>;
export declare const Align: (props: Omit<{
    name: Id;
    x?: number;
    y?: number;
    alignment: Alignment2D | Alignment1D;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Align;
//# sourceMappingURL=align.d.ts.map