import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { User, UserDocument } from './user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  id: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    default: 'todo',
    enum: ['todo', 'doing', 'done'],
  })
  status: string;

  @Prop()
  startAt: string;

  @Prop()
  deadline: string

  @Prop({
    default: false,
  })
  isDisable: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  assignees: UserDocument[];

  @Prop()
  projectId: string;

  @Prop([String])
  styles: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
