import { NestFactory } from '@nestjs/core';
import { BoxChatModule } from './box-chat.module';

async function bootstrap() {
  const app = await NestFactory.create(BoxChatModule);
  await app.listen(3000);
}
bootstrap();
