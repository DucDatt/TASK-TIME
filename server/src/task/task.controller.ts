import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Task } from 'src/schema/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Get('all')
  getAll(){
    return this.taskService.getAll();
  }

  @Post('create')
  createTask(@Body() task: Task){
    return this.taskService.create(task);
  }

  @Get()
  getById(@Query('id')id: string){
    return this.taskService.getById(id);
  }

  @Put('update')
  updateTask(@Body('taskId') id: string, @Body() task: Task){
    return this.taskService.updateTask(id, task);
  }
  
}
