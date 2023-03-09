import { Module, Controller } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://khoa11530:112345678khoa@cluster1.tw5ofan.mongodb.net/TASK-TIME'),
    ProjectModule
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
