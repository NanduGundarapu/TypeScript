/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App{
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
    
        constructor() {
          super("project-input", "app", true, "user-input");
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
    
        renderContent() {}
    
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
}