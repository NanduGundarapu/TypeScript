type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // intersection type

const el: ElevatedEmployee = {
  name: "Nandu",
  privileges: ["create-server"],
  startDate: new Date(),
};

console.log(el);

//can also be implemented using interfaces as shown below
// interface IAdmin{
//     name : string;
//     privileges : string[];
// }

// interface IEmployee{
//     name : string;
//     startDate : Date;
// }

// interface IElevatedEmployee extends IEmployee,IAdmin{}

// const iel : IElevatedEmployee = {
//     name : 'Nandu',
//     privileges : ['create-server'],
//     startDate : new Date()
// }

// console.log(iel);

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // Universal will be of type number

//Function overloads to give typescript knowlege about return type expected

function add(a:number,b:number) : number;
function add(a:string,b:string) : string;
function add(a:number,b:string) : string;
function add(a:string,b:number) : string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string")
    // this is called type guard using typeof
    return a.toString() + b.toString();
  else return a + b;
}

const result = add('Nanda ','Kishore'); // with overloads type script infers result correctly as string
result.split(" ")

const fetchedUserData = {
  id : 'u1',
  name : 'Nanda',
  //job : { title : 'CEO' , description : 'My imaginary company'}
}

//console.log(fetchedUserData?.job?.title); // optional chaining

const userInput = undefined;

const storageData = userInput ?? 'DEFAULT'; // userInput || 'DEFAULT' returns 'DEFAULT' if userInput is undefined or null or '' or 0
console.log(storageData);                   // Nullish coalescing operator ?? returns 'DEFAULT' only if userinput is null or undefined

type UnknownEmployee = Admin | Employee;

// another use case for type guard is when union type is to be checked
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name " + emp.name);

  if ("privileges" in emp) {
    console.log("Previleges " + emp.privileges);
  }

  if ("startDate" in emp) {
    console.log("Start Date " + emp.startDate);
  }
}

printEmployeeInformation(el);

printEmployeeInformation({ name: "Nandu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving a car...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck)
    //more elegant way instead of doing 'loadCargo' in vehicle
    vehicle.loadCargo(1000); // when working with union types and classes
}

useVehicle(v1);
useVehicle(v2);


//Descriminated unions
interface Bird {
  type : 'bird';
  flyingSpeed: number;
}

interface Horse {
  type : 'horse'
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
      case 'bird':
        speed = animal.flyingSpeed;
        break;
      case 'horse':
        speed = animal.runningSpeed;
    }
    console.log('Moving with speed : '+ speed);
}

moveAnimal({type:'bird',flyingSpeed : 10});

moveAnimal({type:'horse',runningSpeed: 10});

//const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;   // works with typescript , but causes conflicts with react js syntax

const userInputElement = document.getElementById('user-input')! as HTMLInputElement ; // works for React JSX syntax too 
userInputElement.value = 'Hi buddy!';

//alternative to '!'
// const userInputElement = document.getElementById('user-input');
// if(userInputElement){
//   (userInputElement as HTMLInputElement).value = 'Hi there!';
// }

interface ErrorContainer{
  [prop:string]: string;
}

const errorBag : ErrorContainer = {
  email : 'Not a valid email!!',
  username : 'Must start with a capital letter'
}
console.log(errorBag);