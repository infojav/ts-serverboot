import { LogOutput } from './types';

export default class SystemConsole implements LogOutput {
    time = console.time;
    timeEnd = console.timeEnd;
    trace = console.trace;
    debug = console.log;
    info = console.info;
    warn = console.warn;
    error = console.error;
    fatal = console.error;

    constructor() {
        if (console == undefined) { throw Error("'console' need be a global function."); }
    }
}