import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-starred-body',
  templateUrl: './starred-body.component.html',
  styleUrls: ['./starred-body.component.scss']
})
export class StarredBodyComponent {
  constructor(private projectsService: ProjectsService, private router: Router) { }
  projects = new Observable<any[]>;

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.projects = await this.projectsService.getAll();
    this.projects.subscribe((data) => {
      console.log(data);
    })
  }

  navTask() {
    this.router.navigate(['/task'])
  }

  async updateStarred(project: any) {
    project.isStarred = !project.isStarred;
    this.projectsService.updateProject(project);
  }

  async deleteProject(project: any) {
    project.disable = !project.disable;
    this.projectsService.updateProject(project);
  }
}
