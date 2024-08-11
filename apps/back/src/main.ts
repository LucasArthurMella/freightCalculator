import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = "/v1/api";
  app.setGlobalPrefix(globalPrefix)

  const port = configService.get('port') || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://127.0.0.1:${port}${globalPrefix}`
  );
}
bootstrap();
