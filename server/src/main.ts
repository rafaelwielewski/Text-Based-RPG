import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:8081',
        'http://186.211.97.242:8081',
        'https://text-based-rpg.vercel.app',
        'https://text-based-rpg.vercel.app:8081',
      ],
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.listen(8082, () => {
  //   console.log(`Server Started`);
  // });
  app.listen(8082, '0.0.0.0', () => {
    console.log(`Server Started`);
  });
}
bootstrap();
