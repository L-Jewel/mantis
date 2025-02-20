import { JSX, ParentProps } from 'solid-js';
import { BBox, Transform, LayoutFn, Id } from './scenegraph';
export type LayoutProps = ParentProps<{
    name: Id;
    bbox?: BBox;
    layout: LayoutFn;
    paint: (props: {
        bbox: BBox;
        transform: Transform;
        children: JSX.Element;
        customData?: any;
    }) => JSX.Element;
}>;
export declare const Layout: (props: LayoutProps) => JSX.Element;
export default Layout;
//# sourceMappingURL=layout.d.ts.map