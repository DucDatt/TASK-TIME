import { ProjectsService } from 'src/app/Services/projects.service';
import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})
export class ProjectPopupComponent {
  constructor(private projectService: ProjectsService) { }

  name: string = '';
  description: string = '';
  startAt: string = '';
  deadline: string = '';

  async create() {
    let newProject: any = {
      projectId: uuidv4(),
      projectName: this.name,
      projectDescription: this.description,
      startAt: this.startAt,
      deadline: this.deadline,
      disable: false,
      isStarred: false
    }
    let response = await this.projectService.postProject(newProject);
    console.log(response);
    window.location.reload();
  }
}
