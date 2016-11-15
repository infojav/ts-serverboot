
export class CliArgs {
    private _args: any = {};

    constructor() {
        this._args = require('minimist')(process.argv.slice(2));

    }

    get(args?: string[]) {
        let filteredArgs: any = {};

        if (args && Array.isArray(args)) {
            args.forEach(function(key) {
                if (this._args[key]) {
                    filteredArgs[key] = this._args[key]
                }
            });
            return filteredArgs;
        } else {
            return this._args;
        }
    }
}
