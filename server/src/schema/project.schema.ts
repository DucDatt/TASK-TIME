import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

    // @Prop()
    // member: [
    //     {
    //         memberId: string,
    //     }
    // ]
}

export const ProjectSchema = SchemaFactory.createForClass(Project);