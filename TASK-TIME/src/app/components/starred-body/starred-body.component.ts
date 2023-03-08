import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-starred-body',
  templateUrl: './starred-body.component.html',
  styleUrls: ['./starred-body.component.scss']
})
export class StarredBodyComponent {
  constructor(private projectsService: ProjectsService) { }
  projects: Array<any> = []

  ngOnInit() {
    this.projects = this.projectsService.projects;
  }

  changeColor(color: string, index: number, array: any) {
    if (!array[index].styles.includes(color)) {
      array[index].styles.push(color);
      // let temp = array[index];
      // array.splice(index, 1);
      // array.unshift(temp);
    } else {
      array[index].styles = array[index].styles.filter((item: any) => item !== color) //remove color from list
      // let temp = array[index];
      // array.splice(index, 1);
      // array.push(temp);
    }
  }
}
