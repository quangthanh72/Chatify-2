import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersDocument, UsersSchema } from './models/users.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UsersDocument.name, schema: UsersSchema },
    ]),
    LoggerModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
