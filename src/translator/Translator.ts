import { YaksokRoot } from '~/ast';
import NodeVisitor from '~/ast/NodeVisitor';
import { Compiler } from '~/compiler';

export default class Translator extends NodeVisitor {
    compiler: Compiler | null = null;

    async translate(astRoot: YaksokRoot): Promise<string> {
        await this.init();
        await this.visit(astRoot);
        return '';
    }
};
