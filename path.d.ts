import { Id } from './scenegraph';
import { JSX } from 'solid-js/jsx-runtime';
export type PathProps = JSX.PathSVGAttributes<SVGPathElement> & {
    name: Id;
    d: string;
    x?: number;
    y?: number;
    position?: "absolute" | "relative";
};
export declare const Path: (props: Omit<JSX.PathSVGAttributes<SVGPathElement> & {
    name: Id;
    d: string;
    x?: number;
    y?: number;
    position?: "absolute" | "relative";
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Path;
//# sourceMappingURL=path.d.ts.map