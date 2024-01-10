import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, map, of } from 'rxjs';
import { UserDto } from '@app/common';
import { AUTH_SERVICE } from '../constants/services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = this.extractTokenFromHeader(request);

    if (!jwt) {
      return false;
    }

    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        map((res) => {
          request.user = res;
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  private extractTokenFromHeader(request: any): string | null {
    return request.headers['authorization'] || null;
  }
}
