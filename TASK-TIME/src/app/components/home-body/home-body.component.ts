import { ProjectsService } from './../../Services/projects.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectPopupComponent } from 'src/app/components/project-popup/project-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBodyComponent {
  constructor(private dialog: MatDialog, private projectsService: ProjectsService) { }
  projects: Array<any> = []

  ngOnInit() {
    this.projects = this.projectsService.projects;
  }


  openDialog(): void {
    this.dialog.open(ProjectPopupComponent)
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
