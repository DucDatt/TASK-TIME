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
  status: string;
  _id: string;
  assignees: User[];
  projectId: string;
  styles: string[];
  owner: User;
}
