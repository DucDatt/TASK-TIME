import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/Services/auth.service';
import { UserActions } from 'src/redux/actions/user.action';
import { UserState } from 'src/redux/states/user.state';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}
