import { ParentProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
export type DotProps<T> = ParentProps<Omit<JSX.CircleSVGAttributes<SVGCircleElement>, "cx" | "cy" | "fill" | "width" | "height" | "label"> & {
    x: keyof T;
    y: keyof T;
    color?: keyof T;
    stroke?: keyof T;
    label?: keyof T | {
        field: keyof T;
        avoid: Symbol[];
    };
    data?: T[];
}>;
export declare const Dot: <T>(props: Omit<Omit<JSX.CircleSVGAttributes<SVGCircleElement>, "width" | "height" | "fill" | "label" | "cx" | "cy"> & {
    x: keyof T;
    y: keyof T;
    color?: keyof T | undefined;
    stroke?: keyof T | undefined;
    label?: keyof T | {
        field: keyof T;
        avoid: Symbol[];
    } | undefined;
    data?: T[] | undefined;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: import('..').Id;
}) => JSX.Element;
//# sourceMappingURL=dot.d.ts.map