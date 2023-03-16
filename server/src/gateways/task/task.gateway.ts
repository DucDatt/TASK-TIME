import { Injectable } from '@nestjs/common/decorators';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ProjectService } from 'src/project/project.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
@WebSocketGateway()
export class TaskGateway {
  constructor(
    private _taskService: TaskService, // private _projectService: ProjectService,
  ) {}
  @WebSocketServer() server;
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  @SubscribeMessage('update-data')
  async handleUpdateData(client: any, payload: any) {
    let task = await this._taskService.updateTask(payload.id, payload);
    console.log(payload.roomId);
    if (task) {
      console.log(task);
      // this._projectService.getById(payload.id);
      this.server.to(payload.roomId).emit('send-data', task);
    }
  }
}
