import { Component, Inject } from '@angular/core';
import { TaskModel } from 'src/app/model/task.model';
import { v4 as uuidv4 } from 'uuid';
import {
  StartComponent,
  DeadlineComponent,
} from '../calendar/calendar.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { Store } from '@ngrx/store';
import { TaskState } from '@angular/fire/firestore';
import { TaskActions } from 'src/redux/actions/task.action';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss'],
})
export class TaskPopupComponent {
  constructor(
    private store: Store<{ task: TaskState }>,
    public dialogRef: MatDialogRef<TaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  startDate = StartComponent;
  deadlineDate = DeadlineComponent;

  tempTask: TaskModel = {
    id: uuidv4(),
    title: '',
    description: '',
    startAt: '',
    deadline: '',
    status: 'todo',
    isDisable: false,
    createdAt: 0,
    updatedAt: 0,
    _id: '',
    assignees: [],
    styles: [],
    owner: this.data.user,
    projectId:this.data.projectId,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOninit() {
    this.store.select('task').subscribe((data) => {
      console.log(data);
    });
  }
  createTask() {
    this.dialogRef.close(this.tempTask);
  }
}
