import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Put, Query } from '@nestjs/common/decorators';
import { Project } from 'src/schema/project.schema';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get('all')
  getAll() {
    return this.projectService.getAll();
  }

  @Post('create')
  createProject(@Body() project: Project) {
    console.log(project);
    return this.projectService.create(project);
  }

  @Get()
  getById(@Query('id') id: string) {
    return this.projectService.getById(id);
  }

  @Put('update')
  async updateProject(@Body('projectId') id: string, @Body() project: Project) {
    console.log(project);
    return await this.projectService.updateProject(id, project);
  }

  @Get('all/user/:id')
  async getAllByUserId(@Param('id') id: string) {
    return await this.projectService.getAllByUserId(id);
  }
}
