import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, pipe } from 'rxjs';
import { TaskModel } from 'src/app/model/task.model';
import { TaskActions } from '../actions/task.action';
import { TaskService } from 'src/app/Services/task.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  $getAllForUser = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getAllForUser),
      switchMap((action) =>
        this.taskService.getAllByUserId(action._id).pipe(
          map((tasks: any) => {
            if (tasks == null) {
              return TaskActions.getAllForUserSuccess({ tasks: [] });
            } else {
              return TaskActions.getAllForUserSuccess({
                tasks: tasks,
              });
            }
          }),
          catchError((error) =>
            of(TaskActions.getAllForUserFail({ error: error }))
          )
        )
      )
    )
  );

  $GetAllTaskByProjectId = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getAllByProjectId),
      switchMap((action) =>
        this.taskService.getAllByProjectId(action._id).pipe(
          map((tasks: any) => {
            if (tasks == null) {
              return TaskActions.getAllByProjectIdSuccess({ tasks: [] });
            } else {
              return TaskActions.getAllByProjectIdSuccess({
                tasks: tasks,
              });
            }
          }),
          catchError((error) =>
            of(TaskActions.getAllByProjectIdFail({ error: error }))
          )
        )
      )
    )
  );

  $getById = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.get),
      switchMap((action) =>
        this.taskService.getTaskById(action.id).pipe(
          map((task: any) => {
            console.log(task);
            if (task == null) {
              return TaskActions.getFail({ error: 'Task not found' });
            } else {
              return TaskActions.getSuccess({ task: task });
            }
          }),
          catchError((error) => of(TaskActions.getFail({ error: error })))
        )
      )
    )
  );

  $postTask = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.create),
      switchMap((action) =>
        this.taskService.postTask(action.task).pipe(
          map((task: any) => {
            return TaskActions.createSuccess({ task: task });
          }),
          catchError((error) => of(TaskActions.createFail({ error: error })))
        )
      )
    )
  );

  $updateTask = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.update),
      switchMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          map((task) => {
            return TaskActions.updateSuccess({ task: task });
          }),
          catchError((error) => of(TaskActions.updateFail({ error: error })))
        )
      )
    )
  );

  $deleteTask = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.delete),
      switchMap((action) =>
        this.taskService.deleteTask(action.id).pipe(
          map((task: any) => {
            return TaskActions.deleteSuccess({ task: task });
          }),
          catchError((error) => of(TaskActions.deleteFail({ error: error })))
        )
      )
    )
  );
}
