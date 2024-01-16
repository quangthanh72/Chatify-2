import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, catchError, map, of, tap, timeout } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwt = req.headers['authorization']?.split(' ')[1];
    if (!jwt) {
      return false;
    }
    //   return this.authClient
    //     .send<UserDto>('authenticate', {
    //       jwt: jwt,
    //     })
    //     .pipe(timeout(5000));
    // }
  }
}
