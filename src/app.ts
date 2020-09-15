// const names : Array<string> = [];  // string[]
// names[0].split(' ')

// const promise : Promise<string> = new Promise((resolve,reject) => {
//   setTimeout(()=>{
//     resolve('This is finally done !!');
//   },2000);
// });

// promise.then(data => data.split(' '));

//Generic Types gives flexibility with type support
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Nandu", hobbies: ["sports"] }, { age: 26 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no values";
  if (element.length == 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Nanda", "Kishore"]));
console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe([]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value " + obj[key];
}

console.log(extractAndConvert({ name: "Nandu" }, "name"));

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) == -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Manu");
console.log(textStorage.getItems());

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name:'Max'});
// objStorage.addItem({name:'Manu'});
// objStorage.removeItem({name:'Max'});
// console.log(objStorage.getItems());


//Generic Utitlity Types - Partial and ReadOnly
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

//works for objects too
const names : Readonly<string[]> = ["Nanda","Kishore"];
//names.push("dummy");    // push not allowed

//Use Generic types when you have to lockin to a particular type for an instance , best use case is in classes
//use union types when flexibility is needed when passing paramaters in a function call
