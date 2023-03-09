import { ProjectsService } from './../../Services/projects.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectPopupComponent } from 'src/app/components/project-popup/project-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBodyComponent {
  constructor(private dialog: MatDialog, private projectsService: ProjectsService, private router: Router) { }
  projects: Array<any> = []

  ngOnInit() {
    this.projects = this.projectsService.projects;
  }

  navTask() {
    this.router.navigate(['/task'])
  }

  openDialog(): void {
    this.dialog.open(ProjectPopupComponent)
  }

  changeColor(color: string, index: number, array: any) {
    if (!array[index].styles.includes(color)) {
      array[index].styles.push(color);
      array[index].isStarred = true;
      this.projectsService.update(array);
    } else {
      array[index].styles = array[index].styles.filter((item: any) => item !== color) //remove color from list
      array[index].isStarred = false;
      this.projectsService.update(array);
    }
  }
}
