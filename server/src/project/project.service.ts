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

    // async getById(project: Project) {
    //     let id : string = '';
    //     try{
    //         if (id === project.projectId) {
    //             return project;
    //         }
    //         console.log(project);
    //     }
    //     catch(error)
    //     {
    //         return null;
    //     }
    // }
    // async getById(projectId: string) {
    //     try {
    //         let project = await this.projectModel.find((id)=>id.name).exec();
    //         return project;
    //     }
    //     catch (error) {
    //         return null;
    //     }
    // }

    
}
