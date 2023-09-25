import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Reflector } from '@nestjs/core';
import accessibility from './routes';
dotenv.config();

@Injectable()
export class WriteAccess implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      try {
        const user = this.jwtService.verify(token, {
          secret: process.env.ACCESS_SECRET_TOKEN,
        });
        request.user = user;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      throw new UnauthorizedException('login in once again');
    }
    if (!['admin'].includes(request.user.profileType)) {
      throw new UnauthorizedException('You are not');
    }
    return true;
  }
}

@Injectable()
export class PasswordWriteAccess implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      try {
        const user = this.jwtService.verify(token, {
          secret: process.env.ACCESS_SECRET_TOKEN,
        });
        request.user = user;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      throw new UnauthorizedException('login in once again');
    }
    console.log(request.user.profileType);
    if (!['admin', 'master'].includes(request.user.profileType)) {
      throw new UnauthorizedException('Need Read access!!!');
    }
    return true;
  }
}

// @Injectable()
// export class PermissionsAuthGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const permissionsHeader = request.headers['permissions'];

//     if (!permissionsHeader) {
//       throw new UnauthorizedException('Permissions header not found');
//     }

//     const permissions = JSON.parse(permissionsHeader);

//     const route = this.reflector.get<string>('route', context.getHandler());

//     if (!route) {
//       throw new UnauthorizedException('Route not found in metadata');
//     }

//     const requiredPermission = permissions[route];

//     if (!requiredPermission) {
//       throw new UnauthorizedException('Permission not defined for this route');
//     }

//     // Check if the user has the necessary permission (e.g., 'view', 'edit', 'add', 'delete')
//     if (!requiredPermission.view) {
//       throw new UnauthorizedException('Access denied');
//     }

//     return true;
//   }
// }

// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token not found in headers');
    }

    const user = this.verifyToken(token);
    const url = request.url;
    const method = request.method;
    const parsedUrl = new URL(url, 'http://dummy');
    const pathName = parsedUrl.pathname;

    // Extract the first word from the pathname
    const moduleName = pathName.split('/')[1];
    console.log(moduleName);
    const permissions = user.permissions;
    console.log(permissions, user);
    let access = accessibility(permissions, method, moduleName);
    if (typeof access == 'string') {
      throw new UnauthorizedException(accessibility);
    }

    if (!access) {
      throw new UnauthorizedException('Access denied');
    }

    if (
      access &&
      user.profileType != 'admin' &&
      moduleName == 'users' &&
      method == 'POST' &&
      user.userId !== request.body.userId
    ) {
        console.log( user.userId , request.body.userId)
      // It means user is trying to update other user's profile
      console.log('User is trying to update other user profile');
      throw new UnauthorizedException('Access denied');
    }
    console.log(access);
    return true;
  }

  private extractToken(request: any): string | null {
    const authHeader = request.headers['authorization'];
    return authHeader && authHeader.split(' ')[1];
  }

  private verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.ACCESS_SECRET_TOKEN,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
