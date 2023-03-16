import { Injectable } from '@nestjs/common/decorators';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,

} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProjectService } from 'src/project/project.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
@WebSocketGateway()
export class TaskGateway {
  constructor(
    private _taskService: TaskService, // private _projectService: ProjectService,
  ) { }
  @WebSocketServer() server:Server;
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  @SubscribeMessage('join-room')
  async handleJoinRoom(client: Socket, payload: any) {
  
    client.join(payload.roomId);
    //broadcast to room
    client.broadcast.to(payload.roomId).emit('update-user',payload.user);
    let tasks= await this._taskService.getAllTaskByProjectId(payload.roomId);
    console.log(tasks);
    this.server.to(payload.roomId).emit('send-data', tasks);
  }
  // @SubscribeMessage('leave-room')
  // async handleLeaveRoom(client: any, payload: any) {
  //   client.leave(payload);
  //   client.broadcast.to(payload).emit('update-user',payload.user);
  //   let tasks= await this._taskService.getAllTaskByProjectId(payload.roomId);
  //   this.server.to(payload.roomId).emit('send-data', tasks);
  // }

  @SubscribeMessage('update-data')
  async handleUpdateData(client: any, payload: any) {
    let task = await this._taskService.updateTaskStatus(payload.data.id,payload.data.status);
    let tasks= await this._taskService.getAllTaskByProjectId(payload.roomId);
    console.log('tasks',task);
    this.server.to(payload.roomId).emit('send-data', tasks);
  }
}
