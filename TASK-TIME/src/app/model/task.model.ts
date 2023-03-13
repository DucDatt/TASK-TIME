import { ProjectModel } from './project.model';
import { User } from './user.model';

export interface Task {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  _id: string;
  owner: User;
  project: ProjectModel;
  assignees: User[];
}
