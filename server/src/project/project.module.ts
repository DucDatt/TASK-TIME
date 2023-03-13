import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schema/project.schema';
import { forwardRef } from '@nestjs/common/utils';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
