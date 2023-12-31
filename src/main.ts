import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('TODO_BACK')
    .addBearerAuth()
    .build();
  const docs = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, docs);
  await app.listen(PORT).then(() => console.log(`Server started on ${PORT}`));
}
bootstrap();
