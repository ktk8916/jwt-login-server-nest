import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MemberRepository } from '../member/member.repository';
import { SignupRequest } from './domain/request/signup.request';
import { Member } from '../member/domain/entity/member';
import {
  DUPLICATE_USERNAME,
  MEMBER_NOT_FOUND,
} from '../exception/exception.type';
import { LoginRequest } from './domain/request/login.request';
import { LoginResponse } from './domain/response/login.response';
import { JwtService } from '@nestjs/jwt';
import { TokenInfo } from '../jwt/TokenInfo';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly memberRepository: MemberRepository,
  ) {}

  async signup(request: SignupRequest): Promise<LoginResponse> {
    const { username, password, nickname } = request;
    const member = new Member(null, username, password, nickname);

    const findMember: Member =
      await this.memberRepository.findByUsername(username);

    if (findMember) {
      throw new BadRequestException(DUPLICATE_USERNAME);
    }

    const savedMember = await this.memberRepository.save(member);

    return this.getLoginResponse(savedMember);
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const { username, password } = request;
    const findMember = await this.memberRepository.findByUsernameAndPassword(
      username,
      password,
    );
    if (!findMember) {
      throw new UnauthorizedException(MEMBER_NOT_FOUND);
    }
    return this.getLoginResponse(findMember);
  }

  private getLoginResponse(member: Member): LoginResponse {
    const token = this.generateToken(member);
    return new LoginResponse(token);
  }

  private generateToken(member: Member): string {
    const { id, username, nickname } = member;
    const tokenInfo = new TokenInfo(id, username, nickname);
    return this.jwtService.sign(instanceToPlain(tokenInfo));
  }

  private extractMember(token: string): TokenInfo {
    return this.jwtService.verify(token);
  }
}
