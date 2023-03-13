import { ProjectModel } from './../../app/model/project.model';
import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "../states/project.state";
import { ProjectActions } from "../actions/project.action";

let initialState: ProjectState = {
  project: null,
  projects: [],
  inProcess: false,
  isLoading: false,
  error: ''
}

export const ProjectReducer = createReducer(
  initialState,
  on(ProjectActions.getAll, ((state) => {
    return {
      ...state,
      projects: [],
      isLoading: true,
      error: ''
    }
  })),
  on(ProjectActions.getAllSuccess, ((state, { projects }) => {
    return {
      ...state,
      projects: projects,
      isLoading: false
    }
  })),
  on(ProjectActions.getAllFail, ((state, { error }) => {
    return {
      ...state,
      projects: [],
      isLoading: false,
      error: error
    }
  })),
  on(ProjectActions.create, ((state) => {
    return {
      ...state,
      project: null,
      inProcess: true,
      error: ''
    }
  })),
  on(ProjectActions.createSuccess, ((state, { project }) => {
    let projects = [...state.projects!]
    projects.push(project);
    return {
      ...state,
      projects: projects,
      inProcess: false
    }
  })),
  on(ProjectActions.createFail, ((state, { error }) => {
    return {
      ...state,
      project: null,
      inProcess: false,
      error: error
    }
  })),
  on(ProjectActions.delete, ((state) => {
    return {
      ...state,
      inProcess: true,
      error: ''
    }
  })),
  on(ProjectActions.deleteSuccess, ((state, { proj }) => {
    let projects = [...state.projects!]
    let temp: any = [];
    projects.forEach((project) => {
      if (project.projectId === proj.projectId) {
        temp.push(proj);
        return;
      }
      temp.push(project);
    });
    return {
      ...state,
      projects: temp,
      inProcess: false
    }
  })),
  on(ProjectActions.deleteFail, ((state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error
    }
  })),
  on(ProjectActions.update, ((state) => {
    return {
      ...state,
      inProcess: true,
      error: ''
    }
  })),
  on(ProjectActions.updateSuccess, ((state, { proj }) => {
    let projects = [...state.projects!]
    let temp: any = [];
    projects.forEach((project) => {
      if (project.projectId === proj.projectId) {
        temp.push(proj);
        return;
      }
      temp.push(project);
    });
    return {
      ...state,
      projects: temp,
      inProcess: false
    }
  })),
  on(ProjectActions.updateFail, ((state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error
    }
  })),
  on(ProjectActions.get, ((state) => {
    return {
      ...state,
      project: null,
      isLoading: true,
      error: ''
    }
  })),
  on(ProjectActions.getSuccess, ((state, { project }) => {
    return {
      ...state,
      project: project,
      isLoading: false
    }
  })),
  on(ProjectActions.getFail, ((state, { error }) => {
    return {
      ...state,
      project: null,
      isLoading: false,
      error: error
    }
  })),
)
