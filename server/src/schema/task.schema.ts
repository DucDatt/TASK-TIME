import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {

    @Prop({ required: true })
    taskId: string;


    @Prop({ required: true })
    projectId: string;

    @Prop()
    taskName: string;

    @Prop()
    addMember: string;

    @Prop()
    projectowner: string;

    @Prop()
    taskMember: string;

    @Prop()
    startAt: string;

    @Prop()
    deadLine: string;

    @Prop()
    disable: false;

}

export const TaskSchema = SchemaFactory.createForClass(Task);