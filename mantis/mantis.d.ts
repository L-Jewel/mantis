import { Accessor, Setter, ParentProps } from 'solid-js';
export declare enum MantisComponentType {
    MMMain = 0,
    MMMiniMap = 1,
    SSLeft = 2,
    SSRight = 3,
    LMain = 4,
    LLens = 5,
    Preview = 6
}
export declare enum MantisTraversalPattern {
    Bubble = 0,
    Cursor = 1
}
/**
 * @returns true if the component of type `type` is a part of the Split Screen
 * functionality.
 */
export declare function isSplitScreenType(type: MantisComponentType): type is MantisComponentType.SSLeft | MantisComponentType.SSRight;
/**
 * Differentiate between components that users can use to traverse the diagram, and
 * components with other purposes (e.g. the mini-map).
 * @returns true if the component of type `type` is a component that users can use
 * to traverse the diagram.
 */
export declare function isTraversalType(type: MantisComponentType): type is MantisComponentType.MMMain | MantisComponentType.SSLeft | MantisComponentType.SSRight | MantisComponentType.Preview;
export declare function isDraggableType(type: MantisComponentType): type is MantisComponentType.MMMiniMap | MantisComponentType.LLens;
export declare function isMiniMapContext(context: MantisState | undefined): context is {
    type: "MM";
    viewBBox: Accessor<string>;
    setViewBBox: Setter<string>;
    isDragging: Accessor<boolean>;
    setIsDragging: Setter<boolean>;
};
export declare function isSplitScreenContext(context: MantisState | undefined): context is {
    type: "SS";
    leftViewBBox: Accessor<string>;
    setLeftViewBBox: Setter<string>;
    rightViewBBox: Accessor<string>;
    setRightViewBBox: Setter<string>;
};
export declare function isMultiLensContext(context: MantisState | undefined): context is {
    type: "L";
    lensInfo: Accessor<LLensInfo[]>;
    updateLensInfo: Setter<LLensInfo[]>;
};
export type LLensInfo = {
    x: number;
    y: number;
    magnification: number;
};
export type MantisState = {
    type: "MM";
    viewBBox: Accessor<string>;
    setViewBBox: Setter<string>;
    isDragging: Accessor<boolean>;
    setIsDragging: Setter<boolean>;
} | {
    type: "SS";
    leftViewBBox: Accessor<string>;
    setLeftViewBBox: Setter<string>;
    rightViewBBox: Accessor<string>;
    setRightViewBBox: Setter<string>;
} | {
    type: "L";
    lensInfo: Accessor<LLensInfo[]>;
    updateLensInfo: Setter<LLensInfo[]>;
} | {
    type: "P";
};
export declare const MantisProvider: (props: ParentProps & {
    providerType: "MM" | "SS" | "L" | "P";
}) => import("solid-js").JSX.Element;
export declare function useMantisProvider(): MantisState | undefined;
//# sourceMappingURL=mantis.d.ts.map