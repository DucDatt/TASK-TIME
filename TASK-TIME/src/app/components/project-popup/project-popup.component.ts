import { ProjectModel } from './../../model/project.model';
import { ProjectsService } from 'src/app/Services/projects.service';
import { Component, Inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  StartComponent,
  DeadlineComponent,
} from '../calendar/calendar.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss'],
})
export class ProjectPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    console.log(data);
  }

  startDate = StartComponent;
  deadlineDate = DeadlineComponent;

  tempProject: ProjectModel = {
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
  };

  onNoClick(): void {
    this.dialogRef.close();
  }
}
