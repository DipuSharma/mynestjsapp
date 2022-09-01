import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as Host from './_config/config'
import cors from 'cors'
import * as connectDb from './_config/connectdb';



const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({ keys: ['absdss'] }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(Host.HOST_SERVER.PORT, () => { console.log(`Server Listen At http://localhost:${Host.HOST_SERVER.PORT}`)});
}
bootstrap();
