import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRoleController } from './user-role/user-role.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    CategoryModule, 
    StudentModule, 
    CustomerModule, 
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    TeacherModule
],
  controllers: [
    AppController, 
    UserController, 
    ProductController, 
    MynameController, 
    UserRoleController, 
    DatabaseController, 
    EvController
  ],
  providers: [
    AppService, 
    ProductService, 
    DatabaseService, 
    EvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
