import { JSX, ParentProps } from 'solid-js';
import { Id } from '../scenegraph';
import { ArrowOptions } from 'perfect-arrows';
export type BondProps = ParentProps<{
    name: Id;
    bondType: string;
    ringCenterX?: number;
    ringCenterY?: number;
    x?: number;
    y?: number;
    start?: boolean;
    "stroke-width"?: number;
    stroke?: string;
} & ArrowOptions>;
export declare const Bond: (props: Omit<{
    name: Id;
    bondType: string;
    ringCenterX?: number;
    ringCenterY?: number;
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
export default Bond;
//# sourceMappingURL=bond.d.ts.map