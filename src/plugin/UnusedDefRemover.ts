import * as ast from '~/ast';
import Plugin from '~/plugin/Plugin';
import { AFTER_ANALYZE } from '~/compiler';

export default class UnusedDefRemover extends Plugin {
    get phase() { return AFTER_ANALYZE; }
    async visitDef(node: ast.Def) {
        if (!node.used && node.parent instanceof ast.AstNodeList) {
            node.parent?.removeChild(node);
        }
    }
}
