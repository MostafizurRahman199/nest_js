import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // if get unknown property from dto then it remove it
    forbidNonWhitelisted:true, //if get unknown property from dto then it show an error
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
