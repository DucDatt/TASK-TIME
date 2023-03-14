import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { User, UserDocument } from './user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  deadline: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  assignees: UserDocument[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' } })
  project: ProjectDocument;

  @Prop([String])
  styles: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
