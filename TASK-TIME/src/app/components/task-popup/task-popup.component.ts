import { Component, Inject } from '@angular/core';
import { TaskModel } from 'src/app/model/task.model';
import { v4 as uuidv4 } from 'uuid';
import {
  StartComponent,
  DeadlineComponent,
} from '../calendar/calendar.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss']
})
export class TaskPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }
  startDate = StartComponent;
  deadlineDate = DeadlineComponent;

  tempTask: TaskModel = {
    id: uuidv4(),
    title: '',
    description: '',
    startAt: '',
    deadline: '',
    isDisable: false,
    createdAt: 0,
    updatedAt: 0,
    _id: '',
    assignees: [],
    styles: [],
    owner: this.data,
    project: {
      projectId: uuidv4(),
      projectName: '',
      projectDescription: '',
      startAt: '',
      deadline: '',
      disable: false,
      isStarred: false,
      createdAt: 0,
      updatedAt: 0,
      _id: '',
      owner: this.data,
      members: [],
    }

  };


  onNoClick(): void {
    this.dialogRef.close();
  }

}
