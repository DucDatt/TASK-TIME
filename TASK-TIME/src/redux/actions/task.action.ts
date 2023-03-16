import { createAction, props } from '@ngrx/store';
import { TaskModel } from 'src/app/model/task.model';

export const TaskActions = {
  getAllForUser: createAction(
    '[Task] Get All For User',
    props<{ _id: string }>()
  ),
  getAllForUserSuccess: createAction(
    '[Task] Get All For User Success',
    props<{ tasks: TaskModel[] }>()
  ),
  getAllForUserFail: createAction(
    '[Task] Get All For User Fail',
    props<{ error: string }>()
  ),

  get: createAction('[Task] Get', props<{ id: string }>()),
  getSuccess: createAction(
    '[Task] Get Success',
    props<{ task: TaskModel }>()
  ),
  getFail: createAction('[Task] Get Fail', props<{ error: string }>()),

  create: createAction('[Task] Create', props<{ task: TaskModel }>()),
  createSuccess: createAction(
    '[Task] Create Success',
    props<{ task: TaskModel }>()
  ),
  createFail: createAction('[Task] Create Fail', props<{ error: string }>()),

  delete: createAction('[Task] Delete', props<{ task: TaskModel }>()),
  deleteSuccess: createAction(
    '[Task] Delete Success',
    props<{ task: TaskModel }>()
  ),
  deleteFail: createAction('[Task] Delete Fail', props<{ error: string }>()),

  update: createAction('[Task] Update', props<{ task: TaskModel }>()),
  updateSuccess: createAction(
    '[Task] Update Success',
    props<{ task: TaskModel }>()
  ),
  updateFail: createAction('[Task] Update Fail', props<{ error: string }>()),
};
