import { Id } from '../scenegraph';
import { Pointer } from './types';
export type StackSlotProps = {
    name?: Id;
    variable: string;
    value: string | Pointer;
};
export declare const StackSlot: (props: Omit<StackSlotProps, "name"> & {
    name?: Id;
}) => import("solid-js").JSX.Element;
//# sourceMappingURL=stack-slot.d.ts.map