import { ParentProps } from 'solid-js';
export type LineProps = ParentProps<{
    "stroke-width"?: number;
    "stroke-dasharray"?: string;
    stroke?: string;
    source?: number[];
    target?: number[];
}>;
export declare const Line: (props: Omit<{
    "stroke-width"?: number;
    "stroke-dasharray"?: string;
    stroke?: string;
    source?: number[];
    target?: number[];
} & {
    children?: import("solid-js").JSX.Element;
}, "name"> & {
    name?: import('./scenegraph').Id;
}) => import("solid-js").JSX.Element;
export default Line;
//# sourceMappingURL=line.d.ts.map