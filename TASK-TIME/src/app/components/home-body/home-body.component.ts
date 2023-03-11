import { map, Observable, Subject } from 'rxjs';
import { ProjectsService } from './../../Services/projects.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectPopupComponent } from 'src/app/components/project-popup/project-popup.component';
import { UpdateProjectPopupComponent } from '../update-project-popup/update-project-popup.component';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBodyComponent {
  constructor(private dialog: MatDialog, private projectsService: ProjectsService, private router: Router) { }
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

  async updateStarred(project: any) {
    project.isStarred = !project.isStarred;
    this.projectsService.updateProject(project);
  }

  async deleteProject(project: any) {
    project.disable = !project.disable;
    this.projectsService.updateProject(project);
  }

  navTask() {
    this.router.navigate(['/task'])
  }

  openDialog(): void {
    this.dialog.open(ProjectPopupComponent)
  }

  openUpdateDialog(): void {
    this.dialog.open(UpdateProjectPopupComponent)
  }

  sortByAlphabet() {
    this.projects = this.projects.pipe(map((projects) => {
      return projects.sort((a, b) => {
        return a.projectName.localeCompare(b.projectName);
      })
    }))
  }

  sortByDate() {
    this.projects = this.projects.pipe(map((projects) => {
      return projects.sort((a, b) => {
        return a.deadLine - b.deadLine;
      })
    }))
  }
}
