import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project } from './project.schema';
import { User } from './user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: string;

  @Prop()
  startAt: string;

  @Prop()
  deadline: string

  @Prop()
  isDisable: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  assignees: User[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' } })
  project: Project;

  @Prop([String])
  styles: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
