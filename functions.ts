function add(n1 : number , n2 : number){ // return type inferred automatically , but can also be set explicitly using  :
    return n1 + n2;
}

function printResult(num : number) : void{ // void is inferred if function doesnt return anything , void is just mentioned for no reason
    console.log('Result is ',num);
}

// function printResult(num : number) : undefined{  // undefined is valid type but expects return , use void if you dont have return statement
//     console.log('Result is ',num);
//     return;
// }

function addAndHandle(n1 : number , n2 : number , cb : (num : number) => void){
    let result = n1 + n2;
    cb(result);
}

printResult(add(5,12));

let combinedValues: (a : number , b : number ) => number ; // without parameters andreturn type : Function can be used but stricness will be lost

combinedValues = add;

//combinedValues = printResult; // doesnt give compile error , but gives runtime error . Need Function types to give compile error

//combinedValues = 5; // possible but gives runtime error no compile error without using function type , using Function type gives compile error

console.log(combinedValues(8,8));

addAndHandle(10,20, (result) => {
    console.log(result);
    return result;  // return here doesnt cause problems as return type is void in cb definition as void there means it doesnt care what is returned
})