function yaksokCall(yaksok, args) {
    return yaksok(...(args.toJsArray()));
}
