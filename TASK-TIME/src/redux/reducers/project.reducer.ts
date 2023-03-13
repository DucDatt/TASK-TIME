import { ProjectModel } from './../../app/model/project.model';
import { createReducer, on } from '@ngrx/store';
import { ProjectState } from '../states/project.state';
import { ProjectActions } from '../actions/project.action';

let initialState: ProjectState = {
  project: null,
  projects: [],
  inProcess: false,
  isLoading: false,
  error: '',
};

export const ProjectReducer = createReducer(
  initialState,
  on(ProjectActions.getAllForUser, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      projects: [],
      isLoading: true,
      error: '',
    };
  }),
  on(ProjectActions.getAllForUserSuccess, (state, { projects, type }) => {
    console.log(type);
    return {
      ...state,
      projects: projects,
      isLoading: false,
    };
  }),
  on(ProjectActions.getAllForUserFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      projects: [],
      isLoading: false,
      error: error,
    };
  }),
  on(ProjectActions.create, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      project: null,
      inProcess: true,
      error: '',
    };
  }),
  on(ProjectActions.createSuccess, (state, { project, type }) => {
    console.log(type);
    // let projects = [...state.projects!];
    // projects.push(project);
    return {
      ...state,
      inProcess: false,
    };
  }),
  on(ProjectActions.createFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: false,
      error: error,
    };
  }),
  on(ProjectActions.delete, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: true,
      error: '',
    };
  }),
  on(ProjectActions.deleteSuccess, (state, { proj, type }) => {
    console.log(type);
    // let projects = [...state.projects!];
    // let temp: any = [];
    // projects.forEach((project) => {
    //   if (project.projectId === proj.projectId) {
    //     temp.push(proj);
    //     return;
    //   }
    //   temp.push(project);
    // });
    return {
      ...state,
      inProcess: false,
    };
  }),
  on(ProjectActions.deleteFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: false,
      error: error,
    };
  }),
  on(ProjectActions.update, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: true,
      error: '',
    };
  }),
  on(ProjectActions.updateSuccess, (state, { proj, type }) => {
    console.log(type);
    // let projects = [...state.projects!];
    // let temp: any = [];
    // projects.forEach((project) => {
    //   if (project.projectId === proj.projectId) {
    //     temp.push(proj);
    //     return;
    //   }
    //   temp.push(project);
    // });
    return {
      ...state,
      inProcess: false,
    };
  }),
  on(ProjectActions.updateFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: false,
      error: error,
    };
  }),
  on(ProjectActions.get, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      project: null,
      isLoading: true,
      error: '',
    };
  }),
  on(ProjectActions.getSuccess, (state, { project, type }) => {
    console.log(type);
    return {
      ...state,
      project: project,
      isLoading: false,
    };
  }),
  on(ProjectActions.getFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      project: null,
      isLoading: false,
      error: error,
    };
  })
);
