import NodeVisitor from '~/ast/NodeVisitor';

export default class Translator extends NodeVisitor {
    async translate(astRoot) {
        await this.init();
        await this.visit(astRoot);
    }
};
