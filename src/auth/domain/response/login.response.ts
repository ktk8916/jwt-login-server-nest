export class LoginResponse {
  constructor(public readonly accessToken: string) {
    this.accessToken = accessToken;
  }
}
