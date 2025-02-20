import { JSX, ParentProps } from 'solid-js';
import { Id, BBox } from './scenegraph';
export declare const maybeSub: (a: number, b: number) => number | undefined;
export type LayoutFunctionProps = ParentProps<{
    f: (fromBBox: BBox, toBBox: BBox) => BBox;
    x?: number;
    y?: number;
}>;
export declare const LayoutFunction: (props: Omit<{
    f: (fromBBox: BBox, toBBox: BBox) => BBox;
    x?: number;
    y?: number;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default LayoutFunction;
//# sourceMappingURL=layoutFunction.d.ts.map