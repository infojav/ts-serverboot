import { LogLevel, LogOutput } from './types';
import SystemConsole from './system-console';

export class Logger {

    constructor(
            private level: LogLevel =  LogLevel.Error,
            private output: LogOutput = new SystemConsole ) {
    }

    time(label: string): Logger {
        if (!this.output.time || this.level === LogLevel.None) { return this; }
        this.output.time(label);
        return this;
    }

    timeEnd(label: string): Logger {
        if (!this.output.time || !this.output.timeEnd || this.level === LogLevel.None) { return this; }
        this.output.timeEnd(label);
        return this;
    }

    none(): Logger {
        return this;
    }

    trace(...msg): Logger {
        if (this.level > LogLevel.Trace) { return this; }
        this.output.trace(msg);
        return this;
    }

    debug(...msg): Logger {
        if (this.level > LogLevel.Debug) { return this; }
        this.output.debug(msg);
        return this;
    }

    info(...msg): Logger {
        if (this.level > LogLevel.Info) { return this; }
        this.output.info(msg);
        return this;
    }

    warn(...msg): Logger {
        if (this.level > LogLevel.Warn) { return this; }
        this.output.warn(msg);
        return this;
    }

    error(...msg): Logger {
        if (this.level > LogLevel.Error) { return this; }
        this.output.error(msg);
        return this;
    }

    fatal(...msg): Logger {
        if (this.level > LogLevel.Fatal) { return this; }
        this.output.fatal(msg);
        return this;
    }

    do(fn: Function): Logger {
        fn();
        return this;
    }

    mute(): Logger {
        this.level = LogLevel.None;
        return this;
    }

    unMute(newLevel: LogLevel): Logger {
        this.level = newLevel;
        return this;
    }

    get logLevel(): LogLevel {
        return this.level;
    }

    set logLevel(newLevel: LogLevel) {
        this.level = newLevel;
    }
}
