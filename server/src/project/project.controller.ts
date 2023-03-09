import { Body, Controller, Get, Post } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Project } from 'src/schema/project.schema';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('all')
  getAll(){
      return this.projectService.getAll();
  }

  @Post('create')
  createProject(@Body() project: Project){
      return this.projectService.create(project);
  }

  // @Get()
  // getById(@Query('id')id: Project){
  //   return this.projectService.getById(id);
  // }
}
