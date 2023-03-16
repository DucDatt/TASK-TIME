import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Task } from 'src/schema/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  getAll() {
    return this.taskService.getAll();
  }

  @Post('create')
  createTask(@Body() task: Task) {
    console.log(task);
    return this.taskService.create(task);
  }

  @Get()
  getById(@Query('id') id: string) {
    return this.taskService.getById(id);
  }

  @Put('update')
  async updateTask(@Body('taskId') id: string, @Body() task: Task) {
    console.log(task);
    return await this.taskService.updateTask(id, task);
  }

  @Get('all/user')
  async getAllByUserId(@Query('id') id: string) {
    return await this.taskService.getAllByUserId(id);
  }
}
