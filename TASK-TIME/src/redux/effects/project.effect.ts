import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { catchError, map, of, switchMap, pipe } from 'rxjs';
import { ProjectModel } from "src/app/model/project.model";
import { ProjectsService } from "src/app/Services/projects.service";
import { ProjectActions } from "src/redux/actions/project.action";

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, private projectsService: ProjectsService) { }

  $getAll = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.getAll),
    switchMap(() => this.projectsService.getAll().pipe(map((projects: any) => {
      return ProjectActions.getAllSuccess({ projects: projects })
    }),
      catchError(error => of(ProjectActions.getAllFail({ error: error })))
    ))
  ))

  $getById = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.get),
    switchMap((action) => this.projectsService.getProjectById(action.id).pipe(map((project: any) => {
      return ProjectActions.getSuccess({ project: project })
    }),
      catchError(error => of(ProjectActions.getFail({ error: error })))
    ))
  ))

  $postProject = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.create),
    switchMap((action) => this.projectsService.postProject(action.project).pipe(map((project: any) => {
      return ProjectActions.createSuccess({ project: project })
    }),
      catchError(error => of(ProjectActions.createFail({ error: error })))
    ))
  ))

  $updateProject = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.update),
    switchMap((action) => this.projectsService.updateProject(action.project).pipe(map((project) => {
      return ProjectActions.updateSuccess({ proj: project })
    }),
      catchError(error => of(ProjectActions.updateFail({ error: error })))
    ))
  ))

  $deleteProject = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.delete),
    switchMap((action) => this.projectsService.updateProject(action.project).pipe(map((project: any) => {
      return ProjectActions.deleteSuccess({ proj: project })
    }),
      catchError(error => of(ProjectActions.deleteFail({ error: error })))
    ))
  ))
}
