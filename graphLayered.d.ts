import { ParentProps, JSX } from 'solid-js';
import { WithBluefishProps } from './withBluefish';
import { Id } from './scenegraph';
export type GraphLayeredProps = ParentProps<{
    name: Id;
    direction?: "left-right" | "right-left" | "top-bottom" | "bottom-top";
    x?: number;
    y?: number;
}>;
export declare const convertDirection: {
    "left-right": string;
    "right-left": string;
    "top-bottom": string;
    "bottom-top": string;
};
export type NodeProps = WithBluefishProps<ParentProps<{
    id: string;
    type?: "node";
}>>;
export declare const Node: (props: NodeProps) => JSX.Element;
export type EdgeProps = WithBluefishProps<{
    source: string;
    target: string;
    type?: "edge";
}>;
export declare const Edge: (props: EdgeProps) => JSX.Element;
export declare const GraphLayered: (props: Omit<{
    name: Id;
    direction?: "left-right" | "right-left" | "top-bottom" | "bottom-top";
    x?: number;
    y?: number;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
//# sourceMappingURL=graphLayered.d.ts.map