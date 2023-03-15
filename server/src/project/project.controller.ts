import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Put, Query } from '@nestjs/common/decorators';
import { Project, ProjectDocument } from 'src/schema/project.schema';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get('all')
  getAll() {
    return this.projectService.getAll();
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

  //add member by email
  @Put('invite/:email')
  async addMember(
    @Body() project: ProjectDocument,
    @Param('email') email: string,
  ) {
    console.log(email);
    // console.log(project);
    return await this.projectService.inviteMember(email, project);
  }

  @Get('request/:id')
  async requestJoin(@Param('id') _id: string) {
    console.log(`requesting to join project for ${_id}`);
    return await this.projectService.requestJoin(_id);
  }

  @Put('accept/:id')
  async acceptRequest(
    @Body() project: ProjectDocument,
    @Param('id') _id: string,
  ) {
    return await this.projectService.acceptRequest(_id, project);
  }
}
