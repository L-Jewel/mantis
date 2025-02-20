export declare const maybeAdd: (a: number | undefined, b: number | undefined) => number | undefined;
export declare const maybeAddAll: (...xs: (number | undefined)[]) => number | undefined;
export declare const maybeSub: (a: number | undefined, b: number | undefined) => number | undefined;
export declare const maybeMul: (a: number | undefined, b: number | undefined) => number | undefined;
export declare const maybeDiv: (a: number | undefined, b: number | undefined) => number | undefined;
export declare const maybeMax: (xs: (number | undefined)[]) => number | undefined;
export declare const maxOfMaybes: (xs: (number | undefined)[]) => number | undefined;
export declare const maybeMin: (xs: (number | undefined)[]) => number | undefined;
export declare const minOfMaybes: (xs: (number | undefined)[]) => number | undefined;
export declare const maybe: <T, U>(x: T | undefined, f: (x: T) => U) => U | undefined;
//# sourceMappingURL=maybe.d.ts.map