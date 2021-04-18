export enum ProjectStatus {
  Active,
  Finished,
}

export class Project {
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
