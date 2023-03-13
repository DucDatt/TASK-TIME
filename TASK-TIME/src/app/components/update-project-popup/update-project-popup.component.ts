import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from 'src/app/model/project.model';
import { ProjectsService } from 'src/app/Services/projects.service';
import {
  StartComponent,
  DeadlineComponent,
} from '../calendar/calendar.component';

@Component({
  selector: 'app-update-project-popup',
  templateUrl: './update-project-popup.component.html',
  styleUrls: ['./update-project-popup.component.scss'],
})
export class UpdateProjectPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel
  ) {
    console.log(data);
  }

  startDate = StartComponent;
  deadlineDate = DeadlineComponent;

  tempProject: any;

  ngOnInit() {
    this.tempProject = {
      projectName: structuredClone(this.data.projectName),
      projectDescription: structuredClone(this.data.projectDescription),
      startAt: structuredClone(this.data.startAt),
      deadline: structuredClone(this.data.deadline),
    };
    console.log(this.tempProject);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
