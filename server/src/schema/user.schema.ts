import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    uid: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    displayName: string;

    @Prop({ required: true })
    photoURL: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);