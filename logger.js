// const logStyle1 = 'color:red; font-size:16px; font-weight: 900; -webkit-text-stroke: 1px white;';
const logStyle_blue = 'color:blue;'; 
const logStyle_green = 'color:green;';
const logStyle_lightBlue = 'color:lightblue;'; 
const logStyle_maroon = 'color:maroon; font-weight: 900;';
const logStyle_orange = 'color:orange;';
const logStyle_white = 'color:white;';
const logStyle_yellow = 'color:yellow;';
const logStyle_redUnder = 'color:red; font-weight: 900; text-decoration: underline;';
const logStyle_maroonUnder = 'color:maroon; font-weight: 900; text-decoration: underline;';


window.isLoggingOn = true; //false
const isLoggingOn = window.isLoggingOn;
console.error("window.isLoggingOn = %s", isLoggingOn);
console.error("const isLoggingOn = window.isLoggingOn = %s", isLoggingOn);


function log2(level, callerName) {
  //set default colors - later we'll customize
  //per use case/param switc
  let logStyle1 = logStyle_green;
  let logStyle2 = logStyle_white;
  let logStyle3 = logStyle_maroonUnder;
  let logStyle4 = logStyle_maroon;

  if (!isLoggingOn) return;  
  let LLPrefix = "";

  let consoleFunc;
  switch (level) {
    case 1: consoleFunc = console.error; break;
    case 2: consoleFunc = console.warn; break;
    case 3: consoleFunc = console.log; break;
    case 4: consoleFunc = console.debug; break;
    case 41: 
      logStyle1 = logStyle_green;
      logStyle2 = logStyle_white;
      consoleFunc = console.debug;
      LLPrefix = "LLV1:";
      break;
    case 42:
      logStyle1 = logStyle_white;
      logStyle2 = logStyle_green;
      consoleFunc = console.debug;
      LLPrefix = "LLV2:";
      break;    
    case 43:
      logStyle1 = logStyle_lightBlue;
      logStyle2 = logStyle_yellow;
      consoleFunc = console.debug;
      LLPrefix = "LLV3:";
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
    LLPrefix = (LLPrefix === undefined || LLPrefix === null) ? "" : "%c" + `${LLPrefix}`;

    loc = (loc === undefined || loc === null) ? "" : `%c${loc}`;
    callrName = (callrName === undefined || callrName === null) ? "" : "%c" + `${callrName}`;

    msg1 = (msg1 === undefined || msg1 === null || msg1 == "") ? "" : "%c" + `${msg1}`;
    msg2 = (msg2 === undefined || msg2 === null || msg2 == "") ? "" : "%c" + `${msg2}`;
    msg3 = (msg3 === undefined || msg3 === null || msg3 == "") ? "" : "%c" + `${msg3}`;
    msg4 = (msg4 === undefined || msg4 === null || msg4 == "") ? "" : "%c" + `${msg4}`;    

    consoleFunc(LLPrefix + loc + callrName + " : " + msg1 + msg2 + msg3 + msg4, 
      logStyle1, logStyle2, logStyle1, logStyle2, logStyle1, logStyle2
    );
  };


  return ({ //  return object containing specific funcs(top, btm, next, prev)
    w: function w(msg1, msg2, msg3, msg4)  {
      writeIt(null, null, msg1, msg2, msg3, msg4);
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