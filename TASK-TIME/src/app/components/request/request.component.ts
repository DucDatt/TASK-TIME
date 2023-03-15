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
  acceptedSubscription !: Subscription;
  projectState = this.store.select('project');
  requestProject$ = this.store.select('project', 'requestProject');
  isAccepted$ = this.store.select('project', 'isAccepted');
  constructor(
    private store: Store<{ project: ProjectState; user: UserState }>
  ) { }
  ngOnInit(): void {

    this.acceptedSubscription = this.isAccepted$.subscribe((state) => {
      if (state) {
        if (this.user._id != '' || this.user._id != undefined) {
          console.log('accepted');
          this.store.dispatch(ProjectActions.findRequest({ _id: this.user._id }));
        }
      }
    });
    this.userSubscription = this.userState$.subscribe((state) => {
      if (state.loading == false) {
        if (state.user._id) {
          console.log(state.user.displayName);
          this.user = state.user;
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.acceptedSubscription.unsubscribe();
  }

  acceptInvitation(project: ProjectModel) {
    if (this.user._id != '' || this.user._id != undefined) {
      this.store.dispatch(
        ProjectActions.acceptRequest({
          _id: this.user._id,
          project: project,
        })
      );
    } else {
      console.log('errorr')
      return;
    }

  }
}
