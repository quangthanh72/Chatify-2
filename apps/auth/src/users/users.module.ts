import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersDocument, UsersSchema } from './models/users.schema';
import { UsersRepository } from './users.repository';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    DatabaseModule.forFeature([
      { name: UsersDocument.name, schema: UsersSchema },
    ]),
  ],
  providers: [UsersService, UsersRepository, JwtStrategy, LocalStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
