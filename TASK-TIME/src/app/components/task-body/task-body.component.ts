import { EditPopupComponent } from './../edit-popup/edit-popup.component';
import { ColPopupComponent } from './../col-popup/col-popup.component';
import { MemberPopupComponent } from './../member-popup/member-popup.component';
import { Component, Inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskPopupComponent } from '../task-popup/task-popup.component';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/redux/states/task.state';
import { UserState } from 'src/redux/states/user.state';
import { map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { TaskActions } from 'src/redux/actions/task.action';
import { TaskModel } from 'src/app/model/task.model';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';
import { ProjectState } from 'src/redux/states/project.state';
import { ProjectActions } from 'src/redux/actions/project.action';

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
   id:string='';
   project$=this.store.select('project');
  constructor(
    private dialog: MatDialog,
    private _socket: Socket,
    private store: Store<{ task: TaskState; user: UserState,project:ProjectState}>,

    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.dispatch(ProjectActions.get({ id: this.id }))
    })
  }

  userSubscription!: Subscription;
  userState$ = this.store.select('user');
  user: User = <User>{};
  users: any[] = [];
  tasks!: TaskModel[];
  inProcessSubscription!: Subscription;
  task$ = this.store.select('task');
  task: TaskModel = <TaskModel>{};
  //projects = this.store.select('task', 'tasks');

  initialize() {

  }

  ngOnInit(): void {
    this.task$.subscribe((data)=>{
      this._socket.emit('create-new-task',{roomId:this.id});
    })

    this.userSubscription = this.userState$.subscribe((state) => {
      if (state.loading == false) {
        if (state.user._id) {
          this.user = state.user;

          this.store.dispatch(TaskActions.getAllForUser({ _id: this.user._id }));

          this._socket.emit('join-room', { roomId: this.id, user: this.user });

          this.listenUpdateData().subscribe((data: any) => {
            this.tasks = data;
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    // this.inProcessSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  deleteTask(task: any) {
    let tempTask: TaskModel = {
      ...task,
      disable: !task.disable,
    };

    this.store.dispatch(TaskActions.delete({ task: tempTask }));
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(TaskPopupComponent, {
      data: {
        user: this.user,
        projectId: this.id
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskModel) => {
      if (!result) return;
      let tempStartAt = new Date(result.startAt.toString());
      let tempDeadline = new Date(result.deadline.toString());
      let tempTask: TaskModel = {
        ...result,
        startAt: tempStartAt.toDateString(),
        deadline: tempDeadline.toDateString(),
      };
      this.store.dispatch(TaskActions.create({ task: tempTask }));
    });
  }

  openUpdateDialog(task: any): void {
    let dialogRef = this.dialog.open(EditPopupComponent, {
      data: task,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      let tempTask: TaskModel = {
        ...task,
        title: result.title,
        description: result.description,
        startAt: result.startAt.toDateString(),
        deadline: result.deadline.toDateString(),
      };

      this.store.dispatch(TaskActions.update({ task: tempTask }));

    });
  }

  openDialog2(): void {
    this.dialog.open(MemberPopupComponent);
  }

  openDialog3(): void {
    this.dialog.open(ColPopupComponent);
  }

  todo: any[] = [];

  doing: any[] = [];
  done: any[] = [];

  drop(event: CdkDragDrop<any[]>) {
    //get status of the task
    //if same column
    console.log;
    switch (event.container.id) {
      case 'cdk-drop-list-0':
        this.task = { ...this.task, status: 'todo' };
        break;
      case 'cdk-drop-list-1':
        this.task = { ...this.task, status: 'doing' };

        break;
      case 'cdk-drop-list-2':
        this.task = { ...this.task, status: 'done' };

        break;
    }

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

      this._socket.emit('update-data', { roomId: this.id, data: this.task });
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

  listenUpdateData() {
    return this._socket.fromEvent('send-data');
  }
  listenUpdateUser() {
    return this._socket.fromEvent('update-user');
  }
  setTask(event: any) {
    this.task = event;
  }

  newCol() { }
}
