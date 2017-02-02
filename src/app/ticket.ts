export class Ticket {
  public _id: string;
  public title: string;
  public assignedTo: string;
  public description: string;
  public percentageComplete: number;

  constructor(id: string, title: string, assignedTo: string,
    description: string, percentageComplete: number) {
    this._id = id;
    this.title = title;
    this.assignedTo = assignedTo;
    this.description = description;
    this.percentageComplete = percentageComplete;
  }
}
