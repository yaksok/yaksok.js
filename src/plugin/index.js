import { NodeVisitor } from 'ast';

export default class Plugin extends NodeVisitor {
    constructor(config={}) {
        super();
        this.config = config;
    }
    async run(astRoot) {
        await this.init();
        await this.visit(astRoot);
    }
}
