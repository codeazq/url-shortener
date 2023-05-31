import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

// Solves: TypeError: Do not know how to serialize a BigInt
//     at JSON.stringify (<anonymous>)
(BigInt.prototype as any).toJSON = function (): number {
  return Number(this);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Url Shortner API')
    .setDescription(
      'TThis is a URL shortener application. It allows users to shorten long URLs by create short, unique URL that redirects to the original long URL.',
    )
    .setVersion('1.0')
    .addTag('url-shortener')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors();
  await app.listen(4000);
}
bootstrap();
