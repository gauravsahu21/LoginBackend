import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class WriteAccess implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if(token) {
          try {
              const user =  this.jwtService.verify(token,{secret: process.env.ACCESS_SECRET_TOKEN});
              request.user = user;
          } catch (error) {
              throw new UnauthorizedException('Invalid token')
          }
      } else {
          throw new UnauthorizedException('login in once again')
      }
      if (!["admin"].includes(request.user.profileType)) {
          throw new UnauthorizedException('Need Read access!!!')
      }
      return true;
    }
  }

