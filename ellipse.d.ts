import { JSX } from 'solid-js/jsx-runtime';
import { Id } from './scenegraph';
export type EllipseProps = JSX.EllipseSVGAttributes<SVGEllipseElement> & {
    name: Id;
    cx?: number;
    cy?: number;
    rx: number;
    ry: number;
};
export declare const Ellipse: (props: Omit<JSX.EllipseSVGAttributes<SVGEllipseElement> & {
    name: Id;
    cx?: number;
    cy?: number;
    rx: number;
    ry: number;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Ellipse;
//# sourceMappingURL=ellipse.d.ts.map