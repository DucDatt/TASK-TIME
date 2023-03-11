import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schema/task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async create(task: Task) {
        try {
            const createdTask = new this.taskModel(task);
            return createdTask.save();
        }
        catch (error) {
            return null;
        }
    }

    async getAll() {
        try {
            let task = await this.taskModel.find().exec();
            return task;
        }
        catch (error) {
            return null;
        }
    }

    async getById(taskId: string) {
        try {
            let findTask = await this.taskModel.findOne({ taskId: taskId }, Task).exec();
            return findTask
        } catch (error) {
            return null;
        }
    }

    async updateTask(taskID: string, Task: Task) {
        try {
            return this.taskModel.updateOne({ taskId: taskID }, Task).exec();
        } catch (error) {
            return null;
        }
    }
}

