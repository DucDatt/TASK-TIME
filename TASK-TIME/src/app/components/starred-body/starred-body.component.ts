import { ProjectState } from './../../../redux/states/project.state';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ProjectsService } from 'src/app/Services/projects.service';
import { ProjectActions } from 'src/redux/actions/project.action';
import { Store } from '@ngrx/store';
import { ProjectModel } from 'src/app/model/project.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-starred-body',
  templateUrl: './starred-body.component.html',
  styleUrls: ['./starred-body.component.scss'],
})
export class StarredBodyComponent {
  @Input('user') user$: Observable<User> = new Observable<User>();
  user: User = <User>{};
  constructor(
    private projectsService: ProjectsService,
    private router: Router,
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

  navTask() {
    this.router.navigate(['/task']);
  }

  updateStarred(project: any) {
    // this.initialize();
    let tempProject: ProjectModel = {
      ...project,
      isStarred: !project.isStarred,
    };
    this.store.dispatch(ProjectActions.update({ project: tempProject }));
    window.location.reload();
  }

  deleteProject(project: any) {
    let tempProject: ProjectModel = {
      ...project,
      disable: !project.disable,
    };

    this.store.dispatch(ProjectActions.delete({ project: tempProject }));
    window.location.reload();
  }
  sortByName() {
    this.projects = this.projects.pipe(
      map((projects) => {
        return projects.slice().sort((a, b) => {
          return a.projectName.localeCompare(b.projectName);
        });
      })
    );
  }
}
