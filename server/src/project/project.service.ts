import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schema/project.schema';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async create(project: Project) {
        console.log(project);
        try {
            const createdProject = new this.projectModel(project);
            return createdProject.save();

        }
        catch (error) {
            return null;
        }
    }

    async getAll() {
        try {
            let project = await this.projectModel.find().exec();
            return project;
        }
        catch (error) {
            return null;
        }
    }

    async getById(projectId: string) {
        try {
            let findProject = await this.projectModel.findOne({ projectId: projectId }).exec();
            return findProject;
        }
        catch (error) {
            return null;
        }
    }

    async updateProject(projectId: string, project: Project) {
        try {
            let tempProject = await this.projectModel.findOne({ projectId: projectId }).exec();

            tempProject['projectName'] = project.projectName;
            tempProject['projectDescription'] = project.projectDescription;
            tempProject['startAt'] = project.startAt;
            tempProject['deadline'] = project.deadline;
            tempProject['isStarred'] = project.isStarred;
            tempProject['disable'] = project.disable;

            return tempProject.save();
        } catch (error) {
            return null;
        }
    }
}
