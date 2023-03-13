import { ProjectModel } from './../../model/project.model';
import { ProjectsService } from 'src/app/Services/projects.service';
import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'
import { StartComponent, DeadlineComponent } from '../calendar/calendar.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})
export class ProjectPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectPopupComponent>,
  ) { }

  startDate = StartComponent;
  deadlineDate = DeadlineComponent;

  tempProject: ProjectModel = {
    projectId: uuidv4(),
    projectName: '',
    projectDescription: '',
    startAt: '',
    deadline: '',
    disable: false,
    isStarred: false
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
