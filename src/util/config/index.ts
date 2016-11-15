import { CliArgs } from './../args';

const DEFAULT_ENVIRONMENT = environment.developemnt;
const DEFAULT_DEV_KEY = 'dev';
const DEFAULT_CONFIG_COMMENTS_KEY = '_description';
const DEFAULT_CONFIG_FILE = './../config.json';

const enum environment {
    production,
    developemnt
}

// configOptions interface

export abstract class Config {
    protected config: any = {};

    private readonly configFile: string = '';
    private readonly devKey: string = '';
    private readonly configCommentsKey: string = '';
    private readonly environment = environment.developemnt;


    constructor( validArgs: string[] = [], configFile = DEFAULT_CONFIG_FILE, devKey: string = DEFAULT_DEV_KEY  ) {
        let parsedConfigFile: any = {};

        if (configFile && configFile != '') {
            parsedConfigFile = this.parseConfigFile(configFile, DEFAULT_ENVIRONMENT, DEFAULT_DEV_KEY)
        }

        this.config = Object.assign(parsedConfigFile, this.getValidArgs(validArgs));

    }

    private parseConfigFile(fileName, env: environment = DEFAULT_ENVIRONMENT, devKey: string = DEFAULT_DEV_KEY) {
        let rawConfig;

        try {
            rawConfig = require(fileName);
        } catch (e) {
            throw new Error('Config file load error');
        }

        // delete comments
        if (rawConfig[DEFAULT_CONFIG_COMMENTS_KEY]) { delete rawConfig[DEFAULT_CONFIG_COMMENTS_KEY]; }

        if (env != environment.production) {
            for (let key in rawConfig[devKey]) {
                if (rawConfig[devKey].hasOwnProperty(key) && key != DEFAULT_CONFIG_COMMENTS_KEY) {
                    rawConfig[key] = rawConfig[devKey][key]; 
                }
            }
        }

        delete rawConfig[devKey];
        return rawConfig;
    }

    getValidArgs(validArgs: Array<string>) {
        let cliArgs = new CliArgs;
        return cliArgs.get(validArgs);
    }

    get() {
        return this.config;
    }

    addKeys(newKeys: any) {
        if (typeof(newKeys) === 'object') {
            for (let key in newKeys) {
                if (newKeys.hasOwnProperty(key)) {
                    this.config[key] = newKeys[key]; 
                }
            }
        }
    }

    deleteKeys(keys: string | Array<string>): void {
        if (typeof keys === 'string') {
            delete this.config[keys];
        } else {
            for (let key of keys) {
                delete this.config[key];
            }
        }
    }
}

