import { ProjectModel } from './../../model/project.model';
import { ProjectState } from './../../../redux/states/project.state';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { ProjectsService } from './../../Services/projects.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectPopupComponent } from 'src/app/components/project-popup/project-popup.component';
import { UpdateProjectPopupComponent } from '../update-project-popup/update-project-popup.component';
import { Store } from '@ngrx/store';
import { ProjectActions } from 'src/redux/actions/project.action';
import { User } from 'src/app/model/user.model';
import { UserState } from 'src/redux/states/user.state';
import { MemberPopupComponent } from '../member-popup/member-popup.component';
import { UserActions } from 'src/redux/actions/user.action';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBodyComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<{ project: ProjectState; user: UserState }>
  ) {
    this.store.select('project').subscribe((data) => {
      console.log(data);
    }
    );
  }
  isCreated$ = this.store.select('user', 'isCreated');
  isCreatedSubscription!: Subscription;
  userSubscription!: Subscription;
  userState$ = this.store.select('user');
  user: User = <User>{};
  inProcessSubscription!: Subscription;
  inProcess$ = this.store.select('project', 'inProcess');
  projects = this.store.select('project', 'projects');
  id!: string;

  ngOnInit(): void {
    this.inProcessSubscription = this.inProcess$.subscribe((data) => {
      if (data == false) {
        if (this.user._id != undefined) {
          console.log('inProcess$');
          this.initialize();
        }
      }
    });
    this.userSubscription = this.userState$.subscribe((state) => {
      if (state.loading == false) {
        if (state.user._id) {
          this.user = state.user;
          console.log(this.user);
          this.store.dispatch(
            ProjectActions.getAllForUser({ _id: state.user._id })
          );
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.inProcessSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.isCreatedSubscription.unsubscribe();
  }

  initialize() {
    this.store.dispatch(ProjectActions.getAllForUser({ _id: this.user._id }));
  }

  updateStarred(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      isStarred: !project.isStarred,
    };
    console.log('update', tempProject);
    this.store.dispatch(ProjectActions.update({ project: tempProject }));
  }

  deleteProject(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      disable: !project.disable,
    };
    console.log('delete', tempProject);
    this.store.dispatch(ProjectActions.delete({ project: tempProject }));
  }

  navTask() {
    this.router.navigate(['/task']);
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(ProjectPopupComponent, {
      data: this.user,
    });
    dialogRef.afterClosed().subscribe((result: ProjectModel) => {
      if (!result) return;
      let tempStartAt = new Date(result.startAt.toString());
      let tempDeadline = new Date(result.deadline.toString());
      let tempProject: ProjectModel = {
        ...result,
        startAt: tempStartAt.toDateString(),
        deadline: tempDeadline.toDateString(),
      };

      this.store.dispatch(ProjectActions.create({ project: tempProject }));
    });
  }

  openUpdateDialog(project: any): void {
    let dialogRef = this.dialog.open(UpdateProjectPopupComponent, {
      data: project,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      let tempProject: ProjectModel = {
        ...project,
        projectName: result.projectName,
        projectDescription: result.projectDescription,
        startAt: result.startAt.toDateString(),
        deadline: result.deadline.toDateString(),
      };

      this.store.dispatch(ProjectActions.update({ project: tempProject }));
    });
  }
  addMemberDialog(project: ProjectModel): void {
    let dialogRef = this.dialog.open(MemberPopupComponent, {
      data: project,
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == '') return;
      else {
        console.log(result);
        this.store.dispatch(
          ProjectActions.inviteProject({ project: project, email: result })
        );
      }
    });
  }

  sortByAlphabet() {
    this.projects = this.projects.pipe(
      map((projects) => {
        return projects.sort((a, b) => {
          return a.projectName.localeCompare(b.projectName);
        });
      })
    );
  }

  // sortByDate() {
  //   this.projects = this.projects.pipe(map((projects) => {
  //     return projects.sort((a, b) => {
  //       return a.deadLine - b.deadLine;
  //     })
  //   }))
  // }
}
