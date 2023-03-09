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
  projects: Array<any> = []

  ngOnInit() {
    this.projects = this.projectsService.projects;
  }

  navTask() {
    this.router.navigate(['/task'])
  }

  changeColor(color: string, index: number, array: any) {
    if (!array[index].styles.includes(color)) {
      array[index].styles.push(color);
      array[index].isStarred = true;
      this.projectsService.updateStarred(array);
    } else {
      array[index].styles = array[index].styles.filter((item: any) => item !== color) //remove color from list
      array[index].isStarred = false;
      this.projectsService.updateStarred(array);
    }
  }
}
