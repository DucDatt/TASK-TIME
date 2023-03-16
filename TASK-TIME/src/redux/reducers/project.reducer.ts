import { ProjectModel } from './../../app/model/project.model';
import { createReducer, on } from '@ngrx/store';
import { ProjectState } from '../states/project.state';
import { ProjectActions } from '../actions/project.action';

let initialState: ProjectState = {
  project: {} as ProjectModel,
  projects: [],
  inProcess: false,
  isLoading: false,
  error: '',
  isAccepted: false,
  isInvited: false,
  isRequested: false,
  requestProject: [],
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
      inProcess: true,
      error: '',
    };
  }),
  on(ProjectActions.createSuccess, (state, { project, type }) => {
    console.log(type);
    let projects = [...state.projects!];
    projects.push(project);
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
    let projects = [...state.projects!];
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
    let projects = [...state.projects!];
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
      isLoading: false,
      error: error,
    };
  }),
  on(ProjectActions.inviteProject, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isInvited: false,
      error: '',
    };
  }),
  on(ProjectActions.inviteProjectSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isInvited: true,
    };
  }),
  on(ProjectActions.inviteProjectFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isInvited: false,
      error: error,
    };
  }),
  on(ProjectActions.acceptRequest, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isAccepted: false,
      error: '',
    };
  }),
  on(ProjectActions.acceptRequestSuccess, (state, { project, type }) => {
    console.log(type);
    return {
      ...state,
      isAccepted: true,
    };
  }),
  on(ProjectActions.acceptRequestFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isAccepted: false,
      error: error,
    };
  }),
  on(ProjectActions.findRequest, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isRequested: false,
      error: '',
    };
  }),
  on(ProjectActions.findRequestSuccess, (state, { projects, type }) => {
    console.log(type);
    return {
      ...state,
      isRequested: true,
      requestProject: projects,
    };
  }),
  on(ProjectActions.findRequestFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isRequested: false,
      error: error,
    };
  }),

  // get project detail
  on(ProjectActions.getProjectDetails, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      projectDetail: null,
      isLoading: true,
      error: '',
    };
  }),
  on(ProjectActions.getProjectDetailsSuccess, (state, { project, type }) => {
    console.log(type);
    return {
      ...state,
      projectDetail: project,
      isLoading: false,
    };
  }),
  on(ProjectActions.getProjectDetailsFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      projectDetail: null,
      isLoading: false,
      error: error,
    };
  })
);
