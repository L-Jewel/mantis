import { Id } from '../scenegraph';
import { Value } from './types';
export type GlobalFrameProps = {
    name?: Id;
    variables: {
        variable: string;
        value: Value;
    }[];
};
export declare const GlobalFrame: (props: Omit<GlobalFrameProps, "name"> & {
    name?: Id;
}) => import("solid-js").JSX.Element;
export default GlobalFrame;
//# sourceMappingURL=global-frame.d.ts.map