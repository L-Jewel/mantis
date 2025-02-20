import { ParentProps } from 'solid-js';
import { Id } from '../scenegraph';
export type Scale = any;
export type PlotProps = ParentProps<{
    name: Id;
    width?: number;
    height?: number;
    x?: Scale;
    y?: Scale;
    color?: Scale;
    data?: any;
}>;
export type PlotContextValue = {
    data?: any;
    scales: {
        [key in string]: any;
    };
};
export declare const usePlotContext: () => PlotContextValue;
export declare const Plot: (props: Omit<{
    name: Id;
    width?: number;
    height?: number;
    x?: Scale;
    y?: Scale;
    color?: Scale;
    data?: any;
} & {
    children?: import("solid-js").JSX.Element;
}, "name"> & {
    name?: Id;
}) => import("solid-js").JSX.Element;
//# sourceMappingURL=plot.d.ts.map