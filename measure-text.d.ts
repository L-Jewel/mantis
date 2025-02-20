export type TextMeasurement = {
    left: number;
    right: number;
    width: number;
    fontTop: number;
    fontBottom: number;
    fontHeight: number;
    baseline: number;
    fontDescent: number;
    actualDescent: number;
};
export declare function measureText(text: string, font: string): TextMeasurement;
export declare namespace measureText {
    const element: HTMLCanvasElement;
    const context: CanvasRenderingContext2D;
}
//# sourceMappingURL=measure-text.d.ts.map