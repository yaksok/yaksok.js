import NodeVisitor from '~/ast/NodeVisitor';
import { Compiler, PluginPhase } from '~/compiler';
import { YaksokRoot } from '../ast';

export default abstract class Plugin extends NodeVisitor {
    compiler: Compiler | null = null;
    abstract phase: PluginPhase;
    async run(astRoot: YaksokRoot): Promise<YaksokRoot | null> {
        await this.init();
        await this.visit(astRoot);
        return null;
    }
}
