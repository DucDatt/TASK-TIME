import { User } from './user.model';

export interface ProjectModel {
  projectId: string;
  projectName: string;
  projectDescription: string;
  startAt: string;
  deadline: string;
  disable: boolean;
  isStarred: boolean;
  createdAt: number;
  updatedAt: number;
  _id: string;
  owner: User;
  members: User[];
}
