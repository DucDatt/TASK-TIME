import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUid(uid: string) {
    try {
      let user = await this.userModel.findOne({ uid: uid }).exec();
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<UserDocument> {
    try {
      let user = await this.userModel.findOne({ email: email }).exec();
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(user: User) {
    try {
      // console.log(user);
      let tempUser = await this.findByUid(user.uid);
      // console.log(tempUser);
      if (tempUser) {
        console.log('User already exists');
        return null;
      }
      let newUser: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      const createdUser = new this.userModel(newUser);
      return createdUser.save();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
