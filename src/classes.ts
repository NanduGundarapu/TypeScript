abstract class Department {   // only abstract classes can have abstract methods , abstract class can't be instantiated
  //   private id : string;
  //   private name: string;
  protected employees: string[] = [];
  static fiscalYear = 2020;

  constructor(protected readonly id: string, protected name: string) {
    // takes care of both initializations
    //   this.id = id;
    //   this.name = name;

    // this.fiscalYear // will not work as static properties and methods wont need an instance and will not be available on instance
    // Department.fiscalYear  // works for such needs
  }
  
  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe() : void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees);
  }
}

// new Department("d3","Department")  does'nt work as Department is abstract class

class AccountingDepartment extends Department {
  private lastReport: string = "";
  private static instance : AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;

    throw new Error("No reports");
  }

  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error("Enter a valid report");
    }

    this.addReport(report);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }
  addEmployee(name: string) {
    if (name == "Nandu") return;

    this.employees.push(name);
  }
  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }
  printReports() {
    console.log(this.reports);
  }

  describe(){
    console.log(`Accounting Department - name : ${this.name}, Id : ${this.id}`);
  }

  static getInstance(){
    if(AccountingDepartment.instance){   // this inside static method will refer to class so both this and AccouuntingDepartment 
      return this.instance;              // does the same thing inside static method
    }
    this.instance = new AccountingDepartment("d1",[]);
    return this.instance;
  }
  
}

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

accounting.describe();
accounting.addEmployee("Nandu");
accounting.addEmployee("Chinni");

// accounting.employees.push("hacker"); // private helps avoid such alternate ways to access from outside class

console.log(accounting,accounting2);  // accounting and accounting 2 is the same instance and Accounting Department is a singleton 

accounting.printEmployeeInformation();

//console.log(accounting.mostRecentReport);

accounting.addReport("Something went wrong!!");
accounting.mostRecentReport = "Another Report";
console.log(accounting.mostRecentReport);

accounting.printReports();

// const copy = { name: "nandu", describe: accounting.describe };
// copy.describe();
// console.log(copy);

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT"); // can super call constructor to intitialize inherited props and then initialize local props
    this.admins = admins;
  }
  describe(){
    console.log(`IT Department - name : ${this.name}, Id : ${this.id}`);
  }
}

const it = new ITDepartment("d2", ["Nandy", "kishore"]);
it.describe();
it.addEmployee("Nandu");
it.addEmployee("Chinni");

console.log(it);

it.printEmployeeInformation();

console.log(Department.createEmployee("nandu"), Department.fiscalYear); //static methods and prperties inside Department can be called without instance
