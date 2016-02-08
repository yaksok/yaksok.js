export * as ast from 'ast';
export * as compiler from 'compiler';
export * as translator from 'translator';

export Parser from 'parser';
export Plugin from 'plugin';

import ConstantFolder from 'plugin/ConstantFolder';
export var plugin = {
    ConstantFolder
};

import { CommonContext } from 'module';
export var context = {
    CommonContext
};
