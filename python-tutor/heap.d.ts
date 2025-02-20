import { Id } from '../scenegraph';
import { Address, HeapObject as HeapObjectType } from './types';
export type HeapProps = {
    name: Id;
    heap: HeapObjectType[];
    heapArrangement: (Address | null)[][];
};
export declare const Heap: (props: Omit<HeapProps, "name"> & {
    name?: Id;
}) => import("solid-js").JSX.Element;
export default Heap;
//# sourceMappingURL=heap.d.ts.map