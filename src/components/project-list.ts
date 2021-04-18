/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />

namespace App{
    export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
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
        new ProjectItem(this.element.querySelector("ul")!.id, proj);
      }
    }

    @AutoBind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer?.types[0] == "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @AutoBind
    dragLeaveHandler(event: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    @AutoBind
    droppedHandler(event: DragEvent) {
      const projId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        projId,
        this.type == "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.droppedHandler);

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
}