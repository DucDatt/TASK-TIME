import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskPopupComponent } from '../task-popup/task-popup.component';

@Component({
  selector: 'app-task-body',
  templateUrl: './task-body.component.html',
  styleUrls: ['./task-body.component.scss']
})
export class TaskBodyComponent {
  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(TaskPopupComponent)
  }

  todo = [{
    name: 'Coding',
    member: 'Nam',
    date: '28/02/2023',
    deadline: '10/03/2023',
    styles: ['material-symbols-rounded']
  },
  {
    name: 'Create login page',
    member: 'Nam',
    date: '28/02/2023',
    deadline: '10/03/2023',
    styles: ['material-symbols-rounded']
  },
  {
    name: 'Create home page',
    member: 'Nam',
    date: '28/02/2023',
    deadline: '10/03/2023',
    styles: ['material-symbols-rounded']
  },
  {
    name: 'Create task page',
    member: 'Nam',
    date: '28/02/2023',
    deadline: '10/03/2023',
    styles: ['material-symbols-rounded'],
  }];

  progress = [
    {
      name: 'Server',
      member: 'Nam',
      date: '28/02/2023',
      deadline: '10/03/2023',
      styles: ['material-symbols-rounded']
    },
    {
      name: 'Navbar',
      member: 'Nam',
      date: '28/02/2023',
      deadline: '10/03/2023',
      styles: ['material-symbols-rounded']
    }];

  done = [{

    name: 'Color',
    member: 'Nam',
    date: '28/02/2023',
    deadline: '10/03/2023',
    styles: ['material-symbols-rounded']
  },
  {
    name: 'Font',
    member: 'Nam',
    date: '28/02/2023',
    deadline: '10/03/2023',
    styles: ['material-symbols-rounded']
  }
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
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
      array[index].styles = array[index].styles.filter((item: any) => item !== color)
      //push to the end of the list
      let temp = array[index];
      array.splice(index, 1);
      array.push(temp);
    }
  }

  newCol(){

  }
  selected = 'option2';


}
