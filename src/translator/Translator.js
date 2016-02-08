import { NodeVisitor } from 'ast';

export default class Translator extends NodeVisitor {
    async translate(astRoot) {
        await this.init();
        await this.visit(astRoot);
    }
};
