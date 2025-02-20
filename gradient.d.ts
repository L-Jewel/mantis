import { Id } from './scenegraph';
type ColorOffset = {
    offset: number;
    color: string;
};
type GradientProps = {
    name: Id;
    id: string;
    colorOffsets: ColorOffset[];
    x1?: number;
    x2?: number;
    y1?: number;
    y2?: number;
};
export declare const Gradient: (props: Omit<GradientProps, "name"> & {
    name?: Id;
}) => import("solid-js").JSX.Element;
export default Gradient;
//# sourceMappingURL=gradient.d.ts.map