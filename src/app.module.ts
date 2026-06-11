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

@Module({
  imports: [CategoryModule, StudentModule, CustomerModule],
  controllers: [AppController, UserController, ProductController, MynameController, UserRoleController],
  providers: [AppService, ProductService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
