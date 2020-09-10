//Explicit typing for objects
// const person : {
//     name : string;
//     age : number;
// } 

//Type script type inference can also infer type by itself
// const person : {
//     name : string;
//     age : number;
//     hobbies : string[];
//     role : [number,string];
// } = {
//     name : 'Nandu',
//     age : 26,
//     hobbies : ['Sports','Singing'],
//     role : [2,'author']
// }

// Error --- person.role[1] = 10;

// Error --- person.role = [1,'writer',10]

//person.role.push('admin');

enum Role {Admin = 'ADMIN', Author = 3 , Reader } // value of Role.Reader will be 4
const person = {
    name : 'Nandu',
    age : 26,
    hobbies : ['Sports','Singing'],
    role : Role.Author
}

let favoriteActivities : string[];  // any[] -- ['sports',20]
favoriteActivities = ['Sports','20'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase()); //hobby.map() gives error as map works on array and hobby is a string
}

if(person.role == Role.Author){
    console.log('is Author');
}