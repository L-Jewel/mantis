import { JSX } from 'solid-js/jsx-runtime';
import { Id } from './scenegraph';
export type RectProps = JSX.RectSVGAttributes<SVGRectElement> & {
    name: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
export declare const Rect: (props: Omit<JSX.RectSVGAttributes<SVGRectElement> & {
    name: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Rect;
//# sourceMappingURL=rect.d.ts.map