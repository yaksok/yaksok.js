export Parser from 'parser';
export Compiler from 'compiler';
export Plugin from 'plugin';

import JsTargetCompiler from 'compiler/js';
export var impl = {
    JsTargetCompiler
};

import ConstantFolder from 'plugin/ConstantFolder';
export var plugin = {
    ConstantFolder
};

import { CommonContext } from 'module';
export var context = {
    CommonContext
};
