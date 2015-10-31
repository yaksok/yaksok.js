import Plugin from 'plugin';

export default class ConstantFolder extends Plugin {
    async visitPlainStatement(node) {
        node.expression = node.expression.fold();
    }
    async visitAssign(node) {
        node.rvalue = node.rvalue.fold();
    }
}
