import NodeVisitor from '~/ast/NodeVisitor';
import { Compiler, CompilerConfig, PluginPhase } from '~/compiler';
import { YaksokRoot } from '../ast';

export default abstract class Plugin extends NodeVisitor {
    compiler: Compiler | null = null;
    abstract phase: PluginPhase;

    async run(astRoot: YaksokRoot, config: CompilerConfig): Promise<YaksokRoot>;
    async run(astRoot: null, config: CompilerConfig): Promise<null>;
    async run(astRoot: YaksokRoot | null, config: CompilerConfig): Promise<YaksokRoot | null> {
        await this.init();
        if (astRoot != null) {
            await this.visit(astRoot);
        }
        return null;
    }
}
