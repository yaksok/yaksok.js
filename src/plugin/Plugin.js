import NodeVisitor from '~/ast/NodeVisitor';

export default class Plugin extends NodeVisitor {
    constructor(config={}) {
        super();
        this.config = config;
        this.compiler = null;
    }
    get phase() { return null; }
    async run(astRoot) {
        await this.init();
        await this.visit(astRoot);
    }
}
