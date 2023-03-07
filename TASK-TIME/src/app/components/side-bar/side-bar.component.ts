import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  constructor(public authService: AuthService,private router:Router){}
  navTask(){
    this.router.navigate(['/task'])
  }

  navHome(){
    this.router.navigate(['/home'])
  }
}
