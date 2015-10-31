import { NodeVisitor } from 'ast';

export default class Plugin extends NodeVisitor {
    async run(astRoot) {
        this.init();
        await this.visit(astRoot);
    }
}
