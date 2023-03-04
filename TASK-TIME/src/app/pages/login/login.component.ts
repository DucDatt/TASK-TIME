

import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../app/Services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.user$.subscribe(user => {
      this.user = user;
      console.log(user);
      // window.addEventListener('load', this.fade);
    })



  }
  user!: User |null
  user$ = new Observable< User| null>

  login(){
    this.authService.LoginWithGoogle().catch((error)=>{
      console.log(error)
    })
  }
  logout()
  {
    this.authService.logOut()
  }

  //  fade = () => {
  //   const wrapper = document.querySelector('.wrapper');
  //   wrapper!.classList.add('fade');
  //   return wrapper;
  // };

}
