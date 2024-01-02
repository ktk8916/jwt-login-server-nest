import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';

@Module({
  controllers: [MemberController],
  providers: [MemberRepository, MemberService],
  exports: [MemberRepository],
})
export class MemberModule {}
