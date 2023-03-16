import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schema/task.schema';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async create(task: Task) {
        try {
            let newTask: Task = {
                id: Date.now().toString(),
                title: task.title,
                description: task.description,
                status: 'todo',
                startAt: task.startAt,
                deadline: task.deadline,
                isDisable: false,
                owner: task.owner,
                assignees: task.assignees,
                projectId: task.projectId,
                styles: task.styles,
            };
            const createdTask = new this.taskModel(newTask);
            return createdTask.save();
        } catch (error) {
            return null;
        }
    }

    async getAllByUserId(id: string) {
        try {
            console.log(id);
            let myTasks = await this.taskModel
                .find({ owner: { $eq: Object(id) } })
                .populate('owner', 'displayName email photoURL', this.userModel)
                .exec();
            let invitedTask = await this.taskModel
                .find({ members: { $eq: Object(id) } })
                .populate('owner', 'displayName email photoURL')
                .exec();
            let tasks = [];
            tasks.push(myTasks);
            tasks.push(invitedTask);
            console.log(tasks);
            return myTasks;
        } catch (error) {
            return null;
        }
    }

    async getAll() {
        try {
            let task = await this.taskModel.find().exec();
            return task;
        } catch (error) {
            return null;
        }
    }

    async getById(taskId: string) {
        try {
            let findTask = await this.taskModel
                .findOne({ id: taskId })
                .exec();
            return findTask;
        } catch (error) {
            return null;
        }
    }

    async updateTask(taskId: string, task: Task) {
        try {
            let tempTask = await this.taskModel
                .findOne({ id: taskId })
                .exec();

            tempTask['title'] = task.title;
            tempTask['description'] = task.description;
            tempTask['startAt'] = task.startAt;
            tempTask['deadline'] = task.deadline;
            tempTask['isDisable'] = task.isDisable;
            tempTask['assignees'] = task.assignees;
            tempTask['projectId'] = task.projectId;

            return tempTask.save();
        } catch (error) {
            return null;
        }
    }
}

