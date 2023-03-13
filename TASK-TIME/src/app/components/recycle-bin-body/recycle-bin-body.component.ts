import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ProjectModel } from 'src/app/model/project.model';
import { ProjectsService } from 'src/app/Services/projects.service';
import { ProjectActions } from 'src/redux/actions/project.action';
import { ProjectState } from 'src/redux/states/project.state';

@Component({
  selector: 'app-recycle-bin-body',
  templateUrl: './recycle-bin-body.component.html',
  styleUrls: ['./recycle-bin-body.component.scss']
})
export class RecycleBinBodyComponent {
  constructor(private projectsService: ProjectsService, private store: Store<{ project: ProjectState }>) { }
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

  sortByAlphabet() {
    this.projects = this.projects.pipe(map((projects) => {
      return projects.sort((a, b) => {
        return a.projectName.localeCompare(b.projectName);
      })
    }))
  }

  restoreProject(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      disable: !project.disable
    }

    this.store.dispatch(ProjectActions.delete({ project: tempProject }));
  }
}
