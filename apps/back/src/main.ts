import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));
  app.enableCors();
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = "/api/v1";
  app.setGlobalPrefix(globalPrefix)

  const port = configService.get('port') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Freight Simulator Backend API')
    .setDescription('This API serves to process data related to the freight simulator, it has both the logic to handle the address data to calculate this freight, and the integration to the google geocode api to get the distance.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://127.0.0.1:${port}${globalPrefix}`
  );
}
bootstrap();
