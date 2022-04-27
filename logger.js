// const logStyle1 = 'color:red; font-size:16px; font-weight: 900; -webkit-text-stroke: 1px white;';
const logStyle_RedUnder = 'color:red; font-weight: 900; text-decoration: underline;';
const logStyle_Green = 'color:green;';
const logStyle_MaroonUnder = 'color:maroon; font-weight: 900; text-decoration: underline;';
const logStyle_Maroon = 'color:maroon; font-weight: 900;';
const logStyle_White = 'color:white;';
const logStyle1 = logStyle_Green; 
const logStyle2 = logStyle_White;
const logStyle3 = logStyle_MaroonUnder;
const logStyle4 = logStyle_Maroon;


window.isLoggingOn = true; //false
const isLoggingOn = window.isLoggingOn;
console.log("window.isLoggingOn = %s", isLoggingOn);
console.log("const isLoggingOn = window.isLoggingOn = %s", isLoggingOn);


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
      logLvlPrefix = "LLV1:";
      break;
    case 42:
      consoleFunc = console.debug;
      logLvlPrefix = "LLV2:";
      break;    
    case 43:
      consoleFunc = console.debug;
      logLvlPrefix = "LLV3:";
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

    
  function writeIt(loc, callrName, msg1, msg2, msg3, msg4) {
    if (loc === undefined || loc === null) loc = "";
    if (callrName === undefined || callrName === null) callrName = "";
    if (msg1 === undefined || msg1 === null) msg1 = "";
    if (msg2 === undefined || msg2 === null) msg2 = "";        
    if (msg3 === undefined || msg3 === null) msg3 = "";        
    if (msg4 === undefined || msg4 === null) msg4 = "";        
    consoleFunc(`${logLvlPrefix} %c${loc}%c${callrName}: %c${msg1}%c${msg2}%c${msg3}%c${msg4}`, 
      logStyle1, logStyle2, logStyle1, logStyle2, logStyle1, logStyle2
    );
  };


  return ({ //  return object containing specific funcs(top, btm, next, prev)
    w: function w(msg1, msg2, msg3, msg4)  {
      writeIt("", "", msg1, msg2, msg3, msg4);
    },
    inside: function inside(msg1, msg2) {
      writeIt("Inside of: ", callerName, msg1, msg2);
    },
    top: function top(msg1, msg2) {
      writeIt("Top of: ", callerName, msg1, msg2);
    },
    btm: function btm(msg1, msg2) {
      writeIt("Bottom of: ", callerName, msg1, msg2);
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