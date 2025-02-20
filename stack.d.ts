import { ParentProps, JSX } from 'solid-js';
import { StackArgs } from './stackLayout';
export type StackProps = ParentProps<StackArgs>;
export declare const Stack: (props: Omit<StackArgs & {
    children?: JSX.Element;
}, "name"> & {
    name?: import('./scenegraph').Id;
}) => JSX.Element;
//# sourceMappingURL=stack.d.ts.map