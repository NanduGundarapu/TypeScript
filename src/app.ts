function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <
    T extends {
      new (...args: any[]): {
        firstName: string;
        lastName: string;
        initial: string;
        role: string;
      };
    }
  >(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super(..._);
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector(
            "h1"
          )!.textContent += `${this.firstName} ${this.lastName} ${this.initial}`;
          hookEl.querySelector("h2")!.textContent += this.role;
        }
      }
    };
  };
}

@Logger("Logging In....")
@WithTemplate("<h1>Welcome - </h1><h2>Role - <h2>", "app")
class Person {
  role = "Developer";
  constructor(
    public firstName: string,
    public lastName: string,
    public initial: string
  ) {
    console.log("Creating Person object....");
  }
}

const pers = new Person("Nanda", "Kishore", "G");
// console.log(pers);

function Log(target: any, propertyName: string | symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator!");
  console.log(target, name, descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target, name, descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target, name, position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else new Error("Value cant be negative");
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

//Auto Bind Method Decorator example
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This Works!!";
  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);


//Validation using Decorators

interface ValidatorConfig{
  [property : string] : {
    [validatableProp : string] : string[]; // ['required','positive']
  }
}

const registeredValidators : ValidatorConfig = {};

function RequiredInput(target : any,propName : string){
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName] : [...registeredValidators[target.constructor.name][propName],'required']
  }
}

function PositiveNumber(target : any,propName : string){
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName] : [...registeredValidators[target.constructor.name][propName],'positive']
  }
}

function validate(obj : any){
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig){
    return true;
  }

  let isValid = true;
  for(const prop in objValidatorConfig){
    for(const validator of objValidatorConfig[prop]){
      switch(validator){
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {

  @RequiredInput
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit',event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;
  const createdCourse = new Course(titleEl.value,+priceEl.value);
  if(!validate(createdCourse)){
    alert('Invalid input.Please try again');
    return;
  }
  console.log(createdCourse);
})
