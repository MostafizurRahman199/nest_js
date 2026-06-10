import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    console.log("Authorization",authHeader);

    if(authHeader === 'Bearer my-token'){
      return true;
    }
    else{
      throw new UnauthorizedException('You have no permission to access this resource');
    }
  }
}
