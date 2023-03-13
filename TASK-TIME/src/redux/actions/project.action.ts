import { createAction, props } from "@ngrx/store";
import { ProjectModel } from "src/app/model/project.model";

export const ProjectActions = {
  getAll: createAction('[Project] Get All'),
  getAllSuccess: createAction('[Project] Get All Success', props<{ projects: ProjectModel[] }>()),
  getAllFail: createAction('[Project] Get All Fail', props<{ error: string }>()),

  get: createAction('[Project] Get', props<{ id: string }>()),
  getSuccess: createAction('[Project] Get Success', props<{ project: ProjectModel }>()),
  getFail: createAction('[Project] Get Fail', props<{ error: string }>()),

  create: createAction('[Project] Create', props<{ project: ProjectModel }>()),
  createSuccess: createAction('[Project] Create Success', props<{ project: ProjectModel }>()),
  createFail: createAction('[Project] Create Fail', props<{ error: string }>()),

  delete: createAction('[Project] Delete', props<{ project: ProjectModel }>()),
  deleteSuccess: createAction('[Project] Delete Success', props<{ proj: ProjectModel }>()),
  deleteFail: createAction('[Project] Delete Fail', props<{ error: string }>()),

  update: createAction('[Project] Update', props<{ project: ProjectModel }>()),
  updateSuccess: createAction('[Project] Update Success', props<{ proj: ProjectModel }>()),
  updateFail: createAction('[Project] Update Fail', props<{ error: string }>()),
}
