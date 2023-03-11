import { ProjectsService } from 'src/app/Services/projects.service';
import { TaskService } from './../../Services/task.service';
import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'


@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss']
})
export class TaskPopupComponent {
  constructor(private taskService: TaskService, private projectService: ProjectsService) { }


}
