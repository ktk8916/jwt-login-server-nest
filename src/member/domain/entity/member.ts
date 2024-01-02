export class Member {
  id: number;
  username: string;
  password: string;
  nickname: string;
  constructor(
    id: number,
    username: string,
    password: string,
    nickname: string,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.nickname = nickname;
  }

  setSeqId(memberIdSeq: number): void {
    this.id = memberIdSeq;
  }

  checkSameUsername(username: string): boolean {
    return this.username === username;
  }

  checkLoginInfo(username: string, password: string): boolean {
    return this.username === username && this.password === password;
  }
}
