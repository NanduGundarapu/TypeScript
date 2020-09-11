//type addFn = (a : number , b : number) => number;

interface AddFn{        // interface with function type , similar to function type shown above
    (a : number , b : number ) : number;
}

interface Named{
    readonly name? : string;    // properties cant be initialized like name : string = "Nandu" 
    outputName? : string;
}

interface Greetable extends Named { 
    greet(phrase? : string) : void;
}

let user1 : Greetable;
let user2 : Greetable;

class Person implements Greetable{
    name? : string;
    age = 26;
    constructor(n? : string){
        if(n){
            this.name = n;
        }
    }
    greet(phrase? : string){
        if(this.name){
            console.log(phrase+" "+this.name);
        }
        else{
            console.log('Hi!!!');
        }
    }
}
user1 = new Person("Nandu");
user2 = new Person(); // uses optional properties

//user1.name = "Nanda" // gives compile error as name is readonly in the interface

user1.greet("Hi there, Iam");

console.log(user1);

user2.greet();

console.log(user2);
