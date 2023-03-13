import { ProjectModel } from './../../model/project.model';
import { ProjectState } from './../../../redux/states/project.state';
import { map, Observable, Subject } from 'rxjs';
import { ProjectsService } from './../../Services/projects.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectPopupComponent } from 'src/app/components/project-popup/project-popup.component';
import { UpdateProjectPopupComponent } from '../update-project-popup/update-project-popup.component';
import { Store } from '@ngrx/store';
import { ProjectActions } from 'src/redux/actions/project.action';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBodyComponent {
  constructor(
    private dialog: MatDialog,
    private projectsService: ProjectsService,
    private router: Router,
    private store: Store<{ project: ProjectState }>
  ) { }
  projects = new Observable<ProjectModel[]>;

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.projects = this.store.select('project').pipe(map((projectState) => {
      return projectState.projects;
    }));
    this.store.dispatch(ProjectActions.getAll());
    // this.projects.subscribe((data) => {
    //   console.log(data);
    // })
  }

  updateStarred(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      isStarred: !project.isStarred
    }
    this.store.dispatch(ProjectActions.update({ project: tempProject }));
  }

  deleteProject(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      disable: !project.disable
    }

    this.store.dispatch(ProjectActions.delete({ project: tempProject }));
  }

  navTask() {
    this.router.navigate(['/task'])
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(ProjectPopupComponent);
    dialogRef.afterClosed().subscribe((result: ProjectModel) => {
      if (!result) return;
      let tempStartAt = new Date(result.startAt.toString());
      let tempDeadline = new Date(result.deadline.toString());
      let tempProject: ProjectModel = {
        ...result,
        startAt: tempStartAt.toDateString(),
        deadline: tempDeadline.toDateString(),
      }

      this.store.dispatch(ProjectActions.create({ project: tempProject }))
    })
  }

  openUpdateDialog(project: any): void {
    let dialogRef = this.dialog.open(UpdateProjectPopupComponent, {
      data: project
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

      let tempProject: ProjectModel = {
        ...project,
        projectName: result.projectName,
        projectDescription: result.projectDescription,
        startAt: result.startAt.toDateString(),
        deadline: result.deadline.toDateString(),
      }

      this.store.dispatch(ProjectActions.update({ project: tempProject }));
    })
  }

  sortByAlphabet() {
    this.projects = this.projects.pipe(map((projects) => {
      return projects.sort((a, b) => {
        return a.projectName.localeCompare(b.projectName);
      })
    }))
  }

  // sortByDate() {
  //   this.projects = this.projects.pipe(map((projects) => {
  //     return projects.sort((a, b) => {
  //       return a.deadLine - b.deadLine;
  //     })
  //   }))
  // }
}
