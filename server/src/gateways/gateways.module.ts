import { Module } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';
import { ProjectGateway } from './project/project.gateway';
import { TaskGateway } from './task/task.gateway';

@Module({
  imports: [],
  providers: [ProjectGateway],
})
export class GatewaysModule {}
