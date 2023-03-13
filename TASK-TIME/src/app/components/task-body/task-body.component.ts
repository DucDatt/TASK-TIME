import { EditPopupComponent } from './../edit-popup/edit-popup.component';
import { ColPopupComponent } from './../col-popup/col-popup.component';
import { MemberPopupComponent } from './../member-popup/member-popup.component';
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskPopupComponent } from '../task-popup/task-popup.component';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-task-body',
  templateUrl: './task-body.component.html',
  styleUrls: ['./task-body.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: 0 }),
            style({ transform: 'rotate(2turn)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class TaskBodyComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(TaskPopupComponent);
  }

  openDialog2(): void {
    this.dialog.open(MemberPopupComponent);
  }

  openDialog3(): void {
    this.dialog.open(ColPopupComponent);
  }

  openDialog4(): void {
    this.dialog.open(EditPopupComponent);
  }

  todo = [
    //   {
    //   name: 'Coding',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded']
    // },
    // {
    //   name: 'Create login page',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded']
    // },
    // {
    //   name: 'Create home page',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded']
    // },
    // {
    //   name: 'Create task page',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded'],
    // }
  ];

  progress = [
    // {
    //   name: 'Server',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded']
    // },
    // {
    //   name: 'Navbar',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded']
    // }
  ];

  done = [
    //   {
    //   name: 'Color',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded']
    // },
    // {
    //   name: 'Font',
    //   member: 'Nam',
    //   date: '28/02/2023',
    //   deadline: '10/03/2023',
    //   styles: ['material-symbols-rounded']
    // }
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  changeColor(color: string, index: number, array: any) {
    if (!array[index].styles.includes(color)) {
      array[index].styles.push(color);
      //add to the top of the list
      let temp = array[index];
      array.splice(index, 1);
      array.unshift(temp);
    } else {
      //remove color from list
      array[index].styles = array[index].styles.filter(
        (item: any) => item !== color
      );
      //push to the end of the list
      let temp = array[index];
      array.splice(index, 1);
      array.push(temp);
    }
  }

  newCol() {}
}
