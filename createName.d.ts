import { Accessor } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import { Id } from './scenegraph';
export type Name = string;
export type Scope = {
    [key: Id]: {
        layoutNode: Id | undefined;
        parent: Id;
        children: {
            [key: Name]: Id;
        };
    };
};
export declare const ScopeContext: import('solid-js').Context<[get: Scope, set: SetStoreFunction<Scope>]>;
export declare const ParentScopeIdContext: import('solid-js').Context<Accessor<string>>;
export declare const createName: (name: string) => string;
export declare const resolveName: (layoutNode: Id, options?: {
    default?: boolean;
}) => Name | undefined;
//# sourceMappingURL=createName.d.ts.map