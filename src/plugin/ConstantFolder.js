import Plugin from 'plugin';
import * as ast from 'ast';

export default class ConstantFolder extends Plugin {
    async visitPlainStatement(node) {
        node.expression = node.expression.fold();
    }
    async visitAssign(node) {
        node.rvalue = node.rvalue.fold();
    }
    async visitStatements(node) {
        for (let i = 0; i < node.length; ++i) {
            let statement = node.childNodes[i];
            if (!this.config.dce) {
                await this.visitStatement(statement);
                continue;
            }
            let replacement = statement.eliminateDeadCode(); // dce
            if (replacement) {
                if (replacement instanceof ast.Statements) {
                    node.childNodes.splice.apply(
                        node.childNodes,
                        [i, 1].concat(replacement.childNodes)
                    );
                    let statement = node.childNodes[i];
                    await this.visitStatement(statement);
                    continue;
                }
                if (replacement instanceof Statement) {
                    node.childNodes[i] = replacement;
                    await this.visitStatement(replacement);
                    continue;
                }
                if (typeof replacement === 'boolean') {
                    node.childNodes.splice(i, 1);
                    continue;
                }
                throw new Error('dce must return boolean or ast.Statements or ast.Statement');
            } else {
                await this.visitStatement(statement);
            }
        }
    }
}
