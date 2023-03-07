import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  // constructor(public authService: AuthService, private router: Router){}

  // navTask() {
  //   this.router.navigate(['/task']);
  // }
  @Input('index') index: number = 0;
}
