function yaksokCall(yaksok, args) {
    return args ? yaksok(...(args.toJsArray())) : yaksok();
}
