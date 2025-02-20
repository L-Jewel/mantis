import { TextProps, WordsWithDims } from './types';
type FnProps = TextProps & {
    wordsByLines: WordsWithDims[];
    startDy: string;
    transform: string;
};
declare function computeBoundingBox(props: FnProps): {
    x: number;
    y: number;
    width: number;
    height: number;
};
export default computeBoundingBox;
//# sourceMappingURL=textBBox.d.ts.map