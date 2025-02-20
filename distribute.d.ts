import { Id } from './scenegraph';
import { JSX } from 'solid-js/jsx-runtime';
import { ParentProps } from 'solid-js';
export type DistributeProps = ParentProps<{
    name: Id;
    direction: "vertical" | "horizontal";
    total?: number;
    spacing?: number;
}>;
export declare const Distribute: (props: Omit<{
    name: Id;
    direction: "vertical" | "horizontal";
    total?: number;
    spacing?: number;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Distribute;
//# sourceMappingURL=distribute.d.ts.map