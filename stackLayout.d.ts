import { Alignment1D } from './align';
import { Id, LayoutFn } from './scenegraph';
export type StackArgs = {
    name: Id;
    x?: number;
    y?: number;
    alignment?: Alignment1D;
    direction: "vertical" | "horizontal";
    total?: number;
    spacing?: number;
};
export declare const stackLayout: (args: StackArgs) => LayoutFn;
//# sourceMappingURL=stackLayout.d.ts.map