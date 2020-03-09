export const BEFORE_RESOLVE = { phase: 'BEFORE_RESOLVE' as const };
export const AFTER_RESOLVE = { phase: 'AFTER_RESOLVE' as const };
export const BEFORE_ANALYZE = { phase: 'BEFORE_ANALYZE' as const };
export const AFTER_ANALYZE = { phase: 'AFTER_ANALYZE' as const };
export const BEFORE_TRANSLATE = { phase: 'BEFORE_TRANSLATE' as const };
export const AFTER_TRANSLATE = { phase: 'AFTER_TRANSLATE' as const };
export type PluginPhase =
    | typeof BEFORE_RESOLVE
    | typeof AFTER_RESOLVE
    | typeof BEFORE_ANALYZE
    | typeof AFTER_ANALYZE
    | typeof BEFORE_TRANSLATE
    | typeof AFTER_TRANSLATE
    ;

export { default as Compiler, CompilerConfig } from './Compiler';
export { default as JsTargetCompiler } from './JsTargetCompiler';
