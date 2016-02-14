import { Plugin } from 'plugin';
import { AFTER_ANALYZE } from 'compiler';

export default class UnusedDefRemover extends Plugin {
    get phase() { return AFTER_ANALYZE; }
    async visitDef(node) {
        if (!node.used) {
            node.parent.removeChild(node);
        }
    }
}
