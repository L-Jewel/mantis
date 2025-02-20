export type MathJaxData = {
    data: string;
    type: string;
    rawData?: string;
    display?: boolean;
};
export type Delimiter = {
    right: string;
    left: string;
    display: boolean;
};
export default function splitAtDelimiters(text: string, delimiters: Delimiter[]): MathJaxData[];
//# sourceMappingURL=splitAtDelimiters.d.ts.map