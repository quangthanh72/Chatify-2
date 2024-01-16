import { Module } from '@nestjs/common';
import { BoxChatController } from './box-chat.controller';
import { BoxChatService } from './box-chat.service';
import { MessagesModule } from './messages/messages.module';
import { BoxChatRepository } from './box-chat.repository';
import { BoxChatDocument, BoxChatSchema } from './models/box-chat.schema';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MessagesModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: BoxChatDocument.name, schema: BoxChatSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.string().required(),
      }),
    }),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [BoxChatController],
  providers: [BoxChatService, BoxChatRepository, BoxChatDocument],
})
export class BoxChatModule {}
