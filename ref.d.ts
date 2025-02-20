import { JSX } from 'solid-js';
import { Id } from './scenegraph';
import { Name, Scope } from './createName';
export type Selection = Id | [Id, ...Name[]];
export type NormalizedSelection = [Id, ...Name[]];
export type RefProps = {
    name: Id;
    select: Selection;
};
export declare const normalizeSelection: (select: Selection) => NormalizedSelection;
export declare const resolveSelection: (scope: Scope, select: NormalizedSelection) => Id;
export declare const Ref: (props: Omit<RefProps, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Ref;
//# sourceMappingURL=ref.d.ts.map