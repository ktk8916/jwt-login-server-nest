import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './domain/entity/member';

@Controller('/api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getAllMembers(): Promise<Member[]> {
    return await this.memberService.getAllMembers();
  }
}
