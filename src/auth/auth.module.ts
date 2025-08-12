import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [JwtModule.register({
    global : true,
    signOptions : {
      expiresIn : "2d"
    }
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
