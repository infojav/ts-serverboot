export const enum LogLevel {
    None = 0,
    Trace = 10,
    Debug = 20,
    Info = 30,
    Warn = 40,
    Error = 50,
    Fatal = 60
}

type LogFunction = (...message) => any;

export interface LogOutput {
    time?: (label: string) => any;
    timeEnd?: (label: string) => any;
    trace: LogFunction;
    debug: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: LogFunction;
    fatal: LogFunction;
}
