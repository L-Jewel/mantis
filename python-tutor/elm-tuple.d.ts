import { Id } from '../scenegraph';
import { Value } from './types';
export type ElmTupleProps = {
    name?: Id;
    tupleIndex: string;
    tupleData: {
        type: string;
        value: Value;
    };
};
export declare const ElmTuple: (props: Omit<ElmTupleProps, "name"> & {
    name?: Id;
}) => import("solid-js").JSX.Element;
export default ElmTuple;
//# sourceMappingURL=elm-tuple.d.ts.map