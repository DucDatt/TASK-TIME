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

  openUpdateDialog(): void {
    this.dialog.open(UpdateProjectPopupComponent)
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
