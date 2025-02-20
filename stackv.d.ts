import { ParentProps, JSX } from 'solid-js';
import { StackArgs } from './stackLayout';
import { AlignmentHorizontal } from './align';
export type StackVProps = ParentProps<Omit<StackArgs, "direction"> & {
    alignment?: AlignmentHorizontal;
}>;
export declare const StackV: (props: Omit<Omit<StackArgs, "direction"> & {
    alignment?: AlignmentHorizontal;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: import('./scenegraph').Id;
}) => JSX.Element;
//# sourceMappingURL=stackv.d.ts.map