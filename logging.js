// const logStyle1 = 'color:red; font-size:16px; font-weight: 900; -webkit-text-stroke: 1px white;';
const logStyle_RedUnder = 'color:red; font-weight: 900; text-decoration: underline;';
const logStyle_Green = 'color:green;';
const logStyle_MaroonUnder = 'color:maroon; font-weight: 900; text-decoration: underline;';
const logStyle_Maroon = 'color:maroon; font-weight: 900;';
const logStyle_White = 'color:white;';
const logStyle1 = logStyle_White;
const logStyle2 = logStyle_Green;
const logStyle3 = logStyle_White; //logStyle_MaroonUnder;
const logStyle4 = logStyle_Green; //logStyle_Maroon;


window.isLoggingOn = true; //false
const isLoggingOn = window.isLoggingOn;
console.log("window.isLoggingOn = %s", isLoggingOn);
console.log("const isLoggingOn = window.isLoggingOn = %s", isLoggingOn);


function log2_old(msg, callerName) {
  if (!isLoggingOn) return;
  if (callerName === undefined || callerName === "") {    
    callerName = log2.caller.name;
    console.warn("In 'log2()': PARAM {callerName} is NULL => using {log2.caller.name}");
    if (callerName === undefined || callerName === ""){
      callerName = "anonymous";
      console.warn("In 'log2()': PARAM {log2.caller.name} is NULL => using 'anonymous'");
    }
  }
  //  this log2() function must be hardcoded to do further logging at the 
  //  "Warn" level by literally passing "console.warn()" method as a param
  //  (levels=Error, Warn, Info, Verbose/Debug > levels=1,2,3,4)
  return log(msg, callerName, console.warn);
}

function log2(level, callerName) {
  if (!isLoggingOn) return;  
  let logLvlPrefix = "";

  let consoleFunc;
  switch (level) {
    case 1: consoleFunc = console.error; break;
    case 2: consoleFunc = console.warn; break;
    case 3: consoleFunc = console.log; break;
    case 4: consoleFunc = console.debug; break;
    case 41: 
      consoleFunc = console.debug;
      logLvlPrefix = "LLV1: ";
    break;
    default:
      throw `LOGGING ERROR => 1st PARAM('${level}') is invalid. Only values [1,2,3, or 4] are valid!`
  }  

  if (callerName === undefined || callerName === "") {
    callerName = log2.caller.name;
    console.debug("In 'log2()': PARAM {callerName} is NULL => using {log2.caller.name}");
    if (callerName === undefined || callerName === "") {
      callerName = "anonymous";
      console.debug("In 'log3()': PARAM {log2.caller.name} is NULL => using 'anonymous'");
    }
  }

    
  function writeIt(loc, msg1, msg2) {
    if (loc === undefined || loc === null) {
      //if (msg1 ===undefined || msg2 === undefined) throw "UNDEFINED msg1 OR msg2 in 'writeIt()"
      //if (msg1 === undefined || msg2 === undefined) {
      //  console.error("UNDEFINED msg1 OR msg2 internal func log2.writeIt() => RETURNING");
      //  return;
      //} else {
      //  // we don't add the words "Inside Of" or anything else
        consoleFunc(`${logLvlPrefix}%c${msg1}: %c${msg2} %c.`, logStyle1, logStyle2, logStyle1);
      //}
    } else {
      if (msg1 === undefined) {
        msg1 = "";
      } else {
        msg1 = " => " + msg1;
      }    
    }
    consoleFunc("%c%s: %c'%s()'%c%s.", logStyle1, loc, logStyle2, callerName, logStyle1, msg1);
  };


  return ({ //  return object containing specific funcs(top, btm, next, prev)
    w1: function w(msg1)  {
      writeIt("", msg1,"")
    },
    w2: function w2(msg1, msg2) {
      writeIt("", msg1, msg2);
    },
    inside: function inside(msg){
      writeIt("Inside of: ",msg);      
    },
    top: function top(msg) {
      //consoleFunc("%c                                            ", logStyle1);
      // ("%cTop of%c: '%s()'",logStyle1,logStyle2,callerName);
      writeIt("Top of: ",msg);
    },
    btm: function btm(msg) {
      writeIt("Bottom of: ",msg);
      // consoleFunc("%cBottom of%c: '%s()'",logStyle3,logStyle2,callerName);
      consoleFunc("%c--------------------------------------------", logStyle4);
    },
    next: function next(callNextName) {
      consoleFunc("%cInside of: %c'%s()'%c, Next: %c'%s.'", logStyle1, logStyle2, callerName, logStyle3, logStyle4, callNextName);
    },
    prev: function prev(callNextName) {
      consoleFunc("%cInside of: %c'%s()'%c, Prev: %c'%s.'", logStyle1, logStyle2, callerName, logStyle3, logStyle4, callNextName);
    }
  }); //END return of log() function

}


window.logger = log2;
console.log("window.logger = log2");