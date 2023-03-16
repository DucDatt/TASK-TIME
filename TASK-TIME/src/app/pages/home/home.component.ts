import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/Services/auth.service';
import { Store } from '@ngrx/store';
import { UserState } from 'src/redux/states/user.state';
import { UserActions } from 'src/redux/actions/user.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  index: number = 0;

  urlIndicesMap = [
    '/home/projects',
    '/home/starred',
    '/home/recyclebin',
    '/home/request',
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      let tempIndex = 0;
      try {
        tempIndex = this.urlIndicesMap.indexOf(val.routerEvent.url);
      } catch (error) {}
      if (tempIndex >= 0) {
        this.index = tempIndex;
      }
    });
  }
}
