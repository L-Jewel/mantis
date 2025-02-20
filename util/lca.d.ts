export type Tree = {
    [key: string]: {
        parent: string | null;
    };
};
export declare const getAncestorChain: (scenegraph: Tree, id: string) => string[];
export declare const getLCAChain: (scenegraph: Tree, id1: string, id2: string) => string[];
export declare const getLCAChainSuffixes: (scenegraph: Tree, id1: string, id2: string) => [string[], string[]];
//# sourceMappingURL=lca.d.ts.map