let userInput : unknown;

userInput = 5;
userInput = 'Nandu';

let userName : string;

//userName = userInput // gives compile error , would have worked with 'any' but will not have any type checking that TS offers if any was used

if(typeof userInput == 'string'){   // this is allowed as type is checked for string
    userName = userInput
}

function generateError(message : string , code : number) : never{ // If never is not specified explicitly, it would be infered as void as never is newly introduced
    throw {message : message , errorCode : code }
    // while (true) {} // another case where never can be used - infinite loops
}

generateError('An Error Occurred !!!',500);