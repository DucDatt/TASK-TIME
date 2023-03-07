import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService){}

user!: User | null;
user$ = new Observable<User|null>();


 ngOnInit(): void {
     this.user$ = this.auth.user$;
     this.user$.subscribe((user) => {
       this.user = user;
       console.log(user);
     });
 }
}
