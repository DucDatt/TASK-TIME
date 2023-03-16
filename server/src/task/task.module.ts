import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from 'src/schema/task.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { TaskGateway } from 'src/gateways/task/task.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskGateway],
})
export class TaskModule {}
