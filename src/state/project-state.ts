namespace App {
  type Listner<T> = (items: T[]) => void;
  class State<T> {
    protected listeners: Listner<T>[] = [];
    addListner(listernerFn: Listner<T>) {
      this.listeners.push(listernerFn);
    }
  }

  export class ProjectState extends State<Project> {
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

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((proj) => proj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListerners();
      }
    }

    private updateListerners() {
      for (const listener of this.listeners) {
        listener(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
