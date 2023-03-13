import { ProjectModel } from "src/app/model/project.model";

export interface ProjectState {
  project: ProjectModel | null,
  projects: ProjectModel[],
  inProcess: boolean,
  isLoading: boolean,
  error: string
}
