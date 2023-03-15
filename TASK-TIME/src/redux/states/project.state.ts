import { ProjectModel } from 'src/app/model/project.model';

export interface ProjectState {
  project: ProjectModel;
  projects: ProjectModel[];
  inProcess: boolean;
  isLoading: boolean;
  isInvited: boolean;
  isAccepted: boolean;
  isRequested: boolean;
  error: string;
  requestProject: ProjectModel[];
}
