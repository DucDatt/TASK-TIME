import { User, UserCredential } from '@angular/fire/auth';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
constructor(private auth: AuthService){}

  user!: User | null;
  user$ = new Observable<User|null>();
  ngOnInit(): void {
    this.user = this.auth.user;
    this.user$ = this.auth.user$;
    this.user$.subscribe(user => {
      this.user = user;
    })
  }

  logOut(){
    this.auth.logOut();
  }
}
