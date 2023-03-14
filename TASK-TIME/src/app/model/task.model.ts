import { ProjectModel } from './project.model';
import { User } from './user.model';

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  startAt: string;
  deadline: string;
  isDisable: boolean;
  createdAt: number;
  updatedAt: number;
  _id: string;
  assignees: User[];
  project: ProjectModel;
  styles: string[];
  owner: User;
}
