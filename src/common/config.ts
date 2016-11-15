import { Config as BaseConfig } from './../util';

const DEFAULT_CONFIG_FILE = './../config.json';


export class Config extends BaseConfig {

    constructor(options?: any, configFile = DEFAULT_CONFIG_FILE) {
        super(options, configFile);
    }
};