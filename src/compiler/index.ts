export const BEFORE_RESOLVE = {} as const;
export const AFTER_RESOLVE = {} as const;
export const BEFORE_ANALYZE = {} as const;
export const AFTER_ANALYZE = {} as const;
export const BEFORE_TRANSLATE = {} as const;
export const AFTER_TRANSLATE = {} as const;
export type PluginPhase =
    | typeof BEFORE_RESOLVE
    | typeof AFTER_RESOLVE
    | typeof BEFORE_ANALYZE
    | typeof AFTER_ANALYZE
    | typeof BEFORE_TRANSLATE
    | typeof AFTER_TRANSLATE
    ;

export { default as Compiler } from './Compiler';
export { default as JsTargetCompiler } from './JsTargetCompiler';
