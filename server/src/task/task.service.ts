import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schema/task.schema';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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
      const createdTask = await this.taskModel.create(newTask);
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
      console.log(taskId);
      let findTask = await this.taskModel
        .findOne({ _id: Object(taskId) })
        .exec();
      console.log(findTask);
      return findTask;
    } catch (error) {
      return null;
    }
  }

  async updateTask(taskId: string, task: Task) {
    console.log('task', task);
    try {
      let tempTask = await this.taskModel.findOne({ id: taskId }).exec();
      console.log(tempTask);
      tempTask.title = task.title;
      tempTask.description = task.description;
      tempTask.startAt = task.startAt;
      tempTask.deadline = task.deadline;
      tempTask.isDisable = task.isDisable;
      tempTask.assignees = task.assignees;
      tempTask.projectId = task.projectId;
      tempTask.status = task.status;
      return tempTask.save();
    } catch (error) {
      console.log(error);
    }
  }

  getAllTaskByProjectId(id: string) {
    try {
      let myTasks = this.taskModel
        .find({ projectId: { $eq: Object(id) } })
        .populate('project', 'projectId projectName members')
        .exec();
      console.log(myTasks);

      return myTasks;
    } catch (error) {
      return null;
    }
  }
}
