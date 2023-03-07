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
  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ProjectPopupComponent)
  }

  projects: Array<any> = [
    {
      id: 1,
      name: "Task Management",
      description: "Create a task management website",
      createDate: "28/02/2023",
      deadline: "10/03/2023",
      styles: ['material-symbols-rounded'],
    },
    {
      id: 2,
      name: "UI Design",
      description: "Design an UI for new website",
      createDate: "20/02/2023",
      deadline: "02/03/2023",
      styles: ['material-symbols-rounded'],
    },
    {
      id: 3,
      name: "Product Marketing",
      description: "Marketing new products",
      createDate: "20/02/2023",
      deadline: "02/03/2023",
      styles: ['material-symbols-rounded'],
    },
    {
      id: 4,
      name: "Create Mobile App",
      description: "Create a camera mobile app",
      createDate: "14/02/2023",
      deadline: "28/02/2023",
      styles: ['material-symbols-rounded'],
    },
    {
      id: 5,
      name: "Shopping Page",
      description: "Create a shopping website",
      createDate: "15/02/2023",
      deadline: "02/03/2023",
      styles: ['material-symbols-rounded'],
    },
    {
      id: 6,
      name: "Update Game",
      description: "Update FastFingers typing game",
      createDate: "10/02/2023",
      deadline: "25/02/2023",
      styles: ['material-symbols-rounded'],
    },
    {
      id: 7,
      name: "Create Ads",
      description: "Create advertisements for company",
      createDate: "10/02/2023",
      deadline: "25/02/2023",
      styles: ['material-symbols-rounded'],
    }
  ];

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
