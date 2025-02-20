import { Accessor, Component, JSX } from 'solid-js';
import { Id } from './scenegraph';
export type WithBluefishProps<T = object> = T & {
    name?: Id;
};
export declare const IdContext: import('solid-js').Context<Accessor<string | undefined>>;
export declare function withBluefish<ComponentProps>(WrappedComponent: Component<WithBluefishProps<ComponentProps>>, options?: {
    displayName?: string;
}): (props: Omit<ComponentProps, "name"> & {
    name?: Id;
}) => JSX.Element;
export default withBluefish;
//# sourceMappingURL=withBluefish.d.ts.map