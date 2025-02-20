import { ScenegraphNode } from './scenegraph';
import { Accessor, JSX, ParentProps } from 'solid-js';
import { MantisComponentType, MantisTraversalPattern } from './mantis';
export type BluefishProps = ParentProps<{
    width?: number;
    height?: number;
    padding?: number;
    id?: string;
    debug?: boolean;
    positioning?: "absolute" | "relative";
    mantisComponentType: MantisComponentType;
    mantisTraversalPattern?: MantisTraversalPattern;
    mantisId?: number;
}>;
declare global {
    interface Window {
        bluefish?: {
            [key: string]: {
                [key: string]: ScenegraphNode;
            };
        };
    }
}
export declare const LayoutUIDContext: import('solid-js').Context<Accessor<string>>;
export declare function Bluefish(props: BluefishProps): JSX.Element;
export default Bluefish;
//# sourceMappingURL=bluefish.d.ts.map