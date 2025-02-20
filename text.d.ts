import { Ref } from 'solid-js';
export declare const Text: (props: Omit<{
    className?: string;
    scaleToFit?: boolean | "shrink-only";
    angle?: number;
    "vertical-anchor"?: "start" | "middle" | "end";
    innerRef?: Ref<SVGGElement>;
    innerTextRef?: Ref<SVGTextElement>;
    x?: string | number;
    y?: string | number;
    dx?: string | number;
    dy?: string | number;
    "line-height"?: string | number | undefined;
    "cap-height"?: string | number | undefined;
    width?: number;
    children?: string | number;
    delimiters?: import('./text/splitAtDelimiters').Delimiter[];
} & Omit<import("solid-js").JSX.TextSVGAttributes<SVGTextElement>, keyof {
    className?: string;
    scaleToFit?: boolean | "shrink-only";
    angle?: number;
    "vertical-anchor"?: "start" | "middle" | "end";
    innerRef?: Ref<SVGGElement>;
    innerTextRef?: Ref<SVGTextElement>;
    x?: string | number;
    y?: string | number;
    dx?: string | number;
    dy?: string | number;
    "line-height"?: string | number | undefined;
    "cap-height"?: string | number | undefined;
    width?: number;
    children?: string | number;
    delimiters?: import('./text/splitAtDelimiters').Delimiter[];
}> & {
    name: import('./scenegraph').Id;
}, "name"> & {
    name?: import('./scenegraph').Id;
}) => import("solid-js").JSX.Element;
export default Text;
//# sourceMappingURL=text.d.ts.map