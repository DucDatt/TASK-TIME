import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TASK-TIME';
  constructor(private auth: Auth, private route: Router) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log("user is logged in")
        // this.route.navigate(["home"]);
      }
      else {
        console.log("user is not logged in")
        this.route.navigate(["login"]);
      }
    })
  }
}
