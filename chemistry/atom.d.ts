import { JSX } from 'solid-js/jsx-runtime';
import { Id } from '../scenegraph';
export type AtomProps = JSX.CircleSVGAttributes<SVGCircleElement> & {
    content: string;
    name: Id;
    isTerminal: boolean;
    bondCount: number;
    ariaHidden: boolean;
    r: number;
    cx?: number;
    cy?: number;
};
export declare const Atom: (props: Omit<JSX.CircleSVGAttributes<SVGCircleElement> & {
    content: string;
    name: Id;
    isTerminal: boolean;
    bondCount: number;
    ariaHidden: boolean;
    r: number;
    cx?: number;
    cy?: number;
}, "name"> & {
    name?: Id;
}) => JSX.Element;
export default Atom;
//# sourceMappingURL=atom.d.ts.map