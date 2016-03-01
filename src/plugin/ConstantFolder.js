import Plugin from 'plugin/Plugin';
import * as ast from 'ast';
import { AFTER_ANALYZE } from 'compiler';

export default class ConstantFolder extends Plugin {
    get phase() { return AFTER_ANALYZE; }
    async visitExpression(node) {
        node.fold();
    }
    async visitStatements(node) {
        for (let statement of Array.from(node)) {
            if (!this.config.dce) {
                await this.visitStatement(statement);
                continue;
            }
            let replacement = statement.eliminateDeadCode(); // dce
            if (replacement) {
                if (replacement instanceof ast.Statements) {
                    node.replaceChild(statement, replacement);
                    for (let statement of replacement) {
                        await this.visitStatement(statement);
                    }
                    continue;
                }
                if (replacement instanceof Statement) {
                    node.replaceChild(statement, replacement);
                    await this.visitStatement(replacement);
                    continue;
                }
                if (replacement === true) {
                    node.removeChild(statement);
                    continue;
                }
                throw new Error('dce must return boolean or ast.Statements or ast.Statement');
            } else {
                await this.visitStatement(statement);
            }
        }
    }
}
