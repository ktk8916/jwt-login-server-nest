import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MemberModule } from '../member/member.module';
import { MemberRepository } from '../member/member.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MemberModule,
    JwtModule.register({
      secret: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      signOptions: {
        expiresIn: '3d',
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MemberRepository],
})
export class AuthModule {}
