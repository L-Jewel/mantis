import { JSX, ParentProps } from 'solid-js';
import { Id } from './scenegraph';
export type GroupProps = ParentProps<{
    name: Id;
    x?: number;
    y?: number;
    rels?: () => JSX.Element;
}>;
export declare const Group: (props: Omit<{
    name: Id;
    x?: number;
    y?: number;
    rels?: () => JSX.Element;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Group;
//# sourceMappingURL=group.d.ts.map