import { JSX, ParentProps } from 'solid-js';
import { Id } from './scenegraph';
import { ArrowOptions } from 'perfect-arrows';
export type ArrowProps = ParentProps<{
    name: Id;
    x?: number;
    y?: number;
    start?: boolean;
    "stroke-width"?: number;
    stroke?: string;
} & ArrowOptions>;
export declare const Arrow: (props: Omit<{
    name: Id;
    x?: number;
    y?: number;
    start?: boolean;
    "stroke-width"?: number;
    stroke?: string;
} & ArrowOptions & {
    children?: JSX.Element;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Arrow;
//# sourceMappingURL=arrow.d.ts.map