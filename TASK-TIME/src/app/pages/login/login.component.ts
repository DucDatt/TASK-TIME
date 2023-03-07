
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../app/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  user$ = new Observable<User | null>
  user: User | null = null;
  ngOnInit(): void {
    this.user = this.authService.user;
    this.user$ = this.authService.user$;

    this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/home'])
      }
    })
  }

  login() {
    this.authService.LoginWithGoogle();
  }
  logout() {
    this.authService.logOut()
  }
}
