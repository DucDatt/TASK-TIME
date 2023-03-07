

import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../app/Services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void { }


  login() {
    this.authService.LoginWithGoogle();
  }
  logout() {
    this.authService.logOut()
  }
}
