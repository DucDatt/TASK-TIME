import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, pipe, from } from 'rxjs';
import { ProjectModel } from 'src/app/model/project.model';
import { ProjectsService } from 'src/app/Services/projects.service';
import { ProjectActions } from 'src/redux/actions/project.action';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

  $getAllForUser = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.getAllForUser),
      switchMap((action) =>
        this.projectsService.getAllByUserId(action._id).pipe(
          map((projects: any) => {
            console.log('projects', projects);
            if (projects == null) {
              return ProjectActions.getAllForUserSuccess({ projects: [] });
            } else {
              return ProjectActions.getAllForUserSuccess({
                projects: projects,
              });
            }
          }),
          catchError((error) =>
            of(ProjectActions.getAllForUserFail({ error: error }))
          )
        )
      )
    )
  );

  $getById = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.get),
      switchMap((action) =>
        this.projectsService.getProjectById(action.id).pipe(
          map((project: any) => {
            return ProjectActions.getSuccess({ project: project });
          }),
          catchError((error) => of(ProjectActions.getFail({ error: error })))
        )
      )
    )
  );

  $postProject = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.create),
      switchMap((action) =>
        this.projectsService.postProject(action.project).pipe(
          map((project: any) => {
            if (project.projectId == null) {
              return ProjectActions.createFail({ error: project });
            } else {
              return ProjectActions.createSuccess({ project: project });
            }
          }),
          catchError((error) => of(ProjectActions.createFail({ error: error })))
        )
      )
    )
  );

  $updateProject = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.update),
      switchMap((action) =>
        this.projectsService.updateProject(action.project).pipe(
          map((project) => {
            return ProjectActions.updateSuccess({ proj: project });
          }),
          catchError((error) => of(ProjectActions.updateFail({ error: error })))
        )
      )
    )
  );

  $deleteProject = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.delete),
      switchMap((action) =>
        this.projectsService.updateProject(action.project).pipe(
          map((project: any) => {
            return ProjectActions.deleteSuccess({ proj: project });
          }),
          catchError((error) => of(ProjectActions.deleteFail({ error: error })))
        )
      )
    )
  );
  inviteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.inviteProject),
      switchMap((action) =>
        this.projectsService.invite(action.email, action.project)
      ),
      map((project) => {
        if (project._id) {
          console.log('sheetFile', project);
          return ProjectActions.inviteProjectSuccess({ proj: project });
        } else {
          return ProjectActions.inviteProjectFail({
            error: 'Sheet file not found',
          });
        }
      }),
      catchError((error: string) => {
        console.log('error', error);
        return from([ProjectActions.inviteProjectFail({ error })]);
      })
    )
  );

  acceptRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.acceptRequest),
      switchMap((action) =>
        this.projectsService.acceptRequest(action._id, action.project)
      ),
      map((project) => {
        if (project._id) {
          console.log('sheetFile', project);
          return ProjectActions.acceptRequestSuccess({ project: project });
        } else {
          return ProjectActions.acceptRequestFail({
            error: 'Sheet file not found',
          });
        }
      }),
      catchError((error: string) =>
        from([ProjectActions.acceptRequestFail({ error })])
      )
    )
  );

  getRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.findRequest),
      switchMap((action) => this.projectsService.findRequestList(action._id)),
      map((projects) => {
        if (projects && projects.length > 0) {
          console.log('requests', projects);
          return ProjectActions.findRequestSuccess({ projects });
        } else {
          return ProjectActions.findRequestSuccess({ projects: [] });
        }
      }),
      catchError((error: string) =>
        from([ProjectActions.findRequestFail({ error })])
      )
    )
  );

  //get detail project
  getProjectDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.getProjectDetails),
      switchMap((action) =>
        this.projectsService.getProjectDetails(action.id).pipe(
          map((project: any) => {
            if (project == null) {
              return ProjectActions.getProjectDetailsSuccess({
                project,
              });
            } else {
              return ProjectActions.getProjectDetailsSuccess({
                project: project,
              });
            }
          }),
          catchError((error) =>
            of(ProjectActions.getProjectDetailsFail({ error: error }))
          )
        )
      )
    )
  );
}
