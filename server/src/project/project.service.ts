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
        invitedMembers: project.invitedMembers,
      };
      const createdProject = new this.projectModel(newProject);
      return createdProject.save();
    } catch (error) {
      return null;
    }
  }

  async getAllByUserId(id: string) {
    try {
      // console.log(id);
      let myProjects = await this.projectModel
        .find({ owner: { $eq: Object(id) } })
        .populate('owner', 'displayName email photoURL', this.userModel)
        .exec();
      let invitedProject = await this.projectModel
        .find({ members: { $eq: Object(id) } })
        .populate('owner', 'displayName email photoURL', this.userModel)
        .exec();
      // console.log(invitedProject);
      let projects = [...myProjects, ...invitedProject];
      console.log(`projects length get from user ${id} : ${projects.length}`);
      return projects;
    } catch (error) {
      return null;
    }
  }

  async inviteMember(email: string, project: ProjectDocument) {
    try {
      let user = await this.userModel.findOne({ email: email }).exec();
      console.log(`user with email : ${user.email}`);
      if (user == null) {
        return null;
      } else {
        let updateProject = await this.projectModel
          .findOneAndUpdate(
            { projectId: project.projectId },
            { $push: { invitedMembers: user._id } },
            { new: true },
          )
          .exec();
        // console.log(updateProject);
        return updateProject;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async acceptRequest(_id: string, project: ProjectDocument) {
    try {
      let user = await this.userModel.findById(_id).exec();
      let newProject = await {
        ...project,
        members: [...project.members, user],
        invitedMembers: project.invitedMembers.filter(
          (_id) => _id != Object(_id),
        ),
      }
      return await this.projectModel.findByIdAndUpdate(project._id, newProject, { new: true }).exec();
    } catch (error) {
      return null;
    }
  }
  async requestJoin(_id: string) {
    try {
      console.log(` requesting liss to join a project for ${_id}`);
      let requestProject = await this.projectModel
        .find({ invitedMembers: { $eq: Object(_id) } })
        .populate('owner', 'displayName email photoURL', this.userModel)
        .sort({ createdAt: -1 })
        .exec();
      return requestProject;
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
