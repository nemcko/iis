import { TaskDto } from "../dtos/task-dto";

export class TaskModel {

  title: string;
  description: string;
  weight: number;
  rating: number;
  deadline: string;

  constructor (obj?: TaskDto) {

    this.title = obj && unescape(obj.title) || '';
    this.description = obj && unescape(obj.description) || '';
    this.weight = obj && obj.weight || 0;
    this.rating = obj && obj.rating || 0;
    this.deadline = obj && obj.deadline || '';

  }

}
