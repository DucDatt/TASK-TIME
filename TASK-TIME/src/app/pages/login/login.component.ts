import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../app/Services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/redux/states/user.state';
import { UserActions } from 'src/redux/actions/user.action';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  userSubscription !: Subscription;
  user$ = new Observable<User | null>();
  user: User | null = null;
  ngOnInit(): void {
    this.user = this.authService.user;
    this.user$ = this.authService.user$;

    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.store.dispatch(UserActions.create({ user: user }));
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.authService.LoginWithGoogle();
  }
  logout() {
    this.authService.logOut();
  }
}
