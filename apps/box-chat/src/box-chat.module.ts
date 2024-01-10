import { Module } from '@nestjs/common';
import { BoxChatController } from './box-chat.controller';
import { BoxChatService } from './box-chat.service';
import { MessagesModule } from './messages/messages.module';
import { BoxChatRepository } from './box-chat.repository';
import { BoxChatDocument, BoxChatSchema } from './models/box-chat.schema';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BoxChatController],
  providers: [BoxChatService, BoxChatRepository, BoxChatDocument],
})
export class BoxChatModule {}
