import { ParentProps, JSX } from 'solid-js';
import { StackArgs } from './stackLayout';
import { AlignmentVertical } from './align';
export type StackHProps = ParentProps<Omit<StackArgs, "direction"> & {
    alignment?: AlignmentVertical;
}>;
export declare const StackH: (props: Omit<Omit<StackArgs, "direction"> & {
    alignment?: AlignmentVertical;
} & {
    children?: JSX.Element;
}, "name"> & {
    name?: import('./scenegraph').Id;
}) => JSX.Element;
//# sourceMappingURL=stackh.d.ts.map