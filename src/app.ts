interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length != 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value == "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value == "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}


function AutoBind(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    enumerable: true,
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjDescriptor;
}

enum ProjectStatus {
  Active,
  Finished,
}


class Project {
  id: string;
  title: string;
  description: string;
  people: number;
  status: ProjectStatus;

  constructor(
    id: string,
    t: string,
    desc: string,
    n: number,
    status: ProjectStatus
  ) {
    this.id = id;
    this.title = t;
    this.description = desc;
    this.people = n;
    this.status = status;
  }
}

type Listner<T> = (items: T[]) => void;
class State<T>{
  protected listeners: Listner<T>[] = [];
  addListner(listernerFn: Listner<T>) {
    this.listeners.push(listernerFn);
  }
}


class ProjectState extends State<Project>{
  
  private projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListerners();
  }

  moveProject(projectId : string ,  newStatus : ProjectStatus){
    const project = this.projects.find(proj => proj.id === projectId );
    if(project && project.status !== newStatus){
      project.status = newStatus;
      this.updateListerners();
    }

  }

  private updateListerners(){
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }

}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;
  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateEl = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtStart : boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtStart == true ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure() : void;
  abstract renderContent() : void;

}

//Drag and Drop Interface
interface Draggable{
  dragStartHandler(event : DragEvent) : void;
  dragEndHandler(event : DragEvent) : void;
}

interface DragTarget{
  dragOverHandler(event : DragEvent) : void;
  droppedHandler(event : DragEvent) : void;
  dragLeaveHandler(event : DragEvent) : void;
}
class ProjectItem extends Component<HTMLUListElement,HTMLLIElement>
implements Draggable{
  private project : Project;
  get Persons(){
    if(this.project.people == 1){
      return '1 person';
    }
    return `${this.project.people} persons`;
  }
  constructor(hostId : string , project : Project){
    super("single-project",hostId,false,project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  configure(){
    this.element.addEventListener('dragstart',this.dragStartHandler);
    this.element.addEventListener('dragend',this.dragEndHandler);
  }

  @AutoBind
  dragStartHandler(event : DragEvent){
    event.dataTransfer!.setData('text/plain',this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(event : DragEvent){
    console.log('Drag End');
  }

  renderContent(){
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.Persons;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> 
implements DragTarget{
  assignedProjects: Project[] = [];
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const proj of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id,proj);
    }
  }

  @AutoBind
  dragOverHandler(event : DragEvent){
    if(event.dataTransfer?.types[0] == 'text/plain'){
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @AutoBind
  dragLeaveHandler(event : DragEvent){
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  @AutoBind
  droppedHandler(event : DragEvent){
    const projId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(projId,this.type == 'active' ? ProjectStatus.Active : ProjectStatus.Finished  );
  }

  configure(){

    this.element.addEventListener('dragover',this.dragOverHandler);
    this.element.addEventListener('dragleave',this.dragLeaveHandler);
    this.element.addEventListener('drop',this.droppedHandler);

    projectState.addListner((projects: Project[]) => {
      this.assignedProjects = projects.filter((proj) => {
        if (this.type == "active") {
          return proj.status === ProjectStatus.Active;
        }
        return proj.status === ProjectStatus.Finished;
      });
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} - PROJECTS`;
  }
}

class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input","app",true,"user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  renderContent(){
    
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable = { value: enteredTitle, required: true };
    const descValidatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input");
      return;
    } else return [enteredTitle, enteredDescription, +enteredPeople];
  }

}

const project = new ProjectInput();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
