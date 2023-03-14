import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schema/project.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
  ) { }

  async create(project: Project) {
    console.log(project.owner);
    try {
      let newProject: Project = {
        projectId: project.projectId,
        projectName: project.projectName,
        projectDescription: project.projectDescription,
        projectOwnerId: project.projectOwnerId,
        startAt: project.startAt,
        deadline: project.deadline,
        disable: project.disable,
        isStarred: project.isStarred,
        owner: project.owner,
        members: project.members,
      };
      const createdProject = new this.projectModel(newProject);
      return createdProject.save();
    } catch (error) {
      return null;
    }
  }

  async getAllByUserId(id: string) {
    try {
      console.log(id);
      let myProjects = await this.projectModel
        .find({ owner: { $eq: Object(id) } })
        .populate('owner', 'displayName email photoURL', this.userModel)
        .exec();
      let invitedProject = await this.projectModel
        .find({ members: { $eq: Object(id) } })
        .populate('owner', 'displayName email photoURL')
        .exec();
      let projects = [];
      projects.push(myProjects);
      projects.push(invitedProject);
      console.log(projects);
      return myProjects;
    } catch (error) {
      return null;
    }
  }

  async inviteMember(projectId: string, email: string) {
    try {
      let user = await this.userService.findByEmail(email);
      if (user != null) {
        let tempProject = await this.projectModel
          .findOne({ projectId: projectId })
          .exec();
        tempProject['members'].push(user);
        return tempProject.save();
      }
    } catch (error) {
      return null;
    }
  }

  async getAll() {
    try {
      let project = await this.projectModel.find().exec();
      return project;
    } catch (error) {
      return null;
    }
  }

  async getById(projectId: string) {
    try {
      let findProject = await this.projectModel
        .findOne({ projectId: projectId })
        .exec();
      return findProject;
    } catch (error) {
      return null;
    }
  }

  async updateProject(projectId: string, project: Project) {
    try {
      let tempProject = await this.projectModel
        .findOne({ projectId: projectId })
        .exec();

      tempProject['projectName'] = project.projectName;
      tempProject['projectDescription'] = project.projectDescription;
      tempProject['startAt'] = project.startAt;
      tempProject['deadline'] = project.deadline;
      tempProject['isStarred'] = project.isStarred;
      tempProject['disable'] = project.disable;
      tempProject['owner'] = project.owner;
      tempProject['members'] = project.members;

      return tempProject.save();
    } catch (error) {
      return null;
    }
  }
}
