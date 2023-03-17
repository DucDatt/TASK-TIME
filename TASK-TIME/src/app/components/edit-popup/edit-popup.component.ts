import { Component, Inject, Input } from '@angular/core';
import { TaskState } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskModel } from 'src/app/model/task.model';
import { TaskActions } from 'src/redux/actions/task.action';
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
  form:FormGroup;
  constructor(private store:Store<{task:TaskState}>,private dialogRef:MatDialogRef<EditPopupComponent>,@Inject(MAT_DIALOG_DATA) public task: TaskModel) {
    this.form=new FormGroup({
      title:new FormControl(this.task.title),
      startAt:new FormControl(this.task.startAt),
      deadline:new FormControl(this.task.deadline),

    })

  }
  update(){
    if(this.form.invalid){
      return;
    }
    let newTask=this.task;
    newTask.title=this.form.value.title;
    newTask.startAt=this.form.value.startAt;
    newTask.deadline=this.form.value.deadline;
    this.store.dispatch(TaskActions.update({task:newTask}));

  }
}
