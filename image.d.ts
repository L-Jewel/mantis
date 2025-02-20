import { JSX } from 'solid-js/jsx-runtime';
import { Id } from './scenegraph';
export type ImageProps = JSX.ImageSVGAttributes<SVGImageElement> & {
    name: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
export declare const Image: (props: Omit<JSX.ImageSVGAttributes<SVGImageElement> & {
    name: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Image;
//# sourceMappingURL=image.d.ts.map