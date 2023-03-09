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
            return this.projectModel.updateOne({ projectId: projectId }, project).exec();
        } catch (error) {
            return null;
        }
    }
    
    // async deleteProject(projectId: string) {
    //     try {
    //         let findProject = await this.projectModel.findOne({ projectId: projectId }).exec();
    //         Project.disable = true;
    //         return findProject;
    //     }
    //     catch (error) {
    //         return null;
    //     }
    // }
}
