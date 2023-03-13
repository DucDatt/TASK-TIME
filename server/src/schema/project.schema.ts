import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  projectId: string;

  @Prop()
  projectName: string;

  @Prop()
  projectDescription: string;

  @Prop()
  projectOwnerId: string;

  @Prop()
  startAt: string;

  @Prop()
  deadline: string;

  @Prop()
  disable: boolean;

  @Prop()
  isStarred: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  members: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
