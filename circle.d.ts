import { JSX } from 'solid-js/jsx-runtime';
import { Id } from './scenegraph';
export type CircleProps = JSX.CircleSVGAttributes<SVGCircleElement> & {
    name: Id;
    cx?: number;
    cy?: number;
    r: number;
};
export declare const Circle: (props: Omit<JSX.CircleSVGAttributes<SVGCircleElement> & {
    name: Id;
    cx?: number;
    cy?: number;
    r: number;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Circle;
//# sourceMappingURL=circle.d.ts.map