import { Logger, LogLevel } from './util';


// Singleton ???? or Dependency injection
let log = new Logger(LogLevel.Trace);

log.info("timer to check")
    .time('time-elapsed')
//    .do(function() { console.log("hola"); })
    .timeEnd('time-elapsed');

log.time('time-elapsed')
// log.do(function() { console.log("hola"); })
log.timeEnd('time-elapsed');

//log.error({ 1:'info !"!', 2:'asda', 3:'asdasda'}, "sd");

