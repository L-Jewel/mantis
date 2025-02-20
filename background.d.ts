import { Id } from './scenegraph';
import { JSX } from 'solid-js/jsx-runtime';
import { ParentProps } from 'solid-js';
export type BackgroundProps = ParentProps<{
    name: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
    background?: () => JSX.Element;
} & JSX.RectSVGAttributes<SVGRectElement>>;
export declare const Background: (props: Omit<{
    name: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
    background?: () => JSX.Element;
} & JSX.RectSVGAttributes<SVGRectElement> & {
    children?: JSX.Element;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Background;
//# sourceMappingURL=background.d.ts.map