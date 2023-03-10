import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserState } from 'src/redux/states/user.state';

@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.scss'],
})
export class RecycleBinComponent implements OnInit, OnDestroy {
  user: User = <User>{};
  userSubscribtion!: Subscription;

  user$ = this.store.select('user', 'user');
  constructor(private store: Store<{ user: UserState }>) {}
  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }
  ngOnInit(): void {
    this.userSubscribtion = this.user$.subscribe((user) => {
      if (user._id != null) {
        this.user = user;
      }
    });
  }
}
