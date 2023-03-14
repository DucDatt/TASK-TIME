import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProjectModel } from 'src/app/model/project.model';
import { User } from 'src/app/model/user.model';
import { ProjectActions } from 'src/redux/actions/project.action';
import { ProjectState } from 'src/redux/states/project.state';
import { UserState } from 'src/redux/states/user.state';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  userState$ = this.store.select('user');
  user: User = <User>{};
  projectSubscription!: Subscription;
  projectState = this.store.select('project');
  requestProject: ProjectModel[] = [];
  constructor(
    private store: Store<{ project: ProjectState; user: UserState }>
  ) {}
  ngOnInit(): void {
    this.projectSubscription = this.projectState.subscribe((state) => {
      if (state.isRequested) {
        console.log('invited');
        this.requestProject = state.requestProject;
      }
      if (state.isAccepted) {
        console.log('accepted');
        this.store.dispatch(ProjectActions.findRequest({ _id: this.user._id }));
      }
    });
    this.userSubscription = this.userState$.subscribe((state) => {
      if (state.loading == false) {
        if (state.user._id) {
          this.user = state.user;
          console.log('findREquest', this.user.displayName);
          this.store.dispatch(
            ProjectActions.findRequest({ _id: state.user._id })
          );
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  acceptInvitation(project: ProjectModel) {
    this.store.dispatch(
      ProjectActions.acceptRequest({
        _id: this.user._id,
        project: project,
      })
    );
  }
}
