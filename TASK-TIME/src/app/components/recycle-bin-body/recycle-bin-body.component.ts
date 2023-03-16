import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ProjectModel } from 'src/app/model/project.model';
import { User } from 'src/app/model/user.model';
import { ProjectsService } from 'src/app/Services/projects.service';
import { ProjectActions } from 'src/redux/actions/project.action';
import { ProjectState } from 'src/redux/states/project.state';

@Component({
  selector: 'app-recycle-bin-body',
  templateUrl: './recycle-bin-body.component.html',
  styleUrls: ['./recycle-bin-body.component.scss'],
})
export class RecycleBinBodyComponent {
  @Input('user') user$: Observable<User> = new Observable<User>();
  user: User = <User>{};
  constructor(
    private projectsService: ProjectsService,
    private store: Store<{ project: ProjectState }>
  ) { }
  projects = this.store.select('project', 'projects');

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user._id != undefined) {
        this.user = user;
        this.initialize();
      }
    });
  }

  initialize() {
    this.store.dispatch(ProjectActions.getAllForUser({ _id: this.user._id }));
  }

  sortByAlphabet() {
    this.projects = this.projects.pipe(
      map((projects) => {
        return projects.sort((a, b) => {
          return a.projectName.localeCompare(b.projectName);
        });
      })
    );
  }

  restoreProject(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      disable: !project.disable,
    };

    this.store.dispatch(ProjectActions.delete({ project: tempProject }));
    window.location.reload();
  }
}
