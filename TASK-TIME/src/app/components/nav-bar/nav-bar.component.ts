import { UserCredential } from '@angular/fire/auth';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private auth: AuthService) {}

  user = this.auth.user;
  user$ = this.auth.user$;
  ngOnInit(): void {
    this.user = this.auth.user;

    this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(user);
      }
    });
  }

  logOut() {
    this.auth.logOut();
  }
}
