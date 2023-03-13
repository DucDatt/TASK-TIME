import { ProjectState } from './../../../redux/states/project.state';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/Services/projects.service';
import { ProjectActions } from 'src/redux/actions/project.action';
import { Store } from '@ngrx/store';
import { ProjectModel } from 'src/app/model/project.model';

@Component({
  selector: 'app-starred-body',
  templateUrl: './starred-body.component.html',
  styleUrls: ['./starred-body.component.scss']
})
export class StarredBodyComponent {
  constructor(private projectsService: ProjectsService, private router: Router, private store: Store<{ project: ProjectState }>) { }
  projects = new Observable<any[]>;

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.projects = this.store.select('project').pipe(map((projectState) => {
      return projectState.projects;
    }));
    this.store.dispatch(ProjectActions.getAll());
    // this.projects.subscribe((data) => {
    //   console.log(data);
    // })
  }

  navTask() {
    this.router.navigate(['/task'])
  }

  updateStarred(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      isStarred: !project.isStarred
    }
    this.store.dispatch(ProjectActions.update({ project: tempProject }));
  }

  deleteProject(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      disable: !project.disable
    }

    this.store.dispatch(ProjectActions.delete({ project: tempProject }));
  }
}
