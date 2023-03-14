import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from 'src/app/model/project.model';
import {
  DeadlineComponent,
  StartComponent,
} from '../calendar/calendar.component';

@Component({
  selector: 'app-member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.scss'],
})
export class MemberPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MemberPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel
  ) {
    console.log(data);
  }

  startDate = StartComponent;
  deadlineDate = DeadlineComponent;

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  tempProject: any;

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  addInvite() {
    console.log(this.emailControl.value);
    this.dialogRef.close(this.emailControl.value);
  }
}
