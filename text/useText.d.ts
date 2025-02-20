import { TextProps, WordsWithDims } from './types';
import { Accessor } from 'solid-js';
export default function useText(props: TextProps): {
    wordsByLines: Accessor<WordsWithDims[]>;
    startDy: Accessor<string>;
    transform: Accessor<string>;
};
//# sourceMappingURL=useText.d.ts.map