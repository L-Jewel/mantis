import { Id } from '../scenegraph';
import { Value } from './types';
export type ObjectProps = {
    name: Id;
    objectType: string;
    objectValues: {
        type: string;
        value: Value;
    }[];
};
export declare const HeapObject: (props: Omit<ObjectProps, "name"> & {
    name?: Id;
}) => import("solid-js").JSX.Element;
export default HeapObject;
//# sourceMappingURL=heap-object.d.ts.map