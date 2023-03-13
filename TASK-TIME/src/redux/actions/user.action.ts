import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const UserActions = {
  get: createAction('[User] Get User Info', props<{ uid: string | undefined}>()),
  getSuccess: createAction('[User] Get User Info Success', props<{ user: User }>()),
  getFail: createAction('[User] Get User Info Fail', props<{ error: string }>()),

  create: createAction('[User] Create New User', props<{ user: User }>()),
  createSuccess: createAction('[User] Create New User Success', props<{ user: User }>()),
  createFail: createAction('[User] Create New User Fail', props<{ error: string }>()),

  clearUserInfo: createAction('[User] Clear User Info'),

//   delete: createAction('[User] Delete', props<{ User: User }>()),
//   deleteSuccess: createAction('[User] Delete Success', props<{ proj: User }>()),
//   deleteFail: createAction('[User] Delete Fail', props<{ error: string }>()),

//   update: createAction('[User] Update', props<{ User: User }>()),
//   updateSuccess: createAction('[User] Update Success', props<{ proj: User }>()),
//   updateFail: createAction('[User] Update Fail', props<{ error: string }>()),
}
