import { BluefishError } from './errors';
export type ErrorContextType = {
    errors: BluefishError[];
    addError: (error: BluefishError) => void;
};
export declare const createErrorContext: (onError: (error: BluefishError) => void) => ErrorContextType;
export declare const ErrorContext: import('solid-js').Context<ErrorContextType | null>;
export declare const useError: () => (error: BluefishError) => void;
//# sourceMappingURL=errorContext.d.ts.map