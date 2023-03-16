import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProjectModel } from 'src/app/model/project.model';
import { User } from 'src/app/model/user.model';
import { ProjectActions } from 'src/redux/actions/project.action';
import { ProjectState } from 'src/redux/states/project.state';
import { UserState } from 'src/redux/states/user.state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  userState$ = this.store.select('user');
  user: User = <User>{};
  isRequestSubscription!: Subscription;
  isRequest$ = this.store.select('project', 'isRequested');
  requestProject$ = this.store.select('project', 'requestProject');
  @Input('index') index: number = 0;

  constructor(
    private store: Store<{ project: ProjectState; user: UserState }>
  ) { }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.isRequestSubscription.unsubscribe();
  }
  ngOnInit(): void {

    this.isRequestSubscription = this.isRequest$.subscribe((state) => {
      if (state) {
        console.log('requested');

      }
    });
    this.userSubscription = this.userState$.subscribe((state) => {
      if (state.loading == false) {
        if (state.user._id) {
          this.user = state.user;
          console.log('findRequest', this.user.displayName);
          this.store.dispatch(
            ProjectActions.findRequest({ _id: state.user._id })
          );
        }
      }
    });
  }
}
