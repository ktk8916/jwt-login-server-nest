import { Injectable } from '@nestjs/common';
import { Member } from './domain/entity/member';

@Injectable()
export class MemberRepository {
  private static memberIdSeq: number = 0;
  private static readonly memberMap: Map<number, Member> = new Map<
    number,
    Member
  >();
  constructor() {}

  async save(member: Member): Promise<Member> {
    MemberRepository.memberIdSeq += 1;
    member.setSeqId(MemberRepository.memberIdSeq);
    MemberRepository.memberMap.set(MemberRepository.memberIdSeq, member);
    return member;
  }

  async findAll(): Promise<Member[]> {
    return [...MemberRepository.memberMap.values()];
  }

  async findByUsername(username: string): Promise<Member | null> {
    return [...MemberRepository.memberMap.values()].find((member) =>
      member.checkSameUsername(username),
    );
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<Member | null> {
    return [...MemberRepository.memberMap.values()].find((member) =>
      member.checkLoginInfo(username, password),
    );
  }
}
