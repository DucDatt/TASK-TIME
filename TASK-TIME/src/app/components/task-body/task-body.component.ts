import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-body',
  templateUrl: './task-body.component.html',
  styleUrls: ['./task-body.component.scss']
})
export class TaskBodyComponent {
  todo = [{
    name:'Coding',
    styles:['material-symbols-rounded']
  },
  {
    name:'Create login page',
    styles:['material-symbols-rounded']
  },
  {
    name:'Create home page',
    styles:['material-symbols-rounded']
  },
  {
    name:'Create task page',
    styles:['material-symbols-rounded'],
  }];


  progress = [
    {name:'Server',styles:['material-symbols-rounded']},
    {name:'Navbar',styles:['material-symbols-rounded']}];

  done = [{

    name: 'Color'
    , styles: ['material-symbols-rounded']
  }
    , {
    name: 'Font',
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
      array[index].styles = array[index].styles.filter((item:any) => item !== color)
      //push to the end of the list
      let temp = array[index];
      array.splice(index, 1);
      array.push(temp);
    }
  }
}
