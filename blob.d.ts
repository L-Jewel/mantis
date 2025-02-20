import { JSX } from 'solid-js/jsx-runtime';
import { default as paper } from 'paper';
import { Id } from './scenegraph';
export type BlobProps = {
    name: Id;
    path: InstanceType<typeof paper.Path>;
} & Omit<JSX.PathSVGAttributes<SVGPathElement>, "d">;
export declare const Blob: (props: Omit<{
    name: Id;
    path: InstanceType<typeof paper.Path>;
} & Omit<JSX.PathSVGAttributes<SVGPathElement>, "d">, "name"> & {
    name?: Id;
}) => JSX.Element;
//# sourceMappingURL=blob.d.ts.map