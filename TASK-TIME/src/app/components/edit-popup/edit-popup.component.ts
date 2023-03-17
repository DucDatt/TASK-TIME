import { Component } from '@angular/core';
import {
  StartComponent,
  DeadlineComponent,
} from '../calendar/calendar.component';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss']
})
export class EditPopupComponent {
  startDate = StartComponent;
  deadlineDate = DeadlineComponent;
}
