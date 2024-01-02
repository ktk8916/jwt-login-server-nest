import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { Member } from './domain/entity/member';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async getAllMembers(): Promise<Member[]> {
    return await this.memberRepository.findAll();
  }
}
