import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose, Types } from 'mongoose';
import { ProjectDocument } from 'src/schema/project.schema';
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
        projectId: new Types.ObjectId(task.projectId),
        styles: task.styles,
      };
      console.log(newTask);
      const createdTask = await this.taskModel.create(newTask);
      return createdTask.save();
    } catch (error) {
      return null;
    }
  }

  async getAllByUserId(id: string) {
    try {
 
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
      // console.log(tasks);
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
  async deleteTask(id){
    let task= await this.taskModel.findOne({id:id}).exec();
    return task.remove();
  }

  async getById(taskId: string) {
    try {
     
      let findTask = await this.taskModel
        .findOne({ _id: Object(taskId) })
        .exec();
      // console.log(findTask);
      return findTask;
    } catch (error) {
      return null;
    }
  }

  async updateTask(task: Task) {
    // console.log('task', task);
    try {
      let tempTask = await this.taskModel.findOne({ id: task.id }).exec();
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
  async updateTaskStatus(id:string,status:string){
    try {
      let tempTask = await this.taskModel.findOne({ id:id }).exec();
      tempTask.status =status;
   
      return tempTask.save();
    } catch (error) {
      console.log(error);
    }
  }

 async getAllTaskByProjectId(id: string) {
  console.log(id);
    try {
      let myTasks = await this.taskModel.find({projectId:new Types.ObjectId(id)}).populate('owner').populate('assignees').exec();
      return myTasks;
    } catch (error) {
      console.log(error);
    }
  }
}
