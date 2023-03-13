import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { UserState } from 'src/redux/states/user.state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  @Input('index') index: number = 0;
}
