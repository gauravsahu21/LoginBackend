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
import { Brand } from 'src/common/dto/brands.dto';
import { BrandEntity } from 'src/db/entity/brands.entity';
import { CatalogueEntity } from 'src/db/entity/catalogue.entity';
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
    if (!['admin', 'master','Management','Brand Representative'].includes(request.user.profileType)) {
      throw new UnauthorizedException('Need Read access!!!');
    }
    return true;
  }
}

@Injectable()
export class PermissionsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
    const permissions = user.permissions;
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
      throw new UnauthorizedException('Access denied');
    }

    request.user = user;
    if (moduleName == 'catelogue' && user.profileType != 'admin') {
      if (method === 'GET') {
        const brandId = request.query.brandId;
        if (!user.brandIds.includes(brandId)) {
          throw new UnauthorizedException('Access denied');
        }
      } else if (method === 'DELETE') {
        const catelogueId = request.query.catelogueId;
        const product = await CatalogueEntity.findOne({
          where: { catelogueId },
        });
        if (!user.brandIds.includes(product.brandId)) {
          throw new UnauthorizedException('Access denied');
        }
      } else if (method === 'POST') {
        const brandId = request.body.brandId;
        if (!user.brandIds.includes(brandId)) {
          throw new UnauthorizedException('Access denied');
        }
      }
    }
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
