import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MemberModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
